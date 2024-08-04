import styled from '@emotion/styled';
import { colors } from '@/constants/colors';
import { NavLink } from 'react-router-dom';
import { fontSize } from '@/constants/font';
import { FC } from 'react';

export interface IMenuItemProps {
	to: string;
	icon: JSX.Element;
	label: string;
	isActive: boolean;
}

const MenuItem: FC<IMenuItemProps> = ({ to, icon, label, isActive }) => (
	<MenuItemContainer>
		<StyledLink to={to} className={isActive ? 'active' : ''}>
			<IconWrapper>{icon}</IconWrapper>
			<LinkText isActive={isActive}>{label}</LinkText>
		</StyledLink>
	</MenuItemContainer>
);

export default MenuItem;

const MenuItemContainer = styled.li`
	display: flex;
	align-items: center;
`;

const StyledLink = styled(NavLink)`
	display: flex;
	align-items: center;
	flex-direction: column;
	text-decoration: none;
	color: ${colors.gray};

	&.active {
		color: ${colors.black};
	}

	&:hover {
		color: ${colors.black};
	}
`;

const IconWrapper = styled.div`
	width: 26px;
	height: 26px;
	margin: 1px 0 3px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const LinkText = styled.span<{ isActive: boolean }>`
	font-size: ${fontSize.sm};
	color: ${({ isActive }) => (isActive ? colors.black : colors.gray)};
`;
