import React from 'react';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

const Correction = () => {
	const corrections = [1, 2, 3, 4, 7];
	return (
		<div>
			<div>
				<Link to="/wage/correction/create">정정 신청하기</Link>
			</div>
			<ul>
				{corrections.map((id) => (
					<li key={id}>
						<Link to={`${id}`} css={textStyle}>
							Correction Detail {id}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Correction;

const textStyle = css`
	color: #red;
`;
