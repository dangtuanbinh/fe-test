/* eslint-disable no-restricted-globals */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_LINK, BASE_URL } from "../../utils/constants";

const API_KEY = process.env.REACT_APP_API_KEY

export const weatherAPIs = createApi({
  reducerPath: "weatherAPIs",

  baseQuery: fetchBaseQuery({
    baseUrl: API_LINK,
  }),
  endpoints: (builder) => ({
    getWeather: builder.query({
      query: (data) => ({
        url: `${BASE_URL}?q=${data.city},${data.country}&appid=5ee22198ff074c6271737bfbf846d9a7`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetWeatherQuery } = weatherAPIs;
