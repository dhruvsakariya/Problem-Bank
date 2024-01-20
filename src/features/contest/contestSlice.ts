import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import type { Problem } from "../../utils/types/Problem";
import { Language, Questions } from "./contest";

export interface ContestState {
  problemIdx: number;
  questions: Questions;
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
    setQuestions: (state, action: PayloadAction<Questions>) => {
      state.questions = action.payload;
    },

    setProblemLanguage: (
      state,
      action: PayloadAction<{ lang: Language; idx?: number }>
    ) => {
      const lang = action.payload.lang;

      const idx = action.payload.idx || state.problemIdx;

      state.questions[idx].language = lang;
    },
  },
});

export const { setProblemIdx, setQuestions, setProblemLanguage } =
  contestSlice.actions;

export const contestState = (state: RootState) => state.contest;

export default contestSlice.reducer;
