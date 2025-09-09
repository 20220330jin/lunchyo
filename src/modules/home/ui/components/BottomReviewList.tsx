import {MessageCircle, Star} from "lucide-react";
import {useReviews} from "@/modules/review/queries/use-review-queries";
import {formatTimeAgo} from "@/util/DateUtil";

interface BottomReviewListProps {
    kakaoPlaceId: string;
}

export const BottomReviewList = ({kakaoPlaceId}: BottomReviewListProps) => {
    console.log("restaurantId", kakaoPlaceId);
    const {reviews, isLoading} = useReviews(kakaoPlaceId);
    console.log('revies', reviews);
    console.log("isLoading", isLoading);
    return (
        <div className="space-y-2">
            <h4 className="text-sm text-gray-900 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-blue-500"/>
                리뷰 목록 ({reviews.length}개)
            </h4>
            {reviews.length === 0 ? (
                <div className="text-center py-6 bg-gray-50 rounded-lg">
                    <div className="text-gray-500 mb-1">💬</div>
                    <div className="text-gray-600 text-sm">아직 리뷰가 없어요</div>
                </div>
            ) : (
                <div className={`max-h-48 overflow-y-auto scrollbar-thin`}>
                    <div className="space-y-2 pb-2">
                        {reviews.map((review) => (
                            <div key={review.reviewId} className="bg-white rounded-lg border p-3 space-y-2">
                                <div className=" flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm text-gray-900">{review.authorName}</span>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400"/>
                                                <span className="text-xs text-gray-700">{review.rating}</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-700 leading-relaxed">{review.content}</p>
                                    </div>
                                    <span className="text-sm text-gray-500 ml-2 flex-shrink-0">
                                        {formatTimeAgo(review.createdAt)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
