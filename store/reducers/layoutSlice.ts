import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LayoutState {
  sidebarCollapsed: boolean;
  drawerOpen: boolean;
}

const initialState: LayoutState = {
  sidebarCollapsed: false,
  drawerOpen: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
    toggleDrawer: (state) => {
      state.drawerOpen = !state.drawerOpen;
    },
    setDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.drawerOpen = action.payload;
    },
   
  },
});

export const {
  toggleSidebar,
  setSidebarCollapsed,
  toggleDrawer,
  setDrawerOpen,
} = layoutSlice.actions;

export default layoutSlice.reducer;
