import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import { closeModal, openModal } from '@/stores/modalSlice';
import ModalOverlay from '@/components/common/Modal/ModalOverlay';
import ModalFormComponent from '@/components/SheduleModal/ScheduleModalForm';
import ModalFooterComponent from '@/components/SheduleModal/ScheduleModalFooter';
import ModalContent from '@/components/common/Modal/ModalContent';
import ModalHeaderComponent from '@/components/common/Modal/ModalHeader';

interface ISchedule {
	userId: string;
	workDate: string;
	wage: string;
	workTime: string;
	breakTime: string;
	memos: string[];
}

const ScheduleModal: React.FC<{ schedules: ISchedule[] }> = ({ schedules = [] }) => {
	const dispatch = useDispatch();
	const { isOpen, content } = useSelector((state: RootState) => state.modal);

	const today = useMemo(() => new Date().toISOString().split('T')[0], []);
	const defaultWage = '10,030원';
	const defaultWorkTime = '';
	const defaultBreakTime = '30분';
	const defaultMemo =
		schedules.length > 0 && schedules[0].memos.length > 0 ? schedules[0].memos[0] : '';

	const [workDate, setWorkDate] = useState(today);
	const [wage, setWage] = useState(defaultWage);
	const [workTime, setWorkTime] = useState(defaultWorkTime);
	const [breakTime, setBreakTime] = useState(defaultBreakTime);
	const [memo, setMemo] = useState(defaultMemo);
	const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

	const resetForm = useCallback(() => {
		setWorkDate(today);
		setWage(defaultWage);
		setWorkTime(defaultWorkTime);
		setBreakTime(defaultBreakTime);
		setMemo(defaultMemo);
		setErrors({});
	}, [today, defaultWage, defaultWorkTime, defaultBreakTime, defaultMemo]);

	const setFormValues = useCallback(
		(schedule: ISchedule) => {
			const formattedDate = new Date(schedule.workDate).toISOString().split('T')[0];
			setWorkDate(formattedDate);
			setWage(defaultWage); // Use default wage
			setWorkTime(schedule.workTime);
			setBreakTime(defaultBreakTime); // Use default break time
			setMemo(schedule.memos[0]);
			setErrors({});
		},
		[defaultWage, defaultBreakTime],
	);

	useEffect(() => {
		if (content === 'add') {
			resetForm();
		} else if (content === 'edit' && schedules.length > 0) {
			setFormValues(schedules[0]);
		} else if (content === 'view' && schedules.length > 0) {
			setFormValues(schedules[0]);
		}
	}, [content, resetForm, setFormValues, schedules]);

	const handleOverlayClick = useCallback(
		(e: React.MouseEvent) => {
			if (e.target === e.currentTarget) {
				dispatch(closeModal());
			}
		},
		[dispatch],
	);

	const isFieldDisabled = useCallback((): boolean => content === 'view', [content]);

	const validateFields = useCallback(() => {
		const newErrors: { [key: string]: boolean } = {};
		if (!workDate) newErrors.workDate = true;
		if (!wage) newErrors.wage = true;
		if (!workTime) newErrors.workTime = true;
		if (!breakTime) newErrors.breakTime = true;
		if (!memo) newErrors.memo = true;
		setErrors(newErrors);

		return Object.keys(newErrors).length === 0;
	}, [workDate, wage, workTime, breakTime, memo]);

	const handleSave = useCallback(() => {
		if (validateFields()) {
			// Save schedule logic here
			dispatch(closeModal());
		}
	}, [validateFields, dispatch]);

	const handleDelete = useCallback(() => {
		// Delete schedule logic here
		dispatch(closeModal());
	}, [dispatch]);

	const handleEdit = useCallback(() => {
		dispatch(openModal('edit'));
	}, [dispatch]);

	const getTitle = useCallback(() => {
		switch (content) {
			case 'add':
				return '일정 추가';
			case 'edit':
				return '일정 수정';
			case 'view':
				return '일정 조회';
			default:
				return '';
		}
	}, [content]);

	if (!isOpen) return null;

	return (
		<ModalOverlay onClick={handleOverlayClick}>
			<ModalContent>
				<ModalHeaderComponent title={getTitle()} />
				<ModalFormComponent
					workDate={workDate}
					wage={wage}
					workTime={workTime}
					breakTime={breakTime}
					memo={memo}
					isFieldDisabled={isFieldDisabled}
					setWorkDate={setWorkDate}
					setWage={setWage}
					setWorkTime={setWorkTime}
					setBreakTime={setBreakTime}
					setMemo={setMemo}
					content={content}
					errors={errors}
				/>
				<ModalFooterComponent
					content={content}
					handleDelete={handleDelete}
					handleEdit={handleEdit}
					handleSave={handleSave}
					closeModal={() => dispatch(closeModal())}
				/>
			</ModalContent>
		</ModalOverlay>
	);
};

export default ScheduleModal;
