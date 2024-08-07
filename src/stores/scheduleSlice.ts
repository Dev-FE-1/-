import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getPersonalSchedule from '@/api/schedule/getPersonalSchedule';
import getOfficialSchedule from '@/api/schedule/getOfficialSchedule';
import { ISchedule } from '@/pages/Schedule/ScheduleDetail';

interface IFetchSchedulesArgs {
	year: number;
	month: number;
	isOfficial: boolean;
}

export const fetchSchedules = createAsyncThunk<ISchedule[], IFetchSchedulesArgs>(
	'schedules/fetchSchedules',
	async ({ year, month, isOfficial }) => {
		if (isOfficial) {
			const { officialScheduleData } = await getOfficialSchedule(year, month);
			return officialScheduleData.map((schedule: any) => ({
				userId: schedule.userId,
				workDate: schedule.date,
				wage: schedule.wage,
				workTime: schedule.workingTimes,
				breakTime: schedule.breakTime,
				memos: schedule.memos,
				isSub: schedule.isSub,
			}));
		} else {
			const { personalScheduleData } = await getPersonalSchedule(year, month);
			return personalScheduleData.map((schedule: any) => ({
				userId: schedule.userId,
				workDate: schedule.date,
				wage: schedule.wage,
				workTime: schedule.workingTimes,
				breakTime: schedule.breakTime,
				memos: schedule.memos,
			}));
		}
	},
);
const initialState = {
	data: [] as ISchedule[],
	status: 'idle',
	error: null as string | null,
};

const scheduleSlice = createSlice({
	name: 'schedules',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSchedules.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchSchedules.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.data = action.payload;
			})
			.addCase(fetchSchedules.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message || null;
			});
	},
});

export default scheduleSlice.reducer;
