import { useDispatch } from 'react-redux';
import { openModal } from '@/stores/modalSlice';
import { useParams } from 'react-router-dom';
import { fontSize, fontWeight } from '@/constants/font';
import { colors } from '@/constants/colors';
import { Plus } from 'lucide-react';
import getPersonalSchedule from '@/api/schedule/getPersonalSchedule';
import ScheduleModal from '@/components/SheduleModal/ScheduleModal';
import styled from '@emotion/styled';
import IconButton from '@/components/common/Button/IconButton';
import { useEffect, useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import { formatDateWithoutLeadingZeros } from '@/utils/dateUtils';

interface IScheduleDetailProps {
	date: string;
	workingTimes: string[];
}

const ScheduleDetail = () => {
	const dispatch = useDispatch();
	const { date } = useParams();
	const [schedules, setSchedules] = useState<IScheduleDetailProps[]>([]);
	const [error, setError] = useState<string | null>(null);

	const formatDate = (dateString: string | undefined) => {
		if (!dateString) return '';
		const [year, month, day] = dateString.split('-');
		return `${year}년 ${month}월 ${day}일`;
	};

	const formattedDate = formatDate(date);

	const workingHours = (workingTimes: string[]) => {
		if (workingTimes.length === 0) return '근무시간이 없습니다.';

		return workingTimes
			.map((time) => {
				switch (time) {
					case 'open':
						return '오픈 (07:00~12:00)';
					case 'middle':
						return '미들 (12:00~17:00)';
					case 'close':
						return '마감 (17:00~22:00)';
					default:
						return '알 수 없는 근무시간';
				}
			})
			.join(', ');
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
					setSchedules(filteredSchedules);
				} catch (error) {
					setError('일정을 불러오는 데 실패했습니다. 나중에 다시 시도해 주세요.');
				}
			}
		};

		fetchSchedules();
	}, [date]);

	return (
		<Container>
			<Title>{formattedDate}</Title>
			{schedules.length > 0 && (
				<ul>
					{schedules.map((schedule, index) => (
						<li key={index} onClick={() => dispatch(openModal('view'))}>
							<InfoContainer>
								<Color workingTimes={schedule.workingTimes[0]}></Color>
								<Info>
									<span>
										{error ? error : workingHours(schedule.workingTimes)}
									</span>
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
			<ScheduleModal />
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

	li {
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
				return colors.lightGray; // 기본 색상 추가
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
