import SummaryInfoCard from '@/components/Home/SummaryInfoCard';
import Calendar from '@/components/common/Calendar/Calendar';
import { fontSize } from '@/constants/font';
import styled from '@emotion/styled';

const Home = () => {
	return (
		<Container>
			<SummaryInfoCard />
			<Title>공식 근무 스케줄</Title>
			<Calendar isOfficial={true} />
		</Container>
	);
};

export default Home;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	padding-bottom: 60px;
`;

const Title = styled.span`
	font-size: ${fontSize.xl};
	padding: 0 20px;
	font-weight: 600;
`;
