// src/reducers/counterReducer.ts
import { createSlice } from "@reduxjs/toolkit";

interface DrawerState {
  isDrawerExpanded: boolean;
}

const initialState: DrawerState = {
  isDrawerExpanded: true,
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    toggleDrawerExpanded(state) {
      state.isDrawerExpanded = !state.isDrawerExpanded;
    },
  },
});

export const { toggleDrawerExpanded } = drawerSlice.actions;
export default drawerSlice.reducer;
