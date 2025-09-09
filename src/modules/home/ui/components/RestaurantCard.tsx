import {RestaurantForReviewType, RestaurantType} from "@/modules/home/types";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ChevronDown, ChevronUp, MessageCircle, Navigation, Share2, Star} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {BottomReview} from "@/modules/home/ui/views/bottom-review";
import {useState} from "react";

interface RestaurantCardProps {
    restaurant: RestaurantType;
}

export const RestaurantCard = ({restaurant}: RestaurantCardProps) => {
    /**
     * States
     */
    /* 리뷰리스트 노출 제어 state */
    const [showReviews, setShowReviews] = useState<boolean>(false);
    console.log("restaurant", restaurant);
    const restaurantInfoForReview: RestaurantForReviewType = {
        kakaoPlaceId: restaurant.id,
        restaurantName: restaurant.place_name,
        restaurantAddress: restaurant.address_name
    }
    return (
        <Card
            className="overflow-hidden hover:shadow-md transition-all duration-300 border-0 bg-white group active:scale-98">
            <CardContent className="p-3">
                <div className="space-y-3">
                    {/* 헤더 영역 */}
                    <div className="flex items-center justify-between">
                        <div className="flex-1 pr-2">
                            <h3 className="text-base text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-200">{restaurant.place_name}</h3>
                            <p className="text-xs text-gray-500 mt-1 leading-tight">{restaurant.address_name}</p>
                        </div>
                        <Button variant="ghost" size="sm"
                                className="p-1.5 h-7 w-7 text-gray-400 hover:text-blue-600 hover:bg-blue-50 flex-shrink-0 transition-all duration-200 active:scale-90">
                            <Share2 className="w-3 h-3"/>
                        </Button>
                    </div>
                    {/* 주요 정보 */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"/>
                            <span className="text-sm text-gray-700">0.0</span>
                        </div>
                        <Badge variant="outline"
                               className="text-xs px-1.5 py-0.5 border-blue-200 text-blue-700">{restaurant.distance}m</Badge>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                        <div/>
                        <div className="flex gap-1">
                            <Button variant="ghost" size="sm"
                                    className="p-1.5 h-8 w-8 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 active:scale-90">
                                <Navigation className="w-3.5 h-3.5"/>
                            </Button>
                        </div>
                    </div>
                    {/* 리뷰 토글 버튼 */}
                    <div className="border-t border-gray-100 pt-3 mt-3">
                        <Button variant="ghost" onClick={() => setShowReviews(!showReviews)}
                                className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 h-8">
                            <MessageCircle className="w-4 h-4"/>
                            <span className="text-sm">리뷰 ({restaurant.reviewCount})</span>
                            {showReviews ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                        </Button>
                        <div>
                            {/* 리뷰 작성 폼 리뷰 목록 */}
                            {showReviews && (
                                <BottomReview restaurant={restaurantInfoForReview}/>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
