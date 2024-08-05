import { Clock4 } from 'lucide-react';
import { colors } from '@/constants/colors';
import { badgeColors } from '@/constants/badgeColors';
import { fontSize } from '@/constants/font';
import styled from '@emotion/styled';
import { FC } from 'react';

export interface ICalendarBadgeProps {
	workingTimes: string[];
}

const CalendarBadge: FC<ICalendarBadgeProps> = ({ workingTimes }) => {
	const badgeType = workingTimes[0];
	const Badge =
		BadgeContainer[badgeType as keyof typeof BadgeContainer] || BadgeContainer.default;

	const workTypeLabels: { [key: string]: string } = {
		open: '오픈',
		middle: '미들',
		close: '마감',
	};

	return (
		<Badge>
			<Clock4 size={14} />
			{workTypeLabels[badgeType]}
		</Badge>
	);
};

export default CalendarBadge;

const BaseBadge = styled.li`
	display: flex;
	align-items: center;
	border-radius: 4px;
	gap: 4px;
	padding: 2px 4px;
	font-size: ${fontSize.sm};
`;

const BadgeContainer = {
	open: styled(BaseBadge)`
		background-color: ${badgeColors.primaryYellow};
		color: ${colors.black};
		svg {
			color: ${colors.primaryYellow};
		}
	`,
	middle: styled(BaseBadge)`
		background-color: ${badgeColors.afternoonPink};
		color: ${colors.black};
		svg {
			color: ${colors.afternoonPink};
		}
	`,
	close: styled(BaseBadge)`
		background-color: ${badgeColors.nightGreen};
		color: ${colors.black};
		svg {
			color: ${colors.nightGreen};
		}
	`,
	default: styled(BaseBadge)`
		background-color: ${colors.veryLightGray};
		color: ${colors.black};
		svg {
			color: ${colors.black};
		}
	`,
};
