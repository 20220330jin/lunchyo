import {CreateReviewRequest} from "@/modules/review/type/review.type";

export const reviewInitializer = {
    INITIAL_CREATE_REVIEW_PARAM: {
        kakaoPlaceId: '',
        restaurantName: '',
        restaurantAddress: '',
        authorName: '',
        content: '',
        rating: 1,
    } as CreateReviewRequest
}
