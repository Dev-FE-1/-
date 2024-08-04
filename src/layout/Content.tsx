import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

const Content = () => (
	<StyledContent>
		<Outlet />
	</StyledContent>
);

export default Content;

const StyledContent = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`;
