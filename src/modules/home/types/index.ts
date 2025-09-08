/**
 * 메인 화면 음식 종류를 위한 타입
 */
export type CategoryType = 'all' | '한식' | '양식' | '일식' | '중식' | '아시안' | '분식' | '카페';

export interface RestaurantType {
    id: string;
    place_name: string;
    category_name: string;
    address_name: string;
    road_address_name: string;
    phone: string;
    place_url: string;
    x: string; // 경도
    y: string; // 위도
    distance?: string; // 거리 (중심 좌표 기준)
}

