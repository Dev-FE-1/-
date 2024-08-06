// TODO: 하나의 드롭다운만 열리고, 다른 드롭다운을 열면 이전에 열린 드롭다운이 자동 닫히는 기능 만들 예정
import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { colors } from '@/constants/colors';
import { ChevronDown } from 'lucide-react';

interface IDropdownProps {
	options: { value: string; label: string; color?: string }[];
	selectedOption: string;
	onSelect: (option: string) => void;
	disabled?: boolean;
	className?: string;
	defaultLabel: string;
}

const Dropdown: React.FC<IDropdownProps> = ({
	options,
	selectedOption,
	onSelect,
	disabled,
	className,
	defaultLabel,
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
				<div>
					{selectedOptionData?.color && <ColorCircle color={selectedOptionData.color} />}
					{selectedOptionData?.label || <span>{defaultLabel}</span>}
				</div>
				<ChevronDown style={{ marginLeft: 'auto', strokeWidth: 1.2 }} />
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
	padding: 8px;
	width: 100%;
	height: 44px;
	display: flex;
	align-items: center;
	justify-content: space-between;
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
	justify-content: flex-start;
	&:hover {
		background-color: ${colors.lightestGray};
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
