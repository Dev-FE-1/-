import { useState, useEffect } from 'react';
import getOfficialWage from '@/api/work/getOfficialWage';
import { colors } from '@/constants/colors';
import { fontSize } from '@/constants/font';
import HomeCharacter from '/character01.svg';
import styled from '@emotion/styled';

const SummaryInfoCard = () => {
	const [totalWorkHour, setTotalWorkHour] = useState<number | string>(0);
	const [totalWage, setTotalWage] = useState<number | string>(0);

	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth() + 1;
	const monthString = month.toString().padStart(2, '0');

	useEffect(() => {
		const fetchWageData = async () => {
			try {
				const { totalWorkHour, totalWage } = await getOfficialWage(year, month);
				setTotalWorkHour(totalWorkHour);
				setTotalWage(totalWage);
			} catch (error) {
				setTotalWorkHour('급여 정보를 불러오는 데 실패했습니다');
				setTotalWage('급여 정보를 불러오는 데 실패했습니다');
			}
		};

		fetchWageData();
	}, [year, month]);

	return (
		<SummaryCard>
			<SummaryCardContainer>
				<FirstSection>
					<span>
						공식 근무 스케줄 | {year}년 {monthString}월
					</span>
					<span>근무 시간 | {totalWorkHour}시간</span>
				</FirstSection>
				<SecondSection>
					<span>예상 급여액</span>
					<span>{totalWage.toLocaleString()}원</span>
				</SecondSection>
			</SummaryCardContainer>
			<img src={HomeCharacter} width="95" height="104" alt="캐릭터이미지" />
		</SummaryCard>
	);
};

export default SummaryInfoCard;

const SummaryCard = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 16px;
	border-radius: 8px;
	margin: 20px;
	color: ${colors.white};
	background-color: ${colors.primaryYellow};
`;

const SummaryCardContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
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
