import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import { closeModal, openModal } from '@/stores/modalSlice';
import { addSchedule, deleteSchedule, scheduleData, updateSchedule } from '@/data/mockdata';
import ModalOverlay from '@/components/common/Modal/ModalOverlay';
import ModalFormComponent from '@/components/SheduleModal/ScheduleModalForm';
import ModalFooterComponent from '@/components/SheduleModal/ScheduleModalFooter';
import ModalContent from '@/components/common/Modal/ModalContent';
import ModalHeaderComponent from '@/components/common/Modal/ModalHeader';

type ModalContentType = 'add' | 'edit' | 'view' | null;

interface ISchedule {
	userId: string;
	workDate: string;
	wage: string;
	workTime: string;
	breakTime: string;
	memo: string;
}

const ScheduleModal: React.FC = () => {
	const dispatch = useDispatch();
	const { isOpen, content } = useSelector(
		(state: RootState) => state.modal as { isOpen: boolean; content: ModalContentType },
	);

	const today = useMemo(() => new Date().toISOString().split('T')[0], []);
	const defaultWage = useMemo(() => scheduleData[0].wage, []);
	const defaultWorkTime = '';
	const defaultMemo = '';

	const [workDate, setWorkDate] = useState(today);
	const [wage, setWage] = useState(defaultWage);
	const [workTime, setWorkTime] = useState(defaultWorkTime);
	const [breakTime, setBreakTime] = useState('30분');
	const [memo, setMemo] = useState(defaultMemo);
	const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

	const resetForm = useCallback(() => {
		setWorkDate(today);
		setWage(defaultWage);
		setWorkTime(defaultWorkTime);
		setBreakTime('30분');
		setMemo(defaultMemo);
		setErrors({});
	}, [today, defaultWage, defaultWorkTime, defaultMemo]);

	const setFormValues = useCallback((schedule: ISchedule) => {
		setWorkDate(schedule.workDate);
		setWage(schedule.wage);
		setWorkTime(schedule.workTime);
		setBreakTime(schedule.breakTime);
		setMemo(schedule.memo);
		setErrors({});
	}, []);

	useEffect(() => {
		if (content === 'add') {
			resetForm();
		} else if (content === 'edit' || content === 'view') {
			const schedule = scheduleData.find((s) => s.userId === '1'); // userId를 실제 값으로 변경 필요
			if (schedule) {
				setFormValues(schedule);
			}
		}
	}, [content, resetForm, setFormValues]);

	const handleOverlayClick = useCallback(
		(e: React.MouseEvent) => {
			if (e.target === e.currentTarget) {
				dispatch(closeModal());
			}
		},
		[dispatch],
	);

	const isFieldDisabled = useCallback(
		(field: string): boolean => {
			if (content === 'view') return true;
			if (content === 'add' || content === 'edit') {
				if (field === 'workTime' || field === 'memo') return false;
			}
			return true;
		},
		[content],
	);

	const validateFields = useCallback(() => {
		const newErrors: { [key: string]: boolean } = {};
		if (!workDate) newErrors.workDate = true;
		if (!wage) newErrors.wage = true;
		if (!workTime) newErrors.workTime = true;
		if (!breakTime) newErrors.breakTime = true;
		if (!memo) newErrors.memo = true;
		setErrors(newErrors);

		const errorFields = Object.keys(newErrors);
		if (errorFields.length > 0) {
			const firstErrorElement = document.querySelector(`.${errorFields[0]}`) as
				| HTMLInputElement
				| HTMLTextAreaElement;
			firstErrorElement?.focus();
		}

		return errorFields.length === 0;
	}, [workDate, wage, workTime, breakTime, memo]);

	const handleSave = useCallback(() => {
		if (validateFields()) {
			if (content === 'edit') {
				updateSchedule('1', { workDate, wage, workTime, breakTime, memo });
			} else {
				addSchedule({ workDate, wage, workTime, breakTime, memo });
			}
			dispatch(closeModal());
		}
	}, [validateFields, content, workDate, wage, workTime, breakTime, memo, dispatch]);

	const handleDelete = useCallback(() => {
		const scheduleIndex = scheduleData.findIndex((s) => s.userId === '1'); // userId를 실제 값으로 변경 필요
		if (scheduleIndex !== -1) {
			deleteSchedule(scheduleData[scheduleIndex].userId);
			dispatch(closeModal());
			const nextSchedule = scheduleData[scheduleIndex + 1] || scheduleData[scheduleIndex - 1];
			if (nextSchedule) {
				setFormValues(nextSchedule);
			} else {
				dispatch(closeModal());
			}
		}
	}, [dispatch, setFormValues]);

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

	const getFormattedWorkTime = useCallback((workTime: string) => {
		if (workTime === 'open') {
			return '오픈 (07:00~12:00)';
		} else if (workTime === 'middle') {
			return '미들 (12:00~17:00)';
		} else if (workTime === 'close') {
			return '마감 (17:00~22:00)';
		} else {
			return workTime;
		}
	}, []);

	if (!isOpen) return null;

	return (
		<ModalOverlay onClick={handleOverlayClick}>
			<ModalContent onClick={(e) => e.stopPropagation()}>
				<ModalHeaderComponent title={getTitle()} />
				<ModalFormComponent
					workDate={workDate}
					wage={wage}
					workTime={getFormattedWorkTime(workTime)}
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
					closeModal={() => {
						setErrors({});
						dispatch(closeModal());
					}}
				/>
			</ModalContent>
		</ModalOverlay>
	);
};

export default ScheduleModal;
