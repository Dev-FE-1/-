import styled from '@emotion/styled';
import { colors } from '@/constants/colors';

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px;
	width: 100%;
`;

const CancelButton = styled.button`
	height: 44px;
	margin: 5px;
	padding: 10px;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	background-color: ${colors.lightestGray};
	color: ${colors.black};
	flex: 1;
	font-size: 16px;
	font-weight: 600;
	max-width: 33%;
`;

const SaveButton = styled.button`
	height: 44px;
	margin: 5px 5px 5px 2px;
	padding: 10px;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	background-color: ${colors.primaryYellow};
	color: ${colors.white};
	flex: 2;
	font-size: 16px;
	font-weight: 600;
	max-width: 66%;
`;

const DeleteButton = styled.button`
	height: 44px;
	margin: 5px;
	padding: 10px;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	background-color: ${colors.lightestGray};
	color: ${colors.black};
	flex: 1;
	font-size: 16px;
	font-weight: 600;
	max-width: 33%;
`;

const ModalFooterComponent = ({
	content,
	handleDelete,
	handleEdit,
	handleSave,
	closeModal,
}: {
	content: 'add' | 'edit' | 'view' | null;
	handleDelete: () => void;
	handleEdit: () => void;
	handleSave: () => void;
	closeModal: () => void;
}) => (
	<ButtonContainer>
		{content === 'view' ? (
			<>
				<DeleteButton onClick={handleDelete}>삭제</DeleteButton>
				<SaveButton onClick={handleEdit}>수정</SaveButton>
			</>
		) : (
			<>
				<CancelButton onClick={closeModal}>취소</CancelButton>
				<SaveButton onClick={handleSave}>{content === 'edit' ? '수정' : '저장'}</SaveButton>
			</>
		)}
	</ButtonContainer>
);

export default ModalFooterComponent;
