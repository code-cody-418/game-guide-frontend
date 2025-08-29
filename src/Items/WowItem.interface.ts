export interface GameGuideReqI<T> {
  code: number | null;
  message: string;
  body: T;
}

export interface WowItemsParamsI {
  search: string;
  itemLimit: number;
  pageOffset: number;
}

export interface WowItemI {
  item_id: string;
  item_name: string;
  media_value: string | null;
}
