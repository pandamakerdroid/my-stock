import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store';

export interface uiDataState {
    searchText: string
}

export const initialState: uiDataState = {
    searchText: ''
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: ({
        setSearchText: (state, action: PayloadAction<string>) => {
            state.searchText = action.payload;
        },
    })
})

export const {
    setSearchText
} = uiSlice.actions

export const selectSearchText = (state: RootState) => state.ui.searchText;

export default uiSlice.reducer;
