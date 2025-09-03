import {categoryEnum} from "@/db/schema";

/**
 * 추천 메뉴 조회 API 요청 타입
 */
export interface GetMenuRecommendationRequest {
    category: typeof categoryEnum.enumValues[number] | 'all';
}

/**
 * 추천 메뉴 조회 API 반환 타입
 */
export interface GetMenuRecommendationResponse {
    menus: Menu[];
}

/**
 * 메뉴 타입
 */
export interface Menu {
    id: number;
    name: string;
    category: typeof categoryEnum.enumValues[number];
}


