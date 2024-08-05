import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { colors } from '@/constants/colors';

interface IDropdownProps {
	options: { value: string; label: string; color?: string }[];
	selectedOption: string;
	onSelect: (option: string) => void;
	disabled?: boolean;
	className?: string;
}

const Dropdown: React.FC<IDropdownProps> = ({
	options,
	selectedOption,
	onSelect,
	disabled,
	className,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = useCallback(() => {
		if (!disabled) {
			setIsOpen((prev) => !prev);
		}
	}, [disabled]);

	const handleSelect = useCallback(
		(option: string) => {
			if (!disabled) {
				onSelect(option);
				setIsOpen(false);
			}
		},
		[disabled, onSelect],
	);

	const selectedOptionData = options.find((opt) => opt.value === selectedOption);

	return (
		<DropdownContainer className={className}>
			<DropdownButton onClick={handleToggle} disabled={disabled} className={className}>
				{selectedOptionData?.color && <ColorCircle color={selectedOptionData.color} />}
				{selectedOptionData?.label || '선택'}
			</DropdownButton>
			{isOpen && (
				<DropdownMenu>
					{options.map((option) => (
						<DropdownItem key={option.value} onClick={() => handleSelect(option.value)}>
							{option.color && <ColorCircle color={option.color} />}
							{option.label}
						</DropdownItem>
					))}
				</DropdownMenu>
			)}
		</DropdownContainer>
	);
};

export default Dropdown;

const DropdownContainer = styled.div`
	position: relative;
	width: 100%;
`;

const DropdownButton = styled.button<{ disabled?: boolean }>`
	width: 100%;
	padding: 8px;
	border: ${(props) => (props.disabled ? 'none' : `1px solid ${colors.lightGray}`)};
	border-radius: 8px;
	background-color: ${(props) => (props.disabled ? colors.lightestGray : colors.white)};
	color: ${colors.black};
	cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
	text-align: left;
	appearance: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	height: 44px;
	display: flex;
	align-items: center;
	&:after {
		content: '▼';
		margin-left: auto;
	}
	&.error {
		border: 1px solid ${colors.red};
	}
`;

const DropdownMenu = styled.ul`
	position: absolute;
	top: 100%;
	left: 0;
	width: 100%;
	border: 1px solid ${colors.lightGray};
	border-radius: 8px;
	background-color: ${colors.white};
	list-style: none;
	margin-top: 4px;
`;

const DropdownItem = styled.li`
	padding: 12px;
	margin: 4px;
	border-radius: 8px;
	cursor: pointer;
	display: flex;
	align-items: center;
	&:hover {
		background-color: ${colors.lightGray};
	}
`;

const ColorCircle = styled.span<{ color: string }>`
	display: inline-block;
	width: 14px;
	height: 14px;
	border-radius: 50%;
	background-color: ${(props) => props.color};
	margin-right: 8px;
`;
