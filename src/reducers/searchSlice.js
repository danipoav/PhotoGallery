import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchInput: ''
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        changeInput: (state, action) => {
            state.searchInput = action.payload;
        }
    }
});

export const { changeInput } = searchSlice.actions;
export default searchSlice.reducer;
