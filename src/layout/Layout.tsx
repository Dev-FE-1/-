import styled from '@emotion/styled';
import Header from '@/layout/Header';
import Content from '@/layout/Content';
import Menu from '@/layout/Menu/Menu';
import { useLocation } from 'react-router-dom';

const Layout = () => {
	const location = useLocation();
	const isLoginPage = location.pathname === '/login';

	return (
		<LayoutContainer>
			{!isLoginPage && <Header />}
			<Content />
			{!isLoginPage && <Menu />}
		</LayoutContainer>
	);
};

export default Layout;

const LayoutContainer = styled.div`
	margin: 0 auto;
	width: 100%;
	max-width: 430px;
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;

	&::before {
		left: 50%;
		transform: translateX(-215px);
	}

	&::after {
		right: 50%;
		transform: translateX(215px);
	}

	&::before,
	&::after {
		width: 1px;
		position: fixed;
		top: 0px;
		bottom: 0px;
		background-color: rgba(138, 138, 138, 0.1);
		content: '';
		z-index: 99999;
	}
`;
