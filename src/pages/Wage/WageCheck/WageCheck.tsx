/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

const WageCheck = () => {
	const wages = [1, 2, 3];
	return (
		<div>
			<ul>
				{wages.map((id) => (
					<li key={id}>
						<Link to={`${id}`} css={textStyle}>
							Wage Detail {id}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default WageCheck;

const textStyle = css`
	color: #b8ff79;
`;
