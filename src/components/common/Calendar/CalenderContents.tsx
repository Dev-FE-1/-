import CalendarWeek from '@/components/common/Calendar/CalendarWeek';
import CalendarDates from '@/components/common/Calendar/CalendarDates';
import monthList from '@/utils/getMonthList';
import { colors } from '@/constants/colors';
import styled from '@emotion/styled';
import { FC } from 'react';

export interface ICalenderDateProps {
	nowDate: Date;
	isOfficial: boolean;
}

const CalenderContents: FC<ICalenderDateProps> = ({ nowDate, isOfficial }) => {
	const weeks = ['일', '월', '화', '수', '목', '금', '토'];
	const calendarDates = monthList(nowDate);

	return (
		<Container>
			{weeks.map((week) => (
				<CalendarWeek key={week} weekName={week} />
			))}
			{calendarDates.map((date: Date) => (
				<CalendarDates key={date.toDateString()} date={date} isOfficial={isOfficial} />
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
