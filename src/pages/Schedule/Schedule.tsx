/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

const Schedule = () => {
	const schedules = [1, 2];
	return (
		<div>
			<h1 css={textStyle}>Schedule Page</h1>
			<ul>
				{schedules.map((id) => (
					<li key={id}>
						<Link to={`${id}`} css={textStyle}>
							Schedule Detail {id}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Schedule;

const textStyle = css`
	color: #750000;
`;
