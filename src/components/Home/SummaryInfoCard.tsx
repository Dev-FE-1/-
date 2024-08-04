import { mockdata } from '@/data/mockdata';
import { colors } from '@/constants/colors';
import { fontSize } from '@/constants/font';
import styled from '@emotion/styled';

const SummaryInfoCard = () => {
	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth() + 1;
	const hourlyWage = 10030;

	const currentMonthData = mockdata.filter((item) => {
		const itemDate = new Date(item.workDate);
		return (
			itemDate.getFullYear() === year &&
			itemDate.getMonth() + 1 === month &&
			item.isOfficial === true
		);
	});

	const totalTime = currentMonthData.length * 5;
	const totalSalary = totalTime * hourlyWage;

	return (
		<SummaryContainer>
			<FirstSection>
				<span>
					공식 근무 스케줄 | {year}년 {month}월
				</span>
				<span>근무 시간 | {totalTime}시간</span>
			</FirstSection>
			<SecondSection>
				<span>예상 급여액</span>
				<span>{totalSalary}원</span>
			</SecondSection>
		</SummaryContainer>
	);
};

export default SummaryInfoCard;

const SummaryContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 28px;
	padding: 16px;
	border-radius: 8px;
	margin: 20px;
	color: ${colors.white};
	background-color: ${colors.primaryYellow};
`;

const FirstSection = styled.div`
	display: flex;
	flex-direction: column;
	font-weight: 600;
	font-size: ${fontSize.md};
`;

const SecondSection = styled.div`
	display: flex;
	flex-direction: column;
	font-weight: 700;
	span:nth-of-type(1) {
		font-size: ${fontSize.md};
	}
	span:nth-of-type(2) {
		font-size: ${fontSize.xxl};
	}
`;
