import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_KEY } from '../utils/constants';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.openweathermap.org/data/2.5/',
});

export const weatherSlice = createApi({
  reducerPath: 'weatherApi',
  baseQuery: baseQuery,
  endpoints(builder) {
    return {
      getTodayWeather: builder.query({
        query: ({ latitude, longitude }) => ({
          url: `weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`,
          method: 'GET',
        }),
      }),
      getForecastWeather: builder.query({
        query: ({ latitude, longitude }) => ({
          url: `forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`,
          method: 'GET',
        })
      }),
    };
  },
});

export const { useGetTodayWeatherQuery, useGetForecastWeatherQuery } = weatherSlice;
