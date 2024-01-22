import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import contestReducer from "../features/contest/contestSlice";
import { contestApi } from "../features/contest/contestAPI";

export const store = configureStore({
  reducer: {
    contest: contestReducer,
    [contestApi.reducerPath]: contestApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contestApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
