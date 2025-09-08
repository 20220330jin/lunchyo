import {useLocationInfo} from "@/context/location-context";
import {useQuery} from "@tanstack/react-query";

interface KakaoRestaurantDocument {
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

interface UseRestaurantResult {
    restaurants: KakaoRestaurantDocument[];
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
}

export const useRestaurants = (searchQuery: string): UseRestaurantResult => {
    const {location} = useLocationInfo();
    console.log('location', location);

    const {data: restaurants = [], isLoading, isError, error} = useQuery<KakaoRestaurantDocument[], Error>({
        queryKey: ['restaurants', location?.latitude, location?.longitude, searchQuery],
        queryFn: async () => {
            if (!location) {
                throw new Error('위치 정보가 없습니다.');
            }

            if (!searchQuery) {
                throw new Error('검색어가 필요합니다.');
            }

            const response = await fetch(`/api/kakao/search?query=${encodeURIComponent(searchQuery)}&x=${location.longitude}&y=${location.latitude}&radius=1000`)

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '맛집 검색 실패')
            }

            const data = await response.json();
            return data.documents || [];
        },
        enabled: !!location && !!searchQuery,
    })

    return {restaurants, isLoading, isError, error}
}
