import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fontSize } from '@/constants/font';
import styled from '@emotion/styled';
import { FC } from 'react';
import IconButton from '@/components/common/Button/IconButton';

export interface IControlDateProps {
	nowDate: Date;
	setNowDate: React.Dispatch<React.SetStateAction<Date>>;
}

const ControlDate: FC<IControlDateProps> = ({ nowDate, setNowDate }) => {
	const changeMonth = (month: number) => {
		setNowDate(new Date(nowDate.getFullYear(), nowDate.getMonth() + month, 1));
	};

	return (
		<Container>
			<span>{nowDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
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
