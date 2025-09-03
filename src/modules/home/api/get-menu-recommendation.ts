import {GetMenuRecommendationRequest, GetMenuRecommendationResponse} from "@/modules/home/types/recommendation";

export const getMenuRecommendations = async (
    params: GetMenuRecommendationRequest
): Promise<GetMenuRecommendationResponse> => {
    const res = await fetch(`/api/recommendations/menus?category=${params.category}`)

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || '메뉴를 추천받는데 실패했습니다.');
    }

    return res.json();
}
