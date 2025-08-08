import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LayoutState {
  sidebarCollapsed: boolean;
  drawerOpen: boolean;
  currentPage: string;
}

const initialState: LayoutState = {
  sidebarCollapsed: false,
  drawerOpen: false,
  currentPage: "/",
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
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarCollapsed,
  toggleDrawer,
  setDrawerOpen,
  setCurrentPage,
} = layoutSlice.actions;

export default layoutSlice.reducer;
