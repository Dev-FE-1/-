import styled from '@emotion/styled';

const ModalOverlay = styled.div`
	position: fixed;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: flex-end;
	z-index: 9999;
	max-width: 430px;
`;

export default ModalOverlay;
