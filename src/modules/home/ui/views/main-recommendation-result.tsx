import {MenuCard} from "@/modules/home/ui/components/MenuCard";
import {CategoryType} from "@/modules/home/types";
import {GetMenuRecommendationResponse} from "@/modules/home/types/recommendation";
import {RestaurantBottomSheet} from "@/modules/home/ui/components/RestaurantBottomSheet";
import {useState} from "react";
import {Menu} from "@/core/types/menu.type";

interface MainRecommendationResultProps {
    menus: GetMenuRecommendationResponse;
    selectedCategory: CategoryType;
}

export const MainRecommendationResult = ({menus, selectedCategory}: MainRecommendationResultProps) => {
    /* 맛집 리스트 바텀시트 오픈 제어 state */
    const [isOpenBottomSheet, setIsOpenBottomSheet] = useState<boolean>(false);
    const [selectedMenuForBottomSheet, setSelectedMenuForBottomSheet] = useState<Menu>();
    /* 메뉴 클릭시 맛집리스트 바텀 시트 오픈 handler */
    const handleOpenBottomSheet = (menu: Menu) => {
        console.log('handleOpenBottomSheet');
        setIsOpenBottomSheet(true);
        setSelectedMenuForBottomSheet(menu);
    }
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-xl text-foreground mb-1">추천 메뉴</h2>
                <p className="text-sm text-muted-foreground">{selectedCategory === 'all' ? '전체' : selectedCategory} 메뉴를
                    추천했어요.</p>
            </div>
            {/* 메뉴 퀴즈 */}
            <div>퀴즈</div>
            <div className="space-y-4">
                {menus.map((menu) => (
                    <div key={menu.name} className={`transform transition-all duration-500 ease-out`}>
                        <MenuCard menu={menu} onOpenBottomSheet={handleOpenBottomSheet}/>
                    </div>
                ))}
                {/* 스켈레톤 효과 */}
                <div/>
            </div>
            <RestaurantBottomSheet isOpen={isOpenBottomSheet} onClose={() => setIsOpenBottomSheet(false)}
                                   selectedMenu={selectedMenuForBottomSheet!}/>
        </div>
    )
}
