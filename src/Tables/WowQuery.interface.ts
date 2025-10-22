import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { GameGuideReqI } from "../Items/WowItem.interface.ts";
import type { SerializedError } from "@reduxjs/toolkit";

export interface WowQueryParamsI {
  search: string;
  itemLimit: number;
  pageOffset: number;
  sortCol: string;
  sortOrder: string;
}

export interface GenericHeaderI {
  readableHeader: string;
  sortCol: string;
  isSortable: boolean;
  dataPropertyName: string;
  rowStyling?: string;
  isImg?: boolean;
  isNav?: boolean;
  navLink?: string;
  navLinkId?: string;
}

export interface GenericTableParamsI {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: GameGuideReqI<any>;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  tableHeaders: Array<GenericHeaderI>;
}
