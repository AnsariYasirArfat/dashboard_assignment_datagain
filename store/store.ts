import { configureStore } from "@reduxjs/toolkit";
import appealLetterReducer from "./reducers/appealLetterSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      appealLetter: appealLetterReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
