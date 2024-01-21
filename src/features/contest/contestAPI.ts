import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  }),
});

export const { useGetAuthTokenQuery, useLazyGetAuthTokenQuery } = contestApi;
