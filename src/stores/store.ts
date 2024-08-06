import { configureStore } from '@reduxjs/toolkit';
import modalReducer, { IModalState } from '@/stores/modalSlice';
import userInfoReducer, { IUserInfoState } from '@/stores/userInfoSlice';

const store = configureStore({
	reducer: {
		modal: modalReducer,
		userInfo: userInfoReducer,
	},
});

export type RootState = {
	modal: IModalState;
	userInfo: IUserInfoState;
};
export type AppDispatch = typeof store.dispatch;

export default store;
