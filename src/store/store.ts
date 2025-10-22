import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import genericTableQueryReducer from "../Tables/genericTableQuerySlice.ts";

export const store = configureStore({
  reducer: {
    genericTableQuery: genericTableQueryReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
