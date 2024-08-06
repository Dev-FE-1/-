import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import Title from '@/components/common/Title';
import styled from '@emotion/styled';
import { colors } from '@/constants/colors';
import Dropdown from '@/components/common/Dropdown';
import CorrectionTable from '@/components/Wage/CorrectionTable';
import { getApprovedStatusLabel, getWorkTypeLabel } from '@/utils/labelUtils';

const Correction = () => {
	const [correctionType, setCorrectionType] = useState('');
	const [approvedStatus, setApprovedStatus] = useState('');
	const navigate = useNavigate();

	const handleCorrection = () => {
		navigate('/wage/correction/create');
	};

	return (
		<Container>
			<Title
				title="정정신청 내역"
				element={
					<Button
						label="근무정정 신청"
						onClick={handleCorrection}
						size="small"
						buttonWidth="110px"
					/>
				}
				className="title border"
			/>
			<div className="dropdown-container border">
				<Dropdown
					defaultLabel="근무정정 유형"
					options={[
						{ value: '대타근무', label: '대타근무' },
						{ value: '특별근무', label: '특별근무' },
						{ value: '휴가', label: '휴가' },
						{ value: '조퇴', label: '조퇴' },
					]}
					selectedOption={getWorkTypeLabel(correctionType)}
					onSelect={setCorrectionType}
					className="small-dropdown correction"
				/>
				<Dropdown
					defaultLabel="승인상태"
					options={[
						{ value: '대기', label: '대기' },
						{ value: '승인', label: '승인' },
						{ value: '반려', label: '반려' },
					]}
					selectedOption={getApprovedStatusLabel(approvedStatus)}
					onSelect={setApprovedStatus}
					className="small-dropdown approved"
				/>
			</div>
			<CorrectionTable approvedFilter={approvedStatus} typeFilter={correctionType} />
		</Container>
	);
};

export default Correction;

const Container = styled.div`
	.title {
		padding-top: 20px;
		padding-bottom: 16px;
	}
	.border {
		border-bottom: 1px solid ${colors.lightestGray};
	}
	.dropdown-container {
		padding: 10px 20px;
		display: flex;
		gap: 8px;
		.small-dropdown.approved {
			width: 100px;
		}
		.small-dropdown.correction {
			width: 130px;
		}
		.small-dropdown {
			height: 38px;
		}

		button.small-dropdown {
			padding-left: 12px;
		}
	}
`;
