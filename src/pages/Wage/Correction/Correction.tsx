import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import Title from '@/components/common/Title';
import styled from '@emotion/styled';
import { colors } from '@/constants/colors';
import Dropdown from '@/components/common/Dropdown';
import CorrectionTable from '@/components/Wage/CorrectionTable';
import { getApprovedStatusLabel, getWorkTypeLabel } from '@/utils/labelUtils';
import { approvedStatusOption, correctionTypeOptionAll } from '@/constants/options';

const Correction = () => {
	const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
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
						buttonWidth="120px"
					/>
				}
				className="title border"
			/>
			<div className="dropdown-container border">
				<Dropdown
					id="correctionType"
					openDropdownId={openDropdownId}
					setOpenDropdownId={setOpenDropdownId}
					defaultLabel="근무정정 유형"
					options={correctionTypeOptionAll}
					selectedOption={getWorkTypeLabel(correctionType)}
					onSelect={(value) => setCorrectionType(value === '전체' ? '' : value)}
					className="small-dropdown correction"
				/>
				<Dropdown
					id="ApprovedStatus"
					openDropdownId={openDropdownId}
					setOpenDropdownId={setOpenDropdownId}
					defaultLabel="승인상태"
					options={approvedStatusOption}
					selectedOption={getApprovedStatusLabel(approvedStatus)}
					onSelect={(value) => setApprovedStatus(value === '전체' ? '' : value)}
					className="small-dropdown approved"
				/>
			</div>
			<CorrectionTable
				approvedFilter={approvedStatus === 'all' ? '' : approvedStatus}
				typeFilter={correctionType === 'all' ? '' : correctionType}
			/>
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
			width: 120px;
		}
		.small-dropdown.correction {
			width: 150px;
		}
		.small-dropdown {
			height: 40px;
		}

		button.small-dropdown {
			padding-left: 12px;
		}
	}
`;
