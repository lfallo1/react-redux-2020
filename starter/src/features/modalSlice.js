import {createSlice} from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false
    },
    reducers: {
        openModal: (state) =>{
            state.isOpen = true
        },
        closeModal: (state) =>{
            state.isOpen = false
        },
    }
})

export default modalSlice.reducer;

export const modalActions = modalSlice.actions;