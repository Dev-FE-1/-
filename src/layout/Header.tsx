import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useMemo } from 'react';
import logo from '@/assets/logo.svg';
import { Link } from 'react-router-dom';
import IconButton from '@/components/common/Button/IconButton';

const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const isDeepPage = useMemo(() => {
		const mainPages = ['/schedule', '/wage/check', '/wage/correction', '/home', '/profile'];
		return !mainPages.includes(location.pathname) && location.pathname !== '/';
	}, [location.pathname]);

	const handleBackClick = () => {
		navigate(-1);
	};

	return (
		<HeaderContainer>
			{isDeepPage ? (
				<IconButton
					IconComponent={ChevronLeft}
					shape="transparent"
					onClick={handleBackClick}
					color="black"
					size={32}
				/>
			) : (
				<Logo>
					<StyledLink to="/">
						<LogoImage src={logo} alt="logo" />
					</StyledLink>
				</Logo>
			)}
		</HeaderContainer>
	);
};

export default Header;

const HeaderContainer = styled.header`
	min-height: 60px;
	display: flex;
	align-items: center;
	padding: 0 20px;
`;

const Logo = styled.h1`
	margin: 0;
`;

const StyledLink = styled(Link)`
	height: 23px;
	display: flex;
	align-items: center;
`;

const LogoImage = styled.img`
	height: 100%;
`;
