export type CategoryType =
  | "전체"
  | "한식"
  | "양식"
  | "일식"
  | "중식"
  | "아시안"
  | "분식"
  | "카페"
  | "기타";
export interface Menu {
  menuId: string;
  menuName: string;
  menuCategory: CategoryType;
  menuDescription?: string;
  menuImageUrl?: string;
}

export interface Restaurant {
  restaurantId: string;
  restaurantName: string;
  restaurantAddress: string;
  restaurantPhone?: string;
  restaurantCategory: CategoryType;
  restaurantRating?: number;
  restaurantMenuItems?: Menu[];
}
