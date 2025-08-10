import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export type CalendarItemType = "event" | "reminder";

export interface CalendarItem {
  id: string;
  title: string;
  start: string;   
  end?: string;    
  allDay?: boolean;
  type: CalendarItemType;
}

export interface DateClickInfo {
  dateStr: string;
  allDay: boolean;
  date: Date;
  timeStr?: string;
}

export type DialogMode = "add" | "view" | "edit";

export interface DialogState {
  mode: DialogMode;
  open: boolean;
  clickedDateInfo: DateClickInfo | null;
  selectedItem: CalendarItem | null;
}

interface CalendarState {
  items: CalendarItem[];
  dialog: DialogState;
}

const initialState: CalendarState = { 
  items: [],
  dialog: {
    mode: "add",
    open: false,
    clickedDateInfo: null,
    selectedItem: null
  }
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    openAddDialog: (state, { payload }: PayloadAction<DateClickInfo>) => {
      state.dialog = {
        mode: "add",
        open: true,
        clickedDateInfo: payload,
        selectedItem: null
      };
    },
    openViewDialog: (state, { payload }: PayloadAction<CalendarItem>) => {
      state.dialog = {
        mode: "view",
        open: true,
        clickedDateInfo: null,
        selectedItem: payload
      };
    },
    openEditDialog: (state, { payload }: PayloadAction<CalendarItem>) => {
      state.dialog = {
        mode: "edit",
        open: true,
        clickedDateInfo: null,
        selectedItem: payload
      };
    },
    closeDialog: (state) => {
      state.dialog.open = false;
    },
    addItem: {
      reducer: (state, { payload }: PayloadAction<CalendarItem>) => {
        state.items.push(payload);
      },
      prepare: (item: Omit<CalendarItem, "id">) => ({
        payload: { ...item, id: nanoid() },
      }),
    },
    updateItem: (state, { payload }: PayloadAction<CalendarItem>) => {
      const i = state.items.findIndex((x) => x.id === payload.id);
      if (i !== -1) state.items[i] = payload;
    },
    deleteItem: (state, { payload }: PayloadAction<string>) => {
      state.items = state.items.filter((x) => x.id !== payload);
    },
  },
});

export const { 
  openAddDialog, 
  openViewDialog, 
  openEditDialog,
  closeDialog,
  addItem, 
  updateItem, 
  deleteItem 
} = calendarSlice.actions;
export default calendarSlice.reducer;
