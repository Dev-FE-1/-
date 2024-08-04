/** @jsxImportSource @emotion/react */
import { FC } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { X } from 'lucide-react';
import { colors } from '@/constants/colors';
import { useDispatch } from 'react-redux';
import { closeModal } from '@/stores/modalSlice';

interface IModalHeaderComponentProps {
	title: string;
}

const ModalHeaderComponent: FC<IModalHeaderComponentProps> = ({ title }) => {
	const dispatch = useDispatch();
	return (
		<ModalHeader>
			<HeaderContent>{title}</HeaderContent>
			<CloseButton onClick={() => dispatch(closeModal())}>
				<X css={iconStyle} />
			</CloseButton>
		</ModalHeader>
	);
};

export default ModalHeaderComponent;

const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin-bottom: 20px;
	padding: 0 10px;
`;

const HeaderContent = styled.div`
	color: ${colors.black};
	font-size: 20px;
	font-weight: 600;
	line-height: 160%;
	letter-spacing: -0.18px;
`;

const CloseButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
`;

const iconStyle = css`
	width: 28px;
	height: 28px;
	stroke-width: 0.5;
`;
