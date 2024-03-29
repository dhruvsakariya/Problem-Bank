import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Language, Questions } from "./contest";
import { TestCaseResult } from "../../utils/types/Problem";

export interface ContestState {
  authToken: string;
  socketConnected: boolean;
  problemIdx: number;
  questions: Questions;
}

const initialState: ContestState = {
  authToken: "",
  socketConnected: false,
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

    setSocketConnected: (state, action: PayloadAction<boolean>) => {
      state.socketConnected = action.payload;
    },

    setProblemIdx: (state, action: PayloadAction<number>) => {
      state.problemIdx = action.payload;
    },
    setQuestions: (state, action: PayloadAction<Questions>) => {
      state.questions = action.payload;
    },
    setTestCaseResult: (
      state,
      action: PayloadAction<{
        queIdx: number;
        caseIdx: number;
        result: TestCaseResult;
      }>
    ) => {
      const { queIdx, caseIdx, result } = action.payload;
      state.questions[queIdx].value.examples[caseIdx].result = result;
    },

    setProblemLanguage: (
      state,
      action: PayloadAction<{ lang: Language; idx?: number }>
    ) => {
      const lang = action.payload.lang;

      const idx = action.payload.idx || state.problemIdx;

      state.questions[idx].language = lang;
    },

    setProblemSubmitted: (
      state,
      action: PayloadAction<{ submitted: boolean; idx?: number }>
    ) => {
      const submitted = action.payload.submitted;

      const idx = action.payload.idx || state.problemIdx;

      state.questions[idx].submitted = submitted;
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
  setSocketConnected,
  setProblemLanguage,
  setProblemSubmitted,
  setUserCode,
  setAuthToken,
  setTestCaseResult,
} = contestSlice.actions;

export const contestState = (state: RootState) => state.contest;

export default contestSlice.reducer;
