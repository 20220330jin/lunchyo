import {
    CreateReviewRequest,
    CreateReviewResponse,
    GetReviewCountsRequest,
    GetReviewCountsResponse
} from "@/modules/review/type/review.type";

export async function createReview(body: CreateReviewRequest): Promise<CreateReviewResponse> {
    const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
    })

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '리뷰 생성에 실패했습니다.');
    }

    return response.json();
}

export async function getReviewCounts(params: GetReviewCountsRequest): Promise<GetReviewCountsResponse> {
    const {kakaoPlaceIds} = params;
    if (kakaoPlaceIds.length === 0) {
        return {counts: []}
    }

    const response = await fetch('/api/reviews/counts', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(params),
    })

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '리뷰 개수 조회에 실패했습니다.');
    }
    return response.json();
}
