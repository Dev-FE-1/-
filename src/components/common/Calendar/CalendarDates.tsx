import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';
import { colors } from '@/constants/colors';
import { formatDateWithLeadingZeros, isWeekend, sortByWorkType } from '@/utils/dateUtils';
import { IScheduleProps } from '@/hooks/useSchedules';
import CalendarBadge from '@/components/common/Calendar/CalendarBadge';
import styled from '@emotion/styled';

interface ICalendarDatesProps {
	date: Timestamp;
	isOfficial: boolean;
	schedules: IScheduleProps[];
}

const CalendarDates: FC<ICalendarDatesProps> = ({ date, isOfficial, schedules }) => {
	const navigate = useNavigate();

	const formattedDate = formatDateWithLeadingZeros(date);
	const filteredSchedules = schedules
		.filter((schedule) => schedule.date === formattedDate)
		.sort(sortByWorkType);

	const handleDateClick = () => {
		const dateString = formatDateWithLeadingZeros(date);
		if (!isOfficial) {
			navigate(`/schedule/${dateString}`);
		}
	};

	return (
		<DatesContainer
			isOfficial={isOfficial}
			onClick={() => {
				handleDateClick();
			}}
		>
			<DayContainer isWeekend={isWeekend(date)}>{date.toDate().getDate()}</DayContainer>
			<DateListContainer>
				{filteredSchedules.map((data) => (
					<CalendarBadge
						key={`${data.date}-${data.workingTimes}`}
						workingTimes={data.workingTimes}
					/>
				))}
			</DateListContainer>
		</DatesContainer>
	);
};

export default CalendarDates;

const DatesContainer = styled.div<{ isOfficial: boolean }>`
	${(props) =>
		!props.isOfficial &&
		`
		:hover {
			cursor: pointer;
			background-color: ${colors.lightestGray};
		}
	`}
`;

const DayContainer = styled.span<{ isWeekend: boolean }>`
	color: ${(props) => (props.isWeekend ? colors.gray : colors.black)};
`;

const DateListContainer = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 2px;
`;
