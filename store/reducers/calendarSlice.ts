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

interface CalendarState {
  items: CalendarItem[];
}

const initialState: CalendarState = { items: [] };

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
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

export const { addItem, updateItem, deleteItem } = calendarSlice.actions;
export default calendarSlice.reducer;
