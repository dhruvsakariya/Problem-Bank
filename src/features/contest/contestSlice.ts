import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface ContestState {
  problemIdx: number;
}

const initialState: ContestState = {
  problemIdx: 0,
};

export const contestSlice = createSlice({
  name: "contest",
  initialState,
  reducers: {
    setProblemIdx: (state, action: PayloadAction<number>) => {
      state.problemIdx = action.payload;
    },
  },
});

export const { setProblemIdx } = contestSlice.actions;

export const contestState = (state: RootState) => state.contest;

export default contestSlice.reducer;
