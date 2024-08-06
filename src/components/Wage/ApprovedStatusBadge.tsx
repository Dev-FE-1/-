import { FC } from 'react';
import styled from '@emotion/styled';
import { fontSize } from '@/constants/font';
import { badgeColors } from '@/constants/badgeColors';
import { colors } from '@/constants/colors';

export interface IApprovedStatusBadgeProps {
	approvedStatus: string;
}

const ApprovedStatusBadge: FC<IApprovedStatusBadgeProps> = ({ approvedStatus }) => {
	const badgeType = approvedStatus;
	const Badge =
		BadgeContainer[badgeType as keyof typeof BadgeContainer] || BadgeContainer.default;

	const workTypeLabels: { [key: string]: string } = {
		pending: '대기',
		approved: '승인',
		rejected: '반려',
	};

	return <Badge>{workTypeLabels[badgeType]}</Badge>;
};

export default ApprovedStatusBadge;

const BaseBadge = styled.span`
	width: 50px;
	padding: 4px 16px;
	border-radius: 4px;
	font-size: ${fontSize.sm};
`;

const BadgeContainer = {
	pending: styled(BaseBadge)`
		background-color: ${badgeColors.nightGreen};
		color: ${colors.black};
		svg {
			color: ${colors.nightGreen};
		}
	`,
	approved: styled(BaseBadge)`
		background-color: ${badgeColors.primaryYellow};
		color: ${colors.black};
		svg {
			color: ${colors.primaryYellow};
		}
	`,
	rejected: styled(BaseBadge)`
		background-color: ${badgeColors.afternoonPink};
		color: ${colors.black};
		svg {
			color: ${colors.afternoonPink};
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
