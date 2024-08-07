import { configureStore } from '@reduxjs/toolkit';
import modalReducer, { IModalState } from '@/stores/modalSlice';
import userInfoReducer, { IUserInfoState } from '@/stores/userInfoSlice';
import scheduleReducer from '@/stores/scheduleSlice';

const store = configureStore({
	reducer: {
		modal: modalReducer,
		userInfo: userInfoReducer,
		schedules: scheduleReducer,
	},
});

export type RootState = {
	modal: IModalState;
	userInfo: IUserInfoState;
	schedules: ReturnType<typeof scheduleReducer>;
};
export type AppDispatch = typeof store.dispatch;

export default store;
