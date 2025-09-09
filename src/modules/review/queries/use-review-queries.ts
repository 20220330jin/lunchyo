import {GetReviewCountsResponse, GetReviewsResponse, ReviewCount} from "@/modules/review/type/review.type";
import {useQuery} from "@tanstack/react-query";

interface UseReviewCountsResult {
    reviewCounts: ReviewCount[];
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
}

export const reviewQueryKeys = {
    all: ['reviews'] as const,
    counts: (ids: string[]) => [...reviewQueryKeys.all, 'counts', ids] as const,
    list: (restaurantId: string) => [...reviewQueryKeys.all, 'list', restaurantId] as const,
}

export const useReviewCounts = (kakaoPlaceIds: string[]): UseReviewCountsResult => {
    const {data, isLoading, isError, error} = useQuery<GetReviewCountsResponse, Error>({
        queryKey: reviewQueryKeys.counts(kakaoPlaceIds),
        queryFn: async () => {
            if (kakaoPlaceIds.length === 0) {
                return {counts: []};
            }

            const response = await fetch('/api/reviews/counts', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({kakaoPlaceIds}),
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '리뷰 개수 조회에 실패했습니다.');
            }
            return response.json();
        },
        enabled: kakaoPlaceIds.length > 0,
    })

    return {
        reviewCounts: data?.counts || [],
        isLoading,
        isError,
        error
    }
}

interface UseReviewsResult {
    reviews: GetReviewsResponse; // 실제 리뷰 데이터 배열
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
}

export const useReviews = (kakaoPlaceId: string): UseReviewsResult => {
    const {data, isLoading, isError, error} = useQuery<GetReviewsResponse, Error>({
        queryKey: reviewQueryKeys.list(kakaoPlaceId),
        queryFn: async () => {
            const response = await fetch(`/api/reviews?kakaoPlaceId=${kakaoPlaceId}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '리뷰 개수 조회에 실패했습니다.');
            }
            const data = await response.json();
            return data;
        },
        enabled: !!kakaoPlaceId,
    })

    return {
        reviews: data || [],
        isLoading,
        isError,
        error
    }
}
