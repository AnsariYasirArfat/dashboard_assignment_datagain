import { AppealData, initialAppealData } from "@/data/appeal-letter";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppealLetterState {
  data: AppealData[];
  selectedRows: string[]; 
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
  searchTerm: string;
  currentPage: number;
  itemsPerPage: number;
  loading: boolean;
  error: string | null;
}

const initialState: AppealLetterState = {
  data: initialAppealData,
  selectedRows: [],
  sortColumn: null,
  sortDirection: "asc",
  searchTerm: "",
  currentPage: 1,
  itemsPerPage: 10,
  loading: false,
  error: null,
};

export const appealLetterSlice = createSlice({
  name: "appealLetter",
  initialState,
  reducers: {
    // CRUD Operations
    addAppealLetter: (state, action: PayloadAction<Omit<AppealData, "id">>) => {
      const newId = (state.data.length + 1).toString();
      const newAppealLetter: AppealData = {
        ...action.payload,
        id: newId,
      };
      state.data.push(newAppealLetter);
    },

    updateAppealLetter: (state, action: PayloadAction<AppealData>) => {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },

    deleteAppealLetter: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
      // Remove from selected rows if it was selected
      state.selectedRows = state.selectedRows.filter(id => id !== action.payload);
    },

    deleteMultipleAppealLetters: (state, action: PayloadAction<string[]>) => {
      state.data = state.data.filter(
        (item) => !action.payload.includes(item.id)
      );
      // Remove from selected rows
      state.selectedRows = state.selectedRows.filter(id => !action.payload.includes(id));
    },

    // Selection Management
    setSelectedRows: (state, action: PayloadAction<string[]>) => {
      state.selectedRows = action.payload;
    },

    toggleRowSelection: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.selectedRows.indexOf(id);
      if (index !== -1) {
        // Remove from array
        state.selectedRows.splice(index, 1);
      } else {
        // Add to array
        state.selectedRows.push(id);
      }
    },

    selectAllRows: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.selectedRows = state.data.map((item) => item.id);
      } else {
        state.selectedRows = [];
      }
    },

    clearSelection: (state) => {
      state.selectedRows = [];
    },

    // Sorting
    setSortColumn: (state, action: PayloadAction<string | null>) => {
      state.sortColumn = action.payload;
    },

    setSortDirection: (state, action: PayloadAction<"asc" | "desc">) => {
      state.sortDirection = action.payload;
    },

    // Search
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1; // Reset to first page when searching
    },

    // Pagination
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
    },

    // Loading States
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Bulk Operations
    updateStatus: (
      state,
      action: PayloadAction<{ ids: string[]; status: "Not Sent" | "Sent" }>
    ) => {
      const { ids, status } = action.payload;
      state.data.forEach((item) => {
        if (ids.includes(item.id)) {
          item.status = status;
        }
      });
    },

    // Reset
    resetState: (state) => {
      return { ...initialState, data: state.data };
    },
  },
});

export const {
  addAppealLetter,
  updateAppealLetter,
  deleteAppealLetter,
  deleteMultipleAppealLetters,
  setSelectedRows,
  toggleRowSelection,
  selectAllRows,
  clearSelection,
  setSortColumn,
  setSortDirection,
  setSearchTerm,
  setCurrentPage,
  setItemsPerPage,
  setLoading,
  setError,
  updateStatus,
  resetState,
} = appealLetterSlice.actions;

export default appealLetterSlice.reducer;
