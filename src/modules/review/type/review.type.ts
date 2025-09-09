export interface Review {
    reviewId: number;
    restaurantId: number;
    rating: number;
    content: string | null;
    authorName: string | null;
    delYn: string;
    createdAt: string;
    updatedAt: string;
}

export interface ReviewCount {
    kakaoPlaceId: string;
    count: number;
}

export interface CreateReviewRequest {
    kakaoPlaceId: string;
    restaurantName: string;
    restaurantAddress: string;
    rating: number;
    content?: string;
    authorName: string;
}

export interface GetReviewCountsRequest {
    kakaoPlaceIds: string[];
}

export type CreateReviewResponse = Review;

export type GetReviewCountsResponse = {
    counts: ReviewCount[];
}

export interface GetReviewsRequest {
    kakaoPlaceId: string;
}

export type GetReviewsResponse = Review[];
