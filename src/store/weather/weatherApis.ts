/* eslint-disable no-restricted-globals */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_LINK, BASE_URL } from "../../utils/constants";
import {API_KEY} from "../../../src/config"

export const weatherAPIs = createApi({
  reducerPath: "weatherAPIs",

  baseQuery: fetchBaseQuery({
    baseUrl: API_LINK,
  }),
  endpoints: (builder) => ({
    getWeather: builder.query({
      query: (data) => ({
        url: `${BASE_URL}?q=${data.city},${data.country}&appid=${API_KEY}`,
        method: "GET",
      }),
    }),
    getInitialWeather: builder.query({
      query: () => ({
        url: `${BASE_URL}?q=london,uk&appid=${API_KEY}`,
        method: "GET",
      }),
    }),  }),
});

export const { useLazyGetWeatherQuery, useGetInitialWeatherQuery } = weatherAPIs;
