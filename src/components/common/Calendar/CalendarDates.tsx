import { mockdata, IMockDate } from '@/data/mockdata';
import { colors } from '@/constants/colors';
import CalendarBadge from '@/components/common/Calendar/CalendarBadge';
import styled from '@emotion/styled';
import { FC } from 'react';

export interface ICalendarDatesProps {
	date: Date;
	isOfficial: boolean;
}

const CalendarDates: FC<ICalendarDatesProps> = ({ date, isOfficial }) => {
	// 날짜별 데이터 필터링
	const filterdDate = (date: Date, isOfficial: boolean) => {
		return mockdata
			.filter(
				(item) =>
					new Date(item.workDate).toDateString() === date.toDateString() &&
					item.isOfficial === isOfficial,
			)
			.sort(sortByWorkType);
	};

	const isWeekend = (date: Date) => {
		const day = date.getDay();
		return day === 0 || day === 6;
	};

	const workTypeOrder = ['open', 'middle', 'close'];
	const sortByWorkType = (a: IMockDate, b: IMockDate) => {
		return workTypeOrder.indexOf(a.workType) - workTypeOrder.indexOf(b.workType);
	};

	return (
		<div>
			<DayContainer isWeekend={isWeekend(date)}>{date.getDate()}</DayContainer>
			<DateListContainer>
				{filterdDate(date, isOfficial).map(
					(data, index) =>
						index < 3 && (
							<CalendarBadge
								key={data.userId}
								workType={data.workType as 'open' | 'middle' | 'close'}
							/>
						),
				)}
			</DateListContainer>
		</div>
	);
};

export default CalendarDates;

const DayContainer = styled.span<{ isWeekend: boolean }>`
	color: ${(props) => (props.isWeekend ? colors.gray : colors.black)};
`;

const DateListContainer = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 2px;
`;
