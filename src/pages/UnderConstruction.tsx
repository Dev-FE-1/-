/** @jsxImportSource @emotion/react */
import { colors } from '@/constants/colors';
import { fontSize, fontWeight } from '@/constants/font';
import styled from '@emotion/styled';
import { Settings } from 'lucide-react';

const UnderConstruction = () => {
	return (
		<Container>
			<Content>
				<IconContainer>
					<Settings size={50} />
				</IconContainer>
				<Message>이 페이지는 준비 중입니다.</Message>
				<Description>곧 업데이트 예정입니다. 조금만 기다려 주세요!</Description>
			</Content>
		</Container>
	);
};

export default UnderConstruction;

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	/* background-color: ${colors.lightestGray}; */
	margin-bottom: 180px;
`;

const Content = styled.div`
	text-align: center;
`;

const IconContainer = styled.div`
	margin-bottom: 20px;
	color: ${colors.primaryYellow};
`;

const Message = styled.div`
	font-size: ${fontSize.xxxxl};
	font-weight: ${fontWeight.bold};
	color: ${colors.darkestGray};
	margin-bottom: 10px;
`;

const Description = styled.div`
	font-size: ${fontSize.lg};
	color: ${colors.gray};
`;
