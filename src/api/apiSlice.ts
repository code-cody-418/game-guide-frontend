import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  type GameGuideReqI,
  type WowItemI,
  type WowItemsParamsI,
} from "../Items/WowItem.interface";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4202" }),
  endpoints: (builder) => ({
    getWowItems: builder.query<GameGuideReqI<WowItemI[]>, WowItemsParamsI>({
      query: (params) =>
        `/wow/get-wow-items/?search=${params.search}&itemLimit=${params.itemLimit}&pageOffset=${params.pageOffset}&sortCol=${params.sortCol}&sortOrder=${params.sortOrder}`,
    }),
    getWowItem: builder.query<GameGuideReqI<WowItemI[]>, string>({
      query: (itemId) => `/wow/get-wow-item/?itemId=${itemId}`,
    }),
  }),
});

// Note that the exported hooks are auto generated from the endpoints above. Read the RTK Docs for more info
export const { useGetWowItemsQuery, useGetWowItemQuery } = apiSlice;
