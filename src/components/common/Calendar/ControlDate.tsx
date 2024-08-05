import { FC } from 'react';
import { Timestamp } from 'firebase/firestore';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fontSize } from '@/constants/font';
import styled from '@emotion/styled';
import IconButton from '@/components/common/Button/IconButton';

export interface IControlDateProps {
	nowDate: Timestamp;
	setNowDate: React.Dispatch<React.SetStateAction<Timestamp>>;
}

const ControlDate: FC<IControlDateProps> = ({ nowDate, setNowDate }) => {
	const changeMonth = (date: number) => {
		const currentDate = nowDate.toDate();
		const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + date, 1);
		setNowDate(Timestamp.fromDate(newDate));
	};

	const formatDate = (timestamp: Timestamp) => {
		const date = timestamp.toDate();
		return `${date.getFullYear()}년 ${(date.getMonth() + 1).toString().padStart(2, '0')}월`;
	};

	return (
		<Container>
			<span>{formatDate(nowDate)}</span>
			<ButtonContainer>
				<IconButton
					IconComponent={ChevronLeft}
					shape="line"
					onClick={() => changeMonth(-1)}
				/>
				<IconButton
					IconComponent={ChevronRight}
					shape="line"
					onClick={() => changeMonth(1)}
				/>
			</ButtonContainer>
		</Container>
	);
};

export default ControlDate;

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;

	span {
		font-size: ${fontSize.lg};
	}
`;

const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;
