import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import getUserInfo from '@/api/user/getUserInfo';

interface IUserInfo {
	name: string;
	workPlace: string;
	workingSets: { times: []; weeks: [] };
}

export interface IUserInfoState extends IUserInfo {
	loading: boolean;
	error: string | null;
}

const initialState: IUserInfoState = {
	name: '',
	workPlace: '',
	workingSets: { times: [], weeks: [] },
	loading: false,
	error: null,
};

export const fetchUserInfo = createAsyncThunk<IUserInfo, void, { rejectValue: string }>(
	'userInfo/fetchUserInfo',
	async (_, thunkAPI) => {
		try {
			const userInfo = await getUserInfo();
			return userInfo as IUserInfo;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

const userInfoSlice = createSlice({
	name: 'userInfo',
	initialState,
	reducers: {
		clearUserInfo: (state) => {
			state.name = '';
			state.workPlace = '';
			state.workingSets = { times: [], weeks: [] };
			state.loading = false;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserInfo.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchUserInfo.fulfilled, (state, action: PayloadAction<IUserInfo>) => {
				state.name = action.payload.name;
				state.workPlace = action.payload.workPlace;
				state.workingSets = action.payload.workingSets;
				state.loading = false;
			})
			.addCase(fetchUserInfo.rejected, (state, action: PayloadAction<string | undefined>) => {
				state.loading = false;
				state.error = action.payload ?? 'Unknown error';
			});
	},
});

export const { clearUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
