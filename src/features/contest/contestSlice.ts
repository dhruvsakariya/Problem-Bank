import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import type { Problem } from "../../utils/types/Problem";
import { Language, Questions } from "./contest";

export interface ContestState {
  authToken: string;
  problemIdx: number;
  questions: Questions;
}

const initialState: ContestState = {
  authToken: "",
  problemIdx: 0,
  questions: [],
};

export const contestSlice = createSlice({
  name: "contest",
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
    },


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

    setUserCode: (
      state,
      action: PayloadAction<{ code: string; lang?: Language; idx?: number }>
    ) => {
      const code = action.payload.code;

      const idx = action.payload.idx || state.problemIdx;
      const lang = action.payload.lang || state.questions[idx].language;

      state.questions[idx].code[lang] = code;
    },
  },
});

export const {
  setProblemIdx,
  setQuestions,
  setProblemLanguage,
  setUserCode,
  setAuthToken,
} = contestSlice.actions;

export const contestState = (state: RootState) => state.contest;

export default contestSlice.reducer;
