import { ChangeEvent, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button/Button';
import Select from '@/components/common/Select';
import Title from '@/components/common/Title';
import createCorrection from '@/api/work/createCorrection';
import { correctionTypeOption, workTimeOption } from '@/constants/options';
import { getShiftTypeLabelEn, getWorkTypeLabelEn } from '@/utils/labelUtils';
import { colors } from '@/constants/colors';
import { IBaseCorrection } from '@/types/correctionInterfaces';

const CorrectionRequest = () => {
	const navigate = useNavigate();
	const workDateInput = useRef<HTMLInputElement>(null);
	const workTimesSelect = useRef<HTMLButtonElement>(null);
	const typeSelect = useRef<HTMLButtonElement>(null);
	const descriptionInput = useRef<HTMLTextAreaElement>(null);

	const [correctionRequestData, setCorrectionRequestData] = useState<IBaseCorrection>({
		id: '',
		workDate: '',
		workingTimes: '',
		type: '',
		description: '',
	});
	const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

	const mutation = useMutation(
		async (correctionData: IBaseCorrection) => {
			return await createCorrection(
				correctionData.workDate,
				getShiftTypeLabelEn(correctionData.workingTimes),
				getWorkTypeLabelEn(correctionData.type),
				correctionData.description,
			);
		},
		{
			onSuccess: () => {
				setCorrectionRequestData({
					id: '',
					workDate: '',
					workingTimes: '',
					type: '',
					description: '',
				});
				navigate(-1);
			},
			onError: (error) => {
				console.error('Failed to submit request:', error);
				alert('요청 제출에 실패했습니다. 다시 시도해주세요.');
			},
		},
	);

	const handleCancel = () => {
		navigate(-1);
		setCorrectionRequestData({
			id: '',
			workDate: '',
			workingTimes: '',
			type: '',
			description: '',
		});
	};

	const handleChangeState = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const target = e.target;
		setCorrectionRequestData((prevState) => ({
			...prevState,
			[target.name]: target.value,
		}));
	};

	const handleSubmit = () => {
		const { workDate, workingTimes, type, description } = correctionRequestData;

		if (!workDate || !workingTimes || !type || !description) {
			if (!description) descriptionInput.current?.focus();
			if (!type) typeSelect.current?.focus();
			if (!workingTimes) workTimesSelect.current?.focus();
			if (!workDate) workDateInput.current?.focus();
			return;
		}

		mutation.mutate(correctionRequestData);
	};

	return (
		<Container>
			<Title title="근무 정정신청" className="title" />
			<div className="correction-request-form">
				<FormGroup>
					<label>근무일</label>
					<Input
						ref={workDateInput}
						value={correctionRequestData.workDate}
						type="date"
						name="workDate"
						onChange={handleChangeState}
					/>
				</FormGroup>
				<FormGroup>
					<label>근무 시간</label>
					<Select
						id="workingTimes"
						name="workingTimes"
						openDropdownId={openDropdownId}
						setOpenDropdownId={setOpenDropdownId}
						defaultLabel="선택"
						options={workTimeOption}
						selectedOption={correctionRequestData.workingTimes}
						onSelect={handleChangeState}
						ref={workTimesSelect}
					/>
				</FormGroup>

				<FormGroup>
					<label>사유내용</label>
					<Select
						id="type"
						name="type"
						openDropdownId={openDropdownId}
						setOpenDropdownId={setOpenDropdownId}
						defaultLabel="선택"
						options={correctionTypeOption}
						selectedOption={correctionRequestData.type}
						onSelect={handleChangeState}
						ref={typeSelect}
					/>
				</FormGroup>
				<FormGroup>
					<label>설명</label>
					<StyledTextarea
						id="description"
						name="description"
						onChange={handleChangeState}
						ref={descriptionInput}
					/>
				</FormGroup>
				<div className="button-container">
					<Button label="취소" theme="secondary" onClick={handleCancel} />
					<Button
						label={mutation.isLoading ? '신청중...' : '신청하기'}
						theme="primary"
						onClick={handleSubmit}
						disabled={mutation.isLoading}
					/>
				</div>
			</div>
		</Container>
	);
};

export default CorrectionRequest;

const Container = styled.div`
	.title {
		padding-top: 23px;
		padding-bottom: 14px;
	}
	.correction-request-form {
		padding: 0 20px;
	}
	.button-container {
		display: flex;
		gap: 6px;
		button:nth-of-type(1) {
			width: 100px;
		}
	}
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
	&:focus {
		outline: none;
		border: 1px solid ${colors.primaryYellow};
	}
`;
