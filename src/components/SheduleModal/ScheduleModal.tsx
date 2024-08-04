import React, { useState, useEffect } from 'react';
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

const ScheduleModal = () => {
	const dispatch = useDispatch();
	const { isOpen, content } = useSelector(
		(state: RootState) => state.modal as { isOpen: boolean; content: ModalContentType },
	);

	const today = new Date().toISOString().split('T')[0];
	const defaultWage = scheduleData[0].wage;
	const defaultWorkTime = '';
	const defaultMemo = '';

	const [workDate, setWorkDate] = useState(today);
	const [wage, setWage] = useState(defaultWage);
	const [workTime, setWorkTime] = useState(defaultWorkTime);
	const [breakTime, setBreakTime] = useState('');
	const [memo, setMemo] = useState(defaultMemo);

	useEffect(() => {
		if (content === 'add') {
			setWorkDate(today);
			setWage(defaultWage);
			setWorkTime(defaultWorkTime);
			setBreakTime('');
			setMemo(defaultMemo);
		} else if (content === 'edit' || content === 'view') {
			const schedule = scheduleData.find((s) => s.userId === scheduleData[0].userId);
			if (schedule) {
				setWorkDate(schedule.workDate);
				setWage(schedule.wage);
				setWorkTime(schedule.workTime);
				setBreakTime(schedule.breakTime);
				setMemo(schedule.memo);
			}
		}
	}, [content, today, defaultWage, defaultWorkTime, defaultMemo]);

	if (!isOpen) return null;

	const handleOverlayClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			dispatch(closeModal());
		}
	};

	const isFieldDisabled = (field: string): boolean => {
		if (content === 'view') return true;
		if (content === 'add' || content === 'edit') {
			if (field === 'workDate' || field === 'wage' || field === 'breakTime') return true;
			if (field === 'workTime' || field === 'memo') return false;
		}
		return true;
	};

	const handleSave = () => {
		if (content === 'edit') {
			if (workTime !== '') {
				updateSchedule(scheduleData[0].userId, { workTime, memo });
			}
		} else if (content === 'add') {
			addSchedule({ workDate, wage, workTime, breakTime: '30분', memo });
		}
		dispatch(closeModal());
	};

	const handleDelete = () => {
		if (content === 'view') {
			deleteSchedule(scheduleData[0].userId);
			dispatch(closeModal());
		}
	};

	const handleEdit = () => {
		dispatch(openModal('edit'));
	};

	return (
		<ModalOverlay onClick={handleOverlayClick}>
			<ModalContent onClick={(e) => e.stopPropagation()}>
				<ModalHeaderComponent
					title={
						content === 'add'
							? '일정 추가'
							: content === 'view'
								? '일정 조회'
								: '일정 수정'
					}
				/>
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
