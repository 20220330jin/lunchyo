import { categoryEnum } from "@/db/schema";
import { Menu } from "@/core/types/menu.type";

/**
 * 추천 메뉴 조회 API 요청 타입
 */
export interface GetMenuRecommendationRequest {
    category: typeof categoryEnum.enumValues[number] | 'all';
}

/**
 * 추천 메뉴 조회 API 반환 타입 (Menu의 배열)
 */
export type GetMenuRecommendationResponse = Menu[];