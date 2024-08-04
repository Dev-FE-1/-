import { colors } from '@/constants/colors';
import { fontSize, fontWeight } from '@/constants/font';
import styled from '@emotion/styled';
import IconButton from '../common/Button/IconButton';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfileMenu = () => {
	const menuItems = [
		{ name: '이용안내', path: '/guide' },
		{ name: '고객센터', path: '/customer-service' },
		{ name: '알림설정', path: '/notification-settings' },
		{ name: '환경설정', path: '/settings' },
	];

	return (
		<MenuContainer>
			{menuItems.map((item, index) => (
				<MenuItem key={index} to={item.path}>
					{item.name}
					<IconButton IconComponent={ChevronRight} shape="transparent" />
				</MenuItem>
			))}
		</MenuContainer>
	);
};

const MenuContainer = styled.div`
	padding: 0 20px;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;
const MenuItem = styled(Link)`
	display: flex;
	justify-content: space-between;
	font-size: ${fontSize.xl};
	font-weight: ${fontWeight.semiBold};
	padding: 20px;
	border-bottom: 1px solid ${colors.lightestGray};
	cursor: pointer;
	&:hover {
		background-color: ${colors.lightestGray};
	}
`;

export default ProfileMenu;
