export interface GameGuideReqI<T> {
  code: number | null;
  message: string;
  body: T;
}

export interface WowItemsParamsI {
  search: string;
  itemLimit: number;
  pageOffset: number;
  sortCol: string;
  sortOrder: string;
}

export interface WowItemI {
  item_id: string;
  item_name: string;
  media_value: string | null;
  inventory_type: string;
  purchase_price: number;
  appearance_id: string;
  quality: string;
  item_class: string;
  sell_price: number;
  item_level: string;
  item_subclass: string;
}
