/**
 * 카테고리 목록 조회 반환 타입의 단일 객체 형태 정의
 */
export interface ApiCategory {
  id: string;
  name: string;
  emoji: string;
  description?: string;
  delYn: boolean;
  regUser?: string;
  modUser?: string;
  regDateTime: string;
  modDateTime: string;
}

/**
 * 카테고리 목록조회 반환 타입
 */
export type GetCategoriesResponse = ApiCategory[];

export interface CategoryDisplayItem {
  id: string;
  name: string;
  emoji: string;
}
