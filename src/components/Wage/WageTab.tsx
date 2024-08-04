import { colors } from '@/constants/colors';
import { fontSize, fontWeight } from '@/constants/font';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

const WageTab = () => {
	return (
		<StyledUl>
			<StyledLi>
				<StyledNavLink to="check" className={({ isActive }) => (isActive ? 'active' : '')}>
					급여확인
				</StyledNavLink>
			</StyledLi>

			<StyledLi>
				<StyledNavLink
					to="correction"
					className={({ isActive }) => (isActive ? 'active' : '')}
				>
					정정 신청
				</StyledNavLink>
			</StyledLi>
		</StyledUl>
	);
};

const StyledUl = styled.ul`
	height: 50px;
	display: flex;
	border-bottom: 1px solid ${colors.lightestGray};
`;

const StyledLi = styled.li`
	margin-left: 20px;
	& + & {
		margin-left: 10px;
	}
`;

const StyledNavLink = styled(NavLink)`
	position: relative;
	height: 100%;
	display: flex;
	align-items: center;
	overflow: hidden;
	font-size: ${fontSize.lg};
	font-weight: ${fontWeight.bold};
	color: ${colors.gray};

	&:hover {
		color: ${colors.black};
	}

	&.active {
		color: ${colors.black};
	}

	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background-color: ${colors.black};
		transition: transform 0.2s ease;
		transform: scaleX(0);
		transform-origin: left center;
	}

	&.active::after {
		transform: scaleX(1);
	}
`;

export default WageTab;
