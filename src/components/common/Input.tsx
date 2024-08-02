import { colors } from '@/constants/colors';
import styled from '@emotion/styled';

export interface IInputProps {
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	inputWidth?: string;
	placeholder?: string;
	type?: 'text' | 'password' | 'date';
	disabled?: boolean;
}

const Input = ({
	value,
	onChange,
	inputWidth = '100%',
	placeholder = '',
	type = 'text',
	disabled = false,
}: IInputProps) => {
	return (
		<InputComponent
			value={value}
			onChange={onChange}
			inputWidth={inputWidth}
			placeholder={placeholder}
			type={type}
			disabled={disabled}
		/>
	);
};

const InputComponent = styled.input<IInputProps>`
	width: ${(props) => props.inputWidth};
	height: 44px;
	padding: 12px;
	border: 1px solid ${colors.lightGray};
	border-radius: 8px;
	color: ${colors.darkestGray};

	::placeholder {
		color: ${colors.gray};
	}

	&:hover {
		background-color: ${colors.veryLightGray};
	}

	&:focus {
		outline: none;
	}

	&:disabled {
		border-color: ${colors.lightestGray};
		background-color: ${colors.lightestGray};
		color: ${colors.darkestGray};
	}
`;

export default Input;
