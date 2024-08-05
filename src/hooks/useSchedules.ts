import { useState, useEffect } from 'react';
import getOfficialSchedule from '@/api/schedule/getOfficialSchedule';
import getPersonalSchedule from '@/api/schedule/getPersonalSchedule';

export interface IScheduleProps {
	date: string;
	workingTimes: string[];
}

const useSchedules = (year: number, month: number, isOfficial: boolean): IScheduleProps[] => {
	const [schedules, setSchedules] = useState<IScheduleProps[]>([]);

	useEffect(() => {
		const fetchSchedules = async () => {
			try {
				let fetchedData;

				if (isOfficial) {
					const { officialScheduleData } = await getOfficialSchedule(year, month);
					fetchedData = officialScheduleData;
				} else {
					const { personalScheduleData } = await getPersonalSchedule(year, month);
					fetchedData = personalScheduleData;
				}

				const formattedSchedules = fetchedData.map((schedule) => ({
					...schedule,
					date: `${year}-${month.toString().padStart(2, '0')}-${schedule.date.split('-')[2].padStart(2, '0')}`,
				}));

				setSchedules(formattedSchedules);
			} catch (error) {
				setSchedules([]);
			}
		};

		fetchSchedules();
	}, [year, month, isOfficial]);

	return schedules;
};

export default useSchedules;
