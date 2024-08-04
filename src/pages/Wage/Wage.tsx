import WageTab from '@/components/Wage/WageTab';
import { Outlet } from 'react-router-dom';

const Wage = () => {
	return (
		<>
			<WageTab />
			<Outlet />
		</>
	);
};

export default Wage;
