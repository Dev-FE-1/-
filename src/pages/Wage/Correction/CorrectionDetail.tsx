import React from 'react';
import { css } from '@emotion/react';
import { useParams } from 'react-router-dom';

const CorrectionDetail = () => {
	const { id: correctionId } = useParams<{ id: string }>();
	return <div css={textStyle}>Correction Detail Page for ID: {correctionId}</div>;
};

export default CorrectionDetail;

const textStyle = css`
	color: #646cff;
`;
