import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ExecuteProgramResponse } from "./contest";

export const contestApi = createApi({
  reducerPath: "contestApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: ({ query }) => ({
    getAuthToken: query<string, void>({
      query: () => ({
        url: "auth-token",
        responseHandler: "content-type",
        method: "post",
        body: {
          clientId: process.env.REACT_APP_JDOODLE_CLIENT_ID,
          clientSecret: process.env.REACT_APP_JDOODLE_SECRET,
        },
      }),
    }),
    executeProgram: query<
      ExecuteProgramResponse,
      { script: string; language: string; versionIndex: number; stdin: string }
    >({
      query: ({ script, language, versionIndex, stdin }) => ({
        url: "execute",
        method: "post",
        body: {
          clientId: process.env.REACT_APP_JDOODLE_CLIENT_ID,
          clientSecret: process.env.REACT_APP_JDOODLE_SECRET,
          script: script,
          language: language,
          stdin: stdin,
          versionIndex: versionIndex,
        },
      }),
    }),
  }),
});

export const {
  useGetAuthTokenQuery,
  useLazyGetAuthTokenQuery,
  useLazyExecuteProgramQuery,
} = contestApi;
