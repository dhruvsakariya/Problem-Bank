import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import type { Problem } from "../../utils/types/Problem";

export interface ContestState {
  problemIdx: number;
  questions: Array<{
    key: string;
    value: Problem;
  }>;
}

const initialState: ContestState = {
  problemIdx: 0,
  questions: [],
};

export const contestSlice = createSlice({
  name: "contest",
  initialState,
  reducers: {
    setProblemIdx: (state, action: PayloadAction<number>) => {
      state.problemIdx = action.payload;
    },
    setQuestions: (
      state,
      action: PayloadAction<
        Array<{
          key: string;
          value: Problem;
        }>
      >
    ) => {
      state.questions = action.payload;
    },
  },
});

export const { setProblemIdx, setQuestions } = contestSlice.actions;

export const contestState = (state: RootState) => state.contest;

export default contestSlice.reducer;
