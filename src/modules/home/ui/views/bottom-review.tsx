import {BottomReviewForm} from "@/modules/home/ui/components/BottomReviewForm";
import {BottomReviewList} from "@/modules/home/ui/components/BottomReviewList";
import {RestaurantForReviewType} from "@/modules/home/types";

interface BottomReviewProps {
    restaurant: RestaurantForReviewType
}

export const BottomReview = ({restaurant}: BottomReviewProps) => {
    return (
        <div className="mt-3 space-y-3 animate-in slide-in-from-bottom-2 duration-300">
            <BottomReviewForm restaurant={restaurant}/>
            <BottomReviewList kakaoPlaceId={restaurant.kakaoPlaceId}/>
        </div>
    )
}
