import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import workHistoryData from '@/data/workHistoryData';
import { Timestamp } from 'firebase/firestore';
import { fontSize } from '@/constants/font';

const WageCheckDetail = () => {
	const { id } = useParams<{ id: string }>();

	if (id === undefined) {
		return <Container>잘못된 접근입니다.</Container>;
	}

	const item = workHistoryData[parseInt(id, 10)];

	if (!item) {
		return <Container>해당 항목을 찾을 수 없습니다.</Container>;
	}

	const formatDate = (timestamp: Timestamp) => {
		const date = timestamp.toDate();
		return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
	};

	const extractWorkingTimes = (workingTimes: string) => {
		return workingTimes.split('|')[0].trim();
	};

	return (
		<Container>
			<HeaderWrapper>
				<Title>급여 상세 내역</Title>
				<WorkPlaceRow>
					<WorkValue>{item.workPlace}</WorkValue>
				</WorkPlaceRow>
				<WageRow>
					<WageLabel>{item.amount.toLocaleString()}원</WageLabel>
				</WageRow>
			</HeaderWrapper>
			<DetailWrapper>
				<DetailRow>
					<Label>근무일</Label>
					<Value>{formatDate(item.date)}</Value>
				</DetailRow>
				<DetailRow>
					<Label>근무 시간</Label>
					<Value>{extractWorkingTimes(item.workingTimes)}</Value>
				</DetailRow>
				<DetailRow>
					<Label>휴게 시간</Label>
					<Value>30분</Value>
				</DetailRow>
				<DetailRow>
					<Label>시급</Label>
					<Value>{(item.amount / 4.5).toLocaleString()}원</Value>
				</DetailRow>
			</DetailWrapper>
		</Container>
	);
};

const Container = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
`;

const HeaderWrapper = styled.div`
	padding: 20px;
	flex: 0 0 auto;
`;

const DetailWrapper = styled.div`
	padding: 20px;
	flex: 1 1 auto;
`;

const Title = styled.h2`
	font-size: ${fontSize.xxl};
	margin-bottom: 40px;
`;

const DetailRow = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
	flex-grow: 1;
`;

const WageRow = styled.div`
	padding: 10px 0;
	font-size: ${fontSize.lg};
	font-weight: bold;
`;

const WorkPlaceRow = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px 0;
	font-size: ${fontSize.lg};
`;

const Label = styled.div`
	font-weight: 600;
	font-size: ${fontSize.lg};
`;
const WageLabel = styled.div`
	font-weight: 600;
	font-size: 32px;
`;

const Value = styled.div`
	text-align: right;
	font-weight: bold;
	font-size: ${fontSize.lg};
`;
const WorkValue = styled.div`
	text-align: right;
	font-weight: bold;
`;

export default WageCheckDetail;
