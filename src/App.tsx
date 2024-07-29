import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Schedule from './pages/Schedule/Schedule';
import ScheduleDetail from './pages/Schedule/ScheduleDetail';
import Wage from './pages/Wage/Wage';
import WageCheck from './pages/Wage/WageCheck/WageCheck';
import WageCheckDetail from './pages/Wage/WageCheck/WageCheckDetail';
import Correction from './pages/Wage/Correction/Correction';
import CorrectionDetail from './pages/Wage/Correction/CorrectionDetail';
import Profile from './pages/Profile';
import './index.css';
import CorrectionRequest from './pages/Wage/Correction/CorrectionRequest';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: 'schedule',
		element: <Schedule />,
	},
	{
		path: 'schedule/:id',
		element: <ScheduleDetail />,
	},
	{
		path: 'wage',
		element: <Wage />,
		children: [
			{
				path: 'check',
				children: [
					{
						index: true,
						element: <WageCheck />,
					},
				],
			},
			{
				path: 'correction',
				children: [
					{
						index: true,
						element: <Correction />,
					},
				],
			},
		],
	},
	{
		path: 'wage/check/:id',
		element: <WageCheckDetail />,
	},
	{
		path: 'wage/correction/create',
		element: <CorrectionRequest />,
	},
	{
		path: 'wage/correction/:id',
		element: <CorrectionDetail />,
	},
	{
		path: 'profile',
		element: <Profile />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
