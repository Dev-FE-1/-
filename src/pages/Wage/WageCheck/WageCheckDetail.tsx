/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useParams } from 'react-router-dom';

const WageCheckDetail = () => {
	const { id: wageId } = useParams<{ id: string }>();
	return <div css={textStyle}>Wage Detail Page for ID: {wageId}</div>;
};

export default WageCheckDetail;

const textStyle = css`
	color: #00e82d;
`;
