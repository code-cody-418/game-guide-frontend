import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type GameGuideReqI, type WowItemI } from "../Items/WowItem.interface";
import type { WowQueryParamsI } from "../Tables/WowQuery.interface.ts";
import type { WowMountI } from "../Mounts/WowMount.interface.ts";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4202" }),
  endpoints: (builder) => ({
    getWowItems: builder.query<GameGuideReqI<WowItemI[]>, WowQueryParamsI>({
      query: (params) =>
        `/wow/get-wow-items/?search=${params.search}&itemLimit=${params.itemLimit}&pageOffset=${params.pageOffset}&sortCol=${params.sortCol}&sortOrder=${params.sortOrder}`,
    }),
    getWowItem: builder.query<GameGuideReqI<WowItemI>, string>({
      query: (itemId) => `/wow/get-wow-item/?itemId=${itemId}`,
    }),
    getWowMounts: builder.query<GameGuideReqI<WowMountI[]>, WowQueryParamsI>({
      query: (params) =>
        `/wow/get-wow-mounts/?search=${params.search}&itemLimit=${params.itemLimit}&pageOffset=${params.pageOffset}&sortCol=${params.sortCol}&sortOrder=${params.sortOrder}`,
    }),
    getWowMount: builder.query<GameGuideReqI<WowMountI>, string>({
      query: (mountId) => `/wow/get-wow-mount/?itemId=${mountId}`,
    }),
  }),
});

// Note that the exported hooks are auto generated from the endpoints above. Read the RTK Docs for more info
export const { useGetWowItemsQuery, useGetWowItemQuery, useGetWowMountsQuery, useGetWowMountQuery } =
  apiSlice;
