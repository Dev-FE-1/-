import styled from '@emotion/styled';
import { colors } from '@/constants/colors';
import Input from '@/components/common/Input';

const ModalFormComponent = ({
	workDate,
	wage,
	workTime,
	breakTime,
	memo,
	isFieldDisabled,
	setWorkDate,
	setWage,
	setWorkTime,
	setBreakTime,
	setMemo,
	content,
}: {
	workDate: string;
	wage: string;
	workTime: string;
	breakTime: string;
	memo: string;
	isFieldDisabled: (field: string) => boolean;
	setWorkDate: (value: string) => void;
	setWage: (value: string) => void;
	setWorkTime: (value: string) => void;
	setBreakTime: (value: string) => void;
	setMemo: (value: string) => void;
	content: 'add' | 'edit' | 'view' | null;
}) => (
	<AddScheduleForm>
		<FormGroup>
			<label>근무일</label>
			<StyledInput
				value={workDate}
				disabled={isFieldDisabled('workDate') || content === 'view'}
				onChange={(e) => setWorkDate(e.target.value)}
			/>
		</FormGroup>
		<FormGroup>
			<label>시급</label>
			<StyledInput
				type="text"
				value={wage}
				disabled={isFieldDisabled('wage') || content === 'view'}
				onChange={(e) => setWage(e.target.value)}
			/>
		</FormGroup>
		<FormGroup>
			<label>근무시간</label>
			<StyledSelect
				value={workTime}
				onChange={(e) => setWorkTime(e.target.value)}
				disabled={isFieldDisabled('workTime') || content === 'view'}
			>
				<option value="" disabled>
					선택
				</option>
				<option value="오픈 (07:00~12:00)">오픈 (07:00~12:00)</option>
				<option value="미들 (12:00~17:00)">미들 (12:00~17:00)</option>
				<option value="마감 (17:00~22:00)">마감 (17:00~22:00)</option>
			</StyledSelect>
		</FormGroup>
		<FormGroup>
			<label>휴게시간</label>
			<StyledInput
				type="text"
				value={breakTime}
				disabled={isFieldDisabled('breakTime') || content === 'view'}
				onChange={(e) => setBreakTime(e.target.value)}
			/>
		</FormGroup>
		<FormGroup>
			<label>메모</label>
			<StyledTextarea
				value={memo}
				onChange={(e) => setMemo(e.target.value)}
				disabled={isFieldDisabled('memo') || content === 'view'}
			/>
		</FormGroup>
	</AddScheduleForm>
);

export default ModalFormComponent;

const AddScheduleForm = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px;
	width: 100%;
	height: 100%;
`;

const FormGroup = styled.div`
	margin-bottom: 10px;
	display: flex;
	flex-direction: column;
	width: 100%;

	label {
		margin-bottom: 5px;
		font-size: 12px;
		font-weight: 300;
		color: ${colors.gray};
	}

	input,
	select {
		padding: 8px;
		border: 1px solid ${colors.lightGray};
		border-radius: 8px;
		height: 44px;
	}

	textarea {
		padding: 8px;
		border: 1px solid ${colors.lightGray};
		border-radius: 8px;
	}
`;

const StyledSelect = styled.select`
	color: ${colors.black};
	padding: 8px;
	border: ${(props) => (props.disabled ? 'none' : `1px solid ${colors.lightGray}`)};
	border-radius: 8px;
	background-color: ${(props) => (props.disabled ? colors.lightestGray : 'inherit')};
	appearance: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	&:disabled {
		border: none;
		background-color: ${colors.lightestGray};
	}
`;

const StyledTextarea = styled.textarea`
	padding: 8px;
	border: ${(props) => (props.disabled ? 'none' : `1px solid ${colors.lightGray}`)};
	border-radius: 8px;
	resize: none;
	height: 86px;
	background-color: ${(props) => (props.disabled ? colors.lightestGray : 'inherit')};
	&:disabled {
		border: none;
		background-color: ${colors.lightestGray};
	}
`;

const StyledInput = styled(Input)`
	padding: 8px;
	border: ${(props) => (props.disabled ? 'none' : `1px solid ${colors.lightGray}`)};
	border-radius: 8px;
	background-color: ${(props) => (props.disabled ? colors.lightestGray : 'inherit')};
	&:disabled {
		border: none;
		background-color: ${colors.lightestGray};
	}
`;
