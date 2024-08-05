import { FC } from 'react';
import { Timestamp } from 'firebase/firestore';
import CalendarWeek from '@/components/common/Calendar/CalendarWeek';
import CalendarDates from '@/components/common/Calendar/CalendarDates';
import monthList from '@/utils/getMonthList';
import { colors } from '@/constants/colors';
import styled from '@emotion/styled';
import useSchedules from '@/hooks/useSchedules';

export interface ICalenderDateProps {
	nowDate: Timestamp;
	isOfficial: boolean;
}

const CalenderContents: FC<ICalenderDateProps> = ({ nowDate, isOfficial }) => {
	const weeks = ['일', '월', '화', '수', '목', '금', '토'];
	const calendarDates = monthList(nowDate);

	const year = nowDate.toDate().getFullYear();
	const month = nowDate.toDate().getMonth() + 1;
	const schedules = useSchedules(year, month, isOfficial);

	return (
		<Container>
			{weeks.map((week) => (
				<CalendarWeek key={week} weekName={week} />
			))}
			{calendarDates.map((date: Timestamp) => (
				<CalendarDates
					key={date.toMillis().toString()}
					date={date}
					isOfficial={isOfficial}
					schedules={schedules}
				/>
			))}
		</Container>
	);
};

export default CalenderContents;

const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	text-align: center;

	div {
		display: flex;
		flex-direction: column;
		gap: 4px;
		border-bottom: 1px solid ${colors.lightGray};
		min-height: 96px;
		padding: 2px;

		&:nth-last-of-type(-n + 7) {
			border-bottom: 0;
		}
	}
`;
