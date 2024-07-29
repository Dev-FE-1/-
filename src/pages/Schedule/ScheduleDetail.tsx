/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useParams } from 'react-router-dom';

const textStyle = css`
	color: #ff6464;
`;

const ScheduleDetail = () => {
	const { id: scheduleId } = useParams<{ id: string }>();
	return <div css={textStyle}>Schedule Detail Page for ID: {scheduleId}</div>;
};

export default ScheduleDetail;
