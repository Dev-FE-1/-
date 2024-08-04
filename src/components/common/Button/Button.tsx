import { FC } from 'react';
import { colors } from '@/constants/colors';
import styled from '@emotion/styled';

export interface IButtonProps {
	label: string;
	onClick: () => void;
	size?: 'small' | 'normal';
	theme?: 'primary' | 'secondary';
	buttonWidth?: string;
	disabled?: boolean;
}

const Button: FC<IButtonProps> = ({
	label,
	onClick,
	size = 'normal',
	theme = 'primary',
	buttonWidth = '100%',
	disabled = false,
}) => {
	return (
		<ButtonComponent
			onClick={onClick}
			size={size}
			theme={theme}
			buttonWidth={buttonWidth}
			disabled={disabled}
		>
			{label}
		</ButtonComponent>
	);
};

const ButtonComponent = styled.button<{ size: string; theme: string; buttonWidth: string }>`
	width: ${(props) => props.buttonWidth};
	height: ${(props) => (props.size === 'small' ? '30px' : '44px')};
	padding: ${(props) => (props.size === 'small' ? '8px' : '12px')};
	background-color: ${(props) =>
		props.theme === 'primary' ? colors.primaryYellow : colors.lightestGray};
	color: ${(props) => (props.theme === 'primary' ? colors.white : colors.darkestGray)};
	font-weight: bold;
	border-radius: 8px;
	border: none;
	outline: none;

	&:hover {
		cursor: pointer;
		background-color: ${(props) =>
			props.theme === 'primary' ? colors.primaryYellowHover : colors.lightestGrayHover};
	}

	&:disabled {
		opacity: 0.4;

		&:hover {
			cursor: default;
			background-color: ${(props) =>
				props.theme === 'primary' ? colors.primaryYellow : colors.lightestGray};
		}
	}
`;

export default Button;
