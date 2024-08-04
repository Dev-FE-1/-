import { useParams } from 'react-router-dom';

const ScheduleDetail = () => {
	const { id: scheduleId } = useParams<{ id: string }>();
	return <>Schedule Detail Page for ID: {scheduleId}</>;
};

export default ScheduleDetail;
