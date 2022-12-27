import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isMobileOpen: false
    },
    reducers: {
        toggleSidebar: ( state ) => {
            state.isMobileOpen = !state.isMobileOpen;
        }
    }
});


// Action creators are generated for each case reducer function
export const { toggleSidebar } = uiSlice.actions;