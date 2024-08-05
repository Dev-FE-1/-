import { Timestamp } from 'firebase/firestore';
import { IScheduleProps } from '@/hooks/useSchedules';

export const formatDateWithLeadingZeros = (timestamp: Timestamp) => {
	const date = timestamp.toDate();
	return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};

export const formatDateWithoutLeadingZeros = (timestamp: Timestamp) => {
	const date = timestamp.toDate();

	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const isWeekend = (timestamp: Timestamp): boolean => {
	const day = timestamp.toDate().getDay();
	return day === 0 || day === 6;
};

export const sortByWorkType = (a: IScheduleProps, b: IScheduleProps) => {
	const workTypeOrder = ['open', 'middle', 'close'];

	const aWorkType = a.workingTimes[0] || '';
	const bWorkType = b.workingTimes[0] || '';

	return workTypeOrder.indexOf(aWorkType) - workTypeOrder.indexOf(bWorkType);
};
