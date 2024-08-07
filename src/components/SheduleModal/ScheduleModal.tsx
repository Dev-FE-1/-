import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import { closeModal, openModal } from '@/stores/modalSlice';
import ModalOverlay from '@/components/common/Modal/ModalOverlay';
import ModalFormComponent from '@/components/SheduleModal/ScheduleModalForm';
import ModalFooterComponent from '@/components/SheduleModal/ScheduleModalFooter';
import ModalContent from '@/components/common/Modal/ModalContent';
import ModalHeaderComponent from '@/components/common/Modal/ModalHeader';
import createPersonalSchedule from '@/api/schedule/createPersonalSchedule';
import updatePersonalSchedule from '@/api/schedule/updatePersonalSchedule';
import deletePersonalSchedule from '@/api/schedule/deletePersonalSchedule';
import { fetchSchedules } from '@/stores/scheduleSlice';
import { AppDispatch } from '@/stores/store';

interface ISchedule {
	userId: string;
	workDate: string;
	wage: string;
	workTime: string;
	breakTime: string;
	memos: string[];
}
const DEFAULT_WAGE = '10,030원';
const WORK_TIME_OPTIONS = [
	'선택',
	'오픈 (07:00~12:00)',
	'미들 (12:00~17:00)',
	'마감 (17:00~22:00)',
];

const DEFAULT_WORK_TIME = WORK_TIME_OPTIONS[0];
const DEFAULT_BREAK_TIME = '30분';

type TWorkingTimes = 'open' | 'middle' | 'close';

const validateFields = (fields: { [key: string]: string }) => {
	const errors: { [key: string]: boolean } = {};
	Object.keys(fields).forEach((key) => {
		if (!fields[key] || (key === 'workTime' && fields[key] === DEFAULT_WORK_TIME)) {
			errors[key] = true;
		}
	});
	return errors;
};

const ScheduleModal: React.FC<{ schedules: ISchedule[]; selectedSchedule: ISchedule | null }> = ({
	schedules = [],
	selectedSchedule,
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const { isOpen, content } = useSelector((state: RootState) => state.modal);
	const today = useMemo(() => new Date().toISOString().split('T')[0], []);
	const defaultMemo = useMemo(
		() => (schedules.length > 0 && schedules[0].memos.length > 0 ? schedules[0].memos[0] : ''),
		[schedules],
	);

	const [workDate, setWorkDate] = useState(today);
	const [wage, setWage] = useState(DEFAULT_WAGE);
	const [workTime, setWorkTime] = useState(DEFAULT_WORK_TIME);
	const [breakTime, setBreakTime] = useState(DEFAULT_BREAK_TIME);
	const [memo, setMemo] = useState(defaultMemo);
	const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

	const resetForm = useCallback(
		(schedule: ISchedule | null = null) => {
			if (schedule) {
				const formattedDate = new Date(schedule.workDate).toISOString().split('T')[0];
				setWorkDate(formattedDate);
			} else {
				const formattedDate = new Date(today).toISOString().split('T')[0];
				setWorkDate(formattedDate);
			}
			setWage(DEFAULT_WAGE);
			setWorkTime(DEFAULT_WORK_TIME);
			setBreakTime(DEFAULT_BREAK_TIME);
			setMemo('');
			setErrors({});
		},
		[today],
	);

	const setFormValues = useCallback((schedule: ISchedule) => {
		const formattedDate = new Date(schedule.workDate).toISOString().split('T')[0];
		setWorkDate(formattedDate);
		setWage(DEFAULT_WAGE);
		setWorkTime(schedule.workTime);
		setBreakTime(DEFAULT_BREAK_TIME);
		setMemo(schedule.memos[0]);
		setErrors({});
	}, []);

	useEffect(() => {
		if (!isOpen || content === 'add' || content === 'edit') {
			dispatch(
				fetchSchedules({
					year: new Date().getFullYear(),
					month: new Date().getMonth() + 1,
					isOfficial: false,
				}),
			);
		}
	}, [isOpen, content, dispatch]);

	useEffect(() => {
		if (isOpen) {
			if (content === 'add' && schedules.length > 0) {
				resetForm(schedules[0]);
				setTimeout(() => setWorkTime(DEFAULT_WORK_TIME), 0);
			} else if (selectedSchedule) {
				setFormValues(selectedSchedule);
			}
		}
	}, [isOpen, content, selectedSchedule, resetForm, setFormValues, schedules]);

	const handleOverlayClick = useCallback(
		(e: React.MouseEvent) => {
			if (e.target === e.currentTarget) {
				dispatch(closeModal());
				resetForm();
			}
		},
		[dispatch, resetForm],
	);

	const isFieldDisabled = useCallback((): boolean => content === 'view', [content]);

	const convertWorkTimeForFirestore = (workTime: string): TWorkingTimes => {
		switch (workTime) {
			case '오픈 (07:00~12:00)':
				return 'open';
			case '미들 (12:00~17:00)':
				return 'middle';
			case '마감 (17:00~22:00)':
				return 'close';
			default:
				throw new Error('Invalid work time');
		}
	};

	const handleSave = useCallback(async () => {
		const fields = { workDate, wage, workTime, breakTime, memo };
		const newErrors = validateFields(fields);
		setErrors(newErrors);

		if (Object.keys(newErrors).length === 0) {
			const workingTime: TWorkingTimes = convertWorkTimeForFirestore(workTime);
			const success = await createPersonalSchedule(workDate, workingTime, memo);
			if (success) {
				dispatch(
					fetchSchedules({
						year: new Date(workDate).getFullYear(),
						month: new Date(workDate).getMonth() + 1,
						isOfficial: false,
					}),
				);
				dispatch(closeModal());
				resetForm();
			} else {
				console.error('Failed to create personal schedule');
			}
		}
	}, [workDate, wage, workTime, breakTime, memo, dispatch, resetForm]);

	const handleUpdate = useCallback(async () => {
		const fields = { workDate, wage, workTime, breakTime, memo };
		const newErrors = validateFields(fields);
		setErrors(newErrors);

		if (Object.keys(newErrors).length === 0) {
			const workingTime: TWorkingTimes = convertWorkTimeForFirestore(workTime);
			const oldWorkingTime: TWorkingTimes = schedules[0].workTime as TWorkingTimes;
			const success = await updatePersonalSchedule(
				workDate,
				oldWorkingTime,
				workingTime,
				memo,
			);
			if (success) {
				dispatch(
					fetchSchedules({
						year: new Date(workDate).getFullYear(),
						month: new Date(workDate).getMonth() + 1,
						isOfficial: false,
					}),
				);
				dispatch(closeModal());
				resetForm();
			} else {
				console.error('Failed to update personal schedule');
			}
		}
	}, [workDate, wage, workTime, breakTime, memo, schedules, dispatch, resetForm]);

	const handleDelete = useCallback(async () => {
		const fields = { workDate, workTime };
		const newErrors = validateFields(fields);
		setErrors(newErrors);

		if (Object.keys(newErrors).length === 0) {
			const workingTime: TWorkingTimes = convertWorkTimeForFirestore(workTime);
			const success = await deletePersonalSchedule(workDate, workingTime);
			if (success) {
				dispatch(
					fetchSchedules({
						year: new Date(workDate).getFullYear(),
						month: new Date(workDate).getMonth() + 1,
						isOfficial: false,
					}),
				);
				dispatch(closeModal());
				resetForm();
			} else {
				console.error('Failed to delete personal schedule');
			}
		}
	}, [workDate, workTime, dispatch, resetForm]);

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
					handleSave={content === 'edit' ? handleUpdate : handleSave}
					closeModal={() => {
						dispatch(closeModal());
					}}
				/>
			</ModalContent>
		</ModalOverlay>
	);
};

export default ScheduleModal;
