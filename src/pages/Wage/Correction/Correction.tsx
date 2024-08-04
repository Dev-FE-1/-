import { Link } from 'react-router-dom';

const Correction = () => {
	const corrections = [1, 2, 3, 4, 7];
	return (
		<>
			<div>
				<Link to="/wage/correction/create">정정 신청하기</Link>
			</div>
			<ul>
				{corrections.map((id) => (
					<li key={id}>
						<Link to={`${id}`}>Correction Detail {id}</Link>
					</li>
				))}
			</ul>
		</>
	);
};

export default Correction;
