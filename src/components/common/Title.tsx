import { FC, ReactNode } from 'react';
import styled from '@emotion/styled';
import { fontSize, fontWeight } from '@/constants/font';

interface ITitleProps {
	title: string;
	onClick?: () => void;
	className?: string;
	element?: ReactNode;
}

const Title: FC<ITitleProps> = ({ title, className, element }) => {
	return (
		<TitleContainer className={className}>
			<h2>{title}</h2>
			{element}
		</TitleContainer>
	);
};

export default Title;

const TitleContainer = styled.div`
	padding-left: 20px;
	padding-right: 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;

	h2 {
		font-size: ${fontSize.xl};
		font-weight: ${fontWeight.bold};
	}
`;
