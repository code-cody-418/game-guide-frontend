import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { WowQueryParamsI } from "./WowQuery.interface.ts";

const initialState: WowQueryParamsI = {
  search: "",
  pageOffset: 0,
  itemLimit: 10,
  sortCol: "",
  sortOrder: "ASC",
};

export const genericTableQuerySlice = createSlice({
  name: "genericTableQuery",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setPageOffSet: (state, action: PayloadAction<number>) => {
      state.pageOffset = action.payload;
    },
    setItemLimit: (state, action: PayloadAction<number>) => {
      state.itemLimit = action.payload;
    },
    setSortCol: (state, action: PayloadAction<string>) => {
      state.sortCol = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<string>) => {
      state.sortOrder = action.payload;
    },
    resetQuery: (state, action: PayloadAction<string>) => {
      state.search = "";
      state.pageOffset = 0;
      state.itemLimit = 10;
      state.sortCol = action.payload;
      state.sortOrder = "ASC";
    },
  },
});

export const {
  setSearch,
  setPageOffSet,
  setItemLimit,
  setSortCol,
  setSortOrder,
  resetQuery,
} = genericTableQuerySlice.actions;

export default genericTableQuerySlice.reducer;
