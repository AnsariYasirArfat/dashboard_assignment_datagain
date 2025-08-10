import { configureStore } from "@reduxjs/toolkit";
import appealLetterReducer from "./reducers/appealLetterSlice";
import layoutReducer from "./reducers/layoutSlice";
import calendarReducer from "./reducers/calendarSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      appealLetter: appealLetterReducer,
      layout: layoutReducer,
      calendar: calendarReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
