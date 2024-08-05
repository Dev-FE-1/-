import React, { useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import { colors } from '@/constants/colors';
import Input from '@/components/common/Input';
import Dropdown from '@/components/common/Dropdown';

interface IModalFormProps {
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
	errors: { [key: string]: boolean };
}

const ModalFormComponent: React.FC<IModalFormProps> = ({
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
	errors,
}) => {
	const handleInputChange = useCallback(
		(setter: (value: string) => void) =>
			(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
				setter(e.target.value);
			},
		[],
	);

	useEffect(() => {
		if (workTime === 'middle') {
			setWorkTime('미들 (12:00~17:00)');
		} else if (workTime === 'open') {
			setWorkTime('오픈 (07:00~12:00)');
		} else if (workTime === 'close') {
			setWorkTime('마감 (17:00~22:00)');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [workTime]);

	return (
		<AddScheduleForm>
			<FormGroup>
				<label>근무일</label>
				<StyledInput
					value={workDate}
					disabled={isFieldDisabled('workDate') || content === 'view'}
					onChange={handleInputChange(setWorkDate)}
					className={`workDate ${errors.workDate ? 'error' : ''}`}
				/>
			</FormGroup>
			<FormGroup>
				<label>시급</label>
				<StyledInput
					type="text"
					value={wage}
					disabled={isFieldDisabled('wage') || content === 'view'}
					onChange={handleInputChange(setWage)}
					className={`wage ${errors.wage ? 'error' : ''}`}
				/>
			</FormGroup>
			<FormGroup>
				<label>근무시간</label>
				<Dropdown
					options={[
						{
							value: '오픈 (07:00~12:00)',
							label: '오픈 (07:00~12:00)',
							color: '#FFC700',
						},
						{
							value: '미들 (12:00~17:00)',
							label: '미들 (12:00~17:00)',
							color: '#F39ACD',
						},
						{
							value: '마감 (17:00~22:00)',
							label: '마감 (17:00~22:00)',
							color: '#1DC18D',
						},
					]}
					selectedOption={workTime}
					onSelect={setWorkTime}
					disabled={isFieldDisabled('workTime') || content === 'view'}
					className={`workTime ${errors.workTime ? 'error' : ''}`}
				/>
			</FormGroup>
			<FormGroup>
				<label>휴게시간</label>
				<StyledInput
					type="text"
					value={breakTime}
					disabled={isFieldDisabled('breakTime') || content === 'view'}
					onChange={handleInputChange(setBreakTime)}
					className={`breakTime ${errors.breakTime ? 'error' : ''}`}
				/>
			</FormGroup>
			<FormGroup>
				<label>메모</label>
				<StyledTextarea
					value={memo}
					onChange={handleInputChange(setMemo)}
					disabled={isFieldDisabled('memo') || content === 'view'}
					className={`memo ${errors.memo ? 'error' : ''}`}
				/>
			</FormGroup>
		</AddScheduleForm>
	);
};

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
	&.error {
		border: 1px solid ${colors.red};
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
	&.error {
		border: 1px solid ${colors.red};
	}
`;
