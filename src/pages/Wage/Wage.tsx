/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link, Outlet } from 'react-router-dom';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Wage = () => {
	// const navigate = useNavigate();

	// useEffect(() => {
	// 	navigate('check');
	// }, [navigate]);

	return (
		<div>
			<h1 css={textStyle}>Wage Page</h1>
			<div>
				<ul>
					<li>
						<Link to="check">급여 확인</Link>
					</li>
					<li>
						<Link to="correction">정정 신청</Link>
					</li>
				</ul>
				<Outlet />
			</div>
		</div>
	);
};

export default Wage;

const textStyle = css`
	color: #b8ff79;
`;
