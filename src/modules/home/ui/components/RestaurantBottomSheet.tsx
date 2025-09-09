import {Sheet, SheetContent, SheetTitle} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {MapPin, SlidersHorizontal, Star} from "lucide-react";
import {Menu} from "@/core/types/menu.type";
import {useMemo, useState} from "react";
import {useRestaurants} from "@/modules/home/queries/use-restaurant-query";
import {RestaurantCard} from "@/modules/home/ui/components/RestaurantCard";
import {useReviewCounts} from "@/modules/review/queries/use-review-queries";

interface RestaurantBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    selectedMenu: Menu;
}

export const RestaurantBottomSheet = ({isOpen, onClose, selectedMenu}: RestaurantBottomSheetProps) => {
    const [selectedFilter, setSelectedFilter] = useState<'distance' | 'rating' | 'popular'>('distance');
    const filterOptions = [
        {id: 'distance', name: '거리순', icon: MapPin},
        {id: 'rating', name: '평점순', icon: Star},
        {id: 'popular', name: '인기순', icon: SlidersHorizontal}
    ] as const;
    const searchQuery = selectedMenu ? selectedMenu.name : '';

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {restaurants, isLoading, isError, error} = useRestaurants(searchQuery);
    /* 카카오 ID 모음 */
    const kakaoPlaceIds = useMemo(() => restaurants?.map(r => r.id) || [], [restaurants])
    /* 맛집 리뷰 갯수 API */
    const {reviewCounts} = useReviewCounts(kakaoPlaceIds);

    const restaurantWithReviewCounts = useMemo(() => {
        const countsMap = new Map(reviewCounts.map(count => [count.kakaoPlaceId, count.count]))

        return restaurants?.map(restaurant => ({
            ...restaurant,
            reviewCount: countsMap.get(restaurant.id) || 0,
        })) || []
    }, [restaurants, reviewCounts])

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl border-t-0 bg-gray-50 p-0">
                <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-6"/>
                <div className="px-4 pb-6 h-full flex flex-col min-h-0">
                    {/* 헤더 */}
                    <div className="mb-6">
                        <SheetTitle className="flex items-center gap-2 text-xl mb-2">
                            <span className="text-2xl">{selectedMenu?.category === '한식' ? '🇰🇷' : '🍽️'}</span>
                            {selectedMenu?.name} 맛집
                        </SheetTitle>
                        <p className="text-sm text-gray-600 mb-4">
                            {selectedFilter === 'distance' ? '가까운 순으로' : selectedFilter === 'rating' ? '평점 높은 순으로' : '인기 순으로'} 총
                            2곳을 찾았어요
                        </p>
                        {/* 필터 버튼 */}
                        <div className="flex gap-2">
                            {filterOptions.map((option) => {
                                const IconComponent = option.icon
                                return (
                                    <Button key={option.id}
                                            variant={selectedFilter === option.id ? 'default' : 'outline'} size="sm"
                                            onClick={() => setSelectedFilter(option.id)}
                                            className={`flex items-center gap-1.5 h-9 px-3 transition-all duration-200 active:scale-95 ${selectedFilter === option.id ? 'bg-blue-600 text-white shadow-sm scale-105' : 'bg-white border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700'}`}>
                                        <IconComponent className="w-3.5 h-3.5"/>
                                        <span className="text-xs">{option.name}</span>
                                    </Button>
                                )
                            })}
                        </div>
                    </div>
                    {/* 맛집 리스트 */}
                    <div className={`flex-1 overflow-y-auto min-h-0 scrollbar-thin `}>
                        <div className="space-y-3 pb-4">
                            {restaurantWithReviewCounts.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-gray-500 mb-2">😅</div>
                                    <div className="text-gray-600">선택한 메뉴와 관련된 맛집이 없어요.</div>
                                </div>
                            ) : (
                                restaurantWithReviewCounts.map((restaurant) => (
                                    <RestaurantCard key={restaurant.id} restaurant={restaurant}/>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
