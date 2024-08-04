import { configureStore } from '@reduxjs/toolkit';
import modalReducer, { IModalState } from '@/stores/modalSlice';

const store = configureStore({
	reducer: {
		modal: modalReducer,
	},
});

export type RootState = {
	modal: IModalState;
};
export type AppDispatch = typeof store.dispatch;

export default store;
