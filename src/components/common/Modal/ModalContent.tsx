import styled from '@emotion/styled';
import { colors } from '@/constants/colors';

const ModalContent = styled.div`
	background-color: ${colors.white};
	padding: 20px;
	border-radius: 8px 8px 0 0;
	width: 100%;
	height: 90%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
`;

export default ModalContent;
