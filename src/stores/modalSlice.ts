import { createSlice } from '@reduxjs/toolkit';

export interface IModalState {
	isOpen: boolean;
	content: 'add' | 'view' | 'edit' | null;
}

const initialState: IModalState = {
	isOpen: false,
	content: null,
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, action) => {
			state.isOpen = true;
			state.content = action.payload;
		},
		closeModal: (state) => {
			state.isOpen = false;
			state.content = null;
		},
	},
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
