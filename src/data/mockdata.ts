import { v4 as uuidv4 } from 'uuid';

export interface IMockDate {
	userId: string;
	workDate: string;
	workType: string;
	isOfficial: boolean;
}

export interface ISchedule {
	userId: string;
	workDate: string;
	wage: string;
	workTime: string;
	breakTime: string;
	memo: string;
}

export const mockdata: IMockDate[] = [
	{ userId: '1', workDate: '2024-06-03', workType: 'open', isOfficial: false },
	{ userId: '2', workDate: '2024-06-24', workType: 'open', isOfficial: true },
	{ userId: '3', workDate: '2024-06-24', workType: 'open', isOfficial: false },
	{ userId: '4', workDate: '2024-07-06', workType: 'open', isOfficial: true },
	{ userId: '5', workDate: '2024-07-07', workType: 'close', isOfficial: true },
	{ userId: '6', workDate: '2024-07-18', workType: 'middle', isOfficial: false },
	{ userId: '7', workDate: '2024-07-19', workType: 'middle', isOfficial: false },
	{ userId: '8', workDate: '2024-07-24', workType: 'close', isOfficial: true },
	{ userId: '9', workDate: '2024-07-24', workType: 'middle', isOfficial: true },
	{ userId: '10', workDate: '2024-08-12', workType: 'close', isOfficial: false },
	{ userId: '11', workDate: '2024-08-13', workType: 'middle', isOfficial: true },
	{ userId: '12', workDate: '2024-08-14', workType: 'close', isOfficial: false },
];

export const scheduleData: ISchedule[] = [
	{
		userId: '1',
		workDate: '2024-08-01',
		wage: '10,030원',
		workTime: 'middle',
		breakTime: '30분',
		memo: '',
	},
	{
		userId: '2',
		workDate: '2024-07-31',
		wage: '10,030원',
		workTime: 'open',
		breakTime: '30분',
		memo: '아 퇴근하고 싶다',
	},
	{
		userId: '3',
		workDate: '2024-07-30',
		wage: '10,030원',
		workTime: 'close',
		breakTime: '30분',
		memo: '어제 음료수 한개 뺴먹음 ㅋ',
	},
];

export const addSchedule = (newSchedule: Omit<ISchedule, 'userId'>) => {
	const newEntry: ISchedule = { ...newSchedule, userId: uuidv4() };
	scheduleData.push(newEntry);
};

export const updateSchedule = (userId: string, updatedData: Partial<ISchedule>) => {
	const scheduleIndex = scheduleData.findIndex((schedule) => schedule.userId === userId);
	if (scheduleIndex !== -1) {
		scheduleData[scheduleIndex] = {
			...scheduleData[scheduleIndex],
			...updatedData,
		};
	}
};

export const deleteSchedule = (userId: string) => {
	const index = scheduleData.findIndex((item) => item.userId === userId);
	if (index !== -1) {
		scheduleData.splice(index, 1);
	}
};
