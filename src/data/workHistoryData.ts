import { Timestamp } from 'firebase/firestore';

export interface IWorkHistoryItem {
	date: Timestamp;
	workPlace: string;
	workingTimes: string;
	amount: number;
}

const workHistoryData: IWorkHistoryItem[] = [
	{
		date: Timestamp.fromDate(new Date(2021, 6, 23, 7, 0)),
		workPlace: '패스트캠퍼스점',
		workingTimes: '오전(07:00~12:00) | 휴게 30분',
		amount: 45135,
	},
	{
		date: Timestamp.fromDate(new Date(2021, 6, 23, 12, 0)),
		workPlace: '패스트캠퍼스점',
		workingTimes: '미들(12:00~17:00) | 휴게 30분',
		amount: 45135,
	},
	{
		date: Timestamp.fromDate(new Date(2021, 6, 23, 17, 0)),
		workPlace: '패스트캠퍼스점',
		workingTimes: '마감(17:00~22:00) | 휴게 30분',
		amount: 45135,
	},
	{
		date: Timestamp.fromDate(new Date(2021, 6, 24, 7, 0)),
		workPlace: '패스트캠퍼스점',
		workingTimes: '오전(07:00~12:00) | 휴게 30분',
		amount: 45135,
	},
	{
		date: Timestamp.fromDate(new Date(2021, 6, 24, 12, 0)),
		workPlace: '패스트캠퍼스점',
		workingTimes: '미들(12:00~17:00) | 휴게 30분',
		amount: 45135,
	},
	{
		date: Timestamp.fromDate(new Date(2021, 6, 25, 7, 0)),
		workPlace: '패스트캠퍼스점',
		workingTimes: '오전(07:00~12:00) | 휴게 30분',
		amount: 45135,
	},
	{
		date: Timestamp.fromDate(new Date(2021, 6, 25, 12, 0)),
		workPlace: '패스트캠퍼스점',
		workingTimes: '미들(12:00~17:00) | 휴게 30분',
		amount: 45135,
	},
	{
		date: Timestamp.fromDate(new Date(2021, 6, 25, 17, 0)),
		workPlace: '패스트캠퍼스점',
		workingTimes: '마감(17:00~22:00) | 휴게 30분',
		amount: 45135,
	},
	{
		date: Timestamp.fromDate(new Date(2021, 6, 25, 7, 0)),
		workPlace: '패스트캠퍼스점',
		workingTimes: '오전(07:00~12:00) | 휴게 30분',
		amount: 45135,
	},
	{
		date: Timestamp.fromDate(new Date(2021, 6, 25, 12, 0)),
		workPlace: '패스트캠퍼스점',
		workingTimes: '미들(12:00~17:00) | 휴게 30분',
		amount: 45135,
	},
	{
		date: Timestamp.fromDate(new Date(2021, 6, 26, 7, 0)),
		workPlace: '패스트캠퍼스점',
		workingTimes: '오전(07:00~12:00) | 휴게 30분',
		amount: 45135,
	},
	{
		date: Timestamp.fromDate(new Date(2021, 6, 26, 12, 0)),
		workPlace: '패스트캠퍼스점',
		workingTimes: '미들(12:00~17:00) | 휴게 30분',
		amount: 45135,
	},
	{
		date: Timestamp.fromDate(new Date(2021, 6, 26, 17, 0)),
		workPlace: '패스트캠퍼스점',
		workingTimes: '마감(17:00~22:00) | 휴게 30분',
		amount: 45135,
	},
	{
		date: Timestamp.fromDate(new Date(2021, 6, 26, 17, 0)),
		workPlace: '패스트캠퍼스점',
		workingTimes: '마감(17:00~22:00) | 휴게 30분',
		amount: 45135,
	},
	{
		date: Timestamp.fromDate(new Date(2021, 6, 26, 17, 0)),
		workPlace: '패스트캠퍼스점',
		workingTimes: '마감(17:00~22:00) | 휴게 30분',
		amount: 45135,
	},
	{
		date: Timestamp.fromDate(new Date(2021, 6, 26, 17, 0)),
		workPlace: '패스트캠퍼스점',
		workingTimes: '마감(17:00~22:00) | 휴게 30분',
		amount: 45135,
	},
	{
		date: Timestamp.fromDate(new Date(2021, 6, 26, 17, 0)),
		workPlace: '패스트캠퍼스점',
		workingTimes: '마감(17:00~22:00) | 휴게 30분',
		amount: 45135,
	},
	{
		date: Timestamp.fromDate(new Date(2021, 6, 26, 17, 0)),
		workPlace: '패스트캠퍼스점',
		workingTimes: '마감(17:00~22:00) | 휴게 30분',
		amount: 45135,
	},
];

export default workHistoryData;
