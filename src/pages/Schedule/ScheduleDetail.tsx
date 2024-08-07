import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '@/stores/modalSlice';
import { useParams } from 'react-router-dom';
import { fontSize, fontWeight } from '@/constants/font';
import { colors } from '@/constants/colors';
import { Plus } from 'lucide-react';
import getPersonalSchedule from '@/api/schedule/getPersonalSchedule';
import ScheduleModal from '@/components/SheduleModal/ScheduleModal';
import styled from '@emotion/styled';
import IconButton from '@/components/common/Button/IconButton';
import { Timestamp } from 'firebase/firestore';
import { formatDateWithoutLeadingZeros, sortByWorkType } from '@/utils/dateUtils';
import { RootState } from '@/stores/store';

export interface ISchedule {
	userId: string;
	workDate: string;
	wage: string;
	workTime: string;
	breakTime: string;
	memos: string[];
	isSub?: boolean;
}

const ScheduleDetail = () => {
	const dispatch = useDispatch();
	const { date } = useParams();
	const [schedules, setSchedules] = useState<ISchedule[]>([]);
	const [selectedSchedule, setSelectedSchedule] = useState<ISchedule | null>(null);
	const [error, setError] = useState<string | null>(null);
	const { status } = useSelector((state: RootState) => state.schedules);

	const formatDate = (dateString: string | undefined) => {
		if (!dateString) return '';
		const [year, month, day] = dateString.split('-');
		return `${year}년 ${month}월 ${day}일`;
	};

	const formattedDate = formatDate(date);

	const workingHours = (workingTimes: string) => {
		switch (workingTimes) {
			case 'open':
				return '오픈 (07:00~12:00)';
			case 'middle':
				return '미들 (12:00~17:00)';
			case 'close':
				return '마감 (17:00~22:00)';
			default:
				return '알 수 없는 근무시간';
		}
	};

	useEffect(() => {
		const fetchSchedules = async () => {
			if (date) {
				const [year, month, day] = date.split('-').map(Number);
				const dateTimestamp = Timestamp.fromDate(new Date(year, month - 1, day));
				const currentdate = formatDateWithoutLeadingZeros(dateTimestamp);

				try {
					const { personalScheduleData } = await getPersonalSchedule(year, month);
					const filteredSchedules = personalScheduleData.filter(
						(schedule) => schedule.date === currentdate,
					);

					const mappedSchedules: ISchedule[] = [];
					filteredSchedules.forEach((schedule) => {
						schedule.workingTimes.forEach((workingTime: string, index: number) => {
							const localDate = new Date(schedule.date);
							localDate.setMinutes(
								localDate.getMinutes() - localDate.getTimezoneOffset(),
							);
							mappedSchedules.push({
								userId: 'defaultUserId',
								workDate: localDate.toISOString().split('T')[0],
								wage: 'defaultWage',
								workTime: workingTime,
								breakTime: 'defaultBreakTime',
								memos: [schedule.memos[index]],
							});
						});
					});

					mappedSchedules.sort(sortByWorkType);
					setSchedules(mappedSchedules);
				} catch (error) {
					setError('일정을 불러오는 데 실패했습니다. 나중에 다시 시도해 주세요.');
				}
			}
		};

		fetchSchedules().catch((error) => {
			console.error('Failed to fetch schedules:', error);
		});
	}, [date, dispatch, status]);

	const handleScheduleClick = useCallback(
		(schedule: ISchedule) => {
			setSelectedSchedule(schedule);
			dispatch(openModal('view'));
		},
		[dispatch],
	);

	return (
		<Container>
			<Title>{formattedDate}</Title>
			{schedules.length > 0 && (
				<ul>
					{schedules.map((schedule, index) => (
						<li
							className={'schedule-item'}
							key={index}
							onClick={() => handleScheduleClick(schedule)}
						>
							<InfoContainer>
								<Color workingTimes={schedule.workTime}></Color>
								<Info>
									<span>{error ? error : workingHours(schedule.workTime)}</span>
									<span>강남점</span>
								</Info>
							</InfoContainer>
							<Hour>4.5 시간</Hour>
						</li>
					))}
				</ul>
			)}

			<AddBtn onClick={() => dispatch(openModal('add'))}>
				<IconButton IconComponent={Plus} shape="line" size={24} />
				<span>일정 추가</span>
			</AddBtn>
			<div></div>
			<ScheduleModal schedules={schedules} selectedSchedule={selectedSchedule} />
		</Container>
	);
};

export default ScheduleDetail;

const Title = styled.span`
	font-size: ${fontSize.xl};
	font-weight: 600;
`;

const AddBtn = styled.span`
	display: flex;
	gap: 10px;
	align-items: center;
	font-size: ${fontSize.lg};

	:hover {
		cursor: pointer;
	}
`;

const Container = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 20px;

	.schedule-item {
		display: flex;
		padding-bottom: 10px;
		justify-content: space-between;
		border-bottom: 1px solid ${colors.lightGray};
		cursor: pointer;
	}
`;

const InfoContainer = styled.div`
	display: flex;
	gap: 14px;
`;

const Color = styled.span<{ workingTimes: string }>`
	width: 14px;
	height: 14px;
	border-radius: 50px;
	background-color: ${({ workingTimes }) => {
		switch (workingTimes) {
			case 'open':
				return colors.primaryYellow;
			case 'middle':
				return colors.afternoonPink;
			case 'close':
				return colors.nightGreen;
			default:
				return colors.lightGray;
		}
	}};
	margin-top: 4px;
`;

const Info = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;

	span:nth-of-type(1) {
		font-size: ${fontSize.lg};
		font-weight: ${fontWeight.medium};
	}

	span:nth-of-type(2) {
		font-size: ${fontSize.md};
		color: ${colors.gray};
	}
`;

const Hour = styled.span`
	font-size: ${fontSize.md};
	color: ${colors.gray};
	display: flex;
	align-items: flex-end;
`;
