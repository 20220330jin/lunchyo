'use client'
import {Utensils} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {CategoryType} from "@/modules/home/types";
import {useState} from "react";
import {UI_CATEGORIES} from "@/constants/category";
import {useMenuRecommendationMutation} from "@/modules/home/queries/use-menu-recommendation-mutation";

/**
 * 메뉴 추천 페이지
 *
 * @author hjkim
 * @constructor
 */
export const MainRecommendation = () => {
    /**
     * Hooks
     */
    /* react query */
    const {mutate, data, isPending, isError, error} = useMenuRecommendationMutation()

    /**
     * Variables
     */
    /* 카테고리 정보 */
    const categories = UI_CATEGORIES;

    /**
     * States
     */
    /* 카테고리 선택 제어 state */
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');

    /**
     * APIs
     */


    /**
     * Handlers
     */
    /* 추천받기 버튼 handler */
    const handleRecommend = () => {
        console.log('handleRecommend');
        mutate({category: selectedCategory})
    }
    return (
        <div className="space-y-8 pt-8">
            <div className="text-center space-y-6">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Utensils className="w-12 h-12 text-blue-600"/>
                </div>
                <div className="space-y-3">
                    <h2 className="text-2xl text-gray-900">오늘 점심 메뉴를</h2>
                    <h2 className="text-2xl text-gray-900">추천 받아보세요!!</h2>
                    <p className="text-gray-600 mt-4">원하는 음식 종류를 선택해주세요.</p>
                </div>
            </div>
            <Card className="bg-white border-0 shadow-sm">
                <CardContent className="p-6">
                    <h3 className="text-base text-gray-900 mb-4">음식 종류</h3>
                    <div className="grid grid-cols-4 gap-3">
                        {categories.map((category) => (
                            <button key={category.id} onClick={() => setSelectedCategory(category.id)}
                                    className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 min-h-[72px] active:scale-95 ${selectedCategory === category.id ? 'bg-blue-50 border-2 border-blue-200 shadow-sm scale-105' : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100 hover:scale-102'}`}>
                                <span className="text-2xl">{category.emoji}</span>
                                <span
                                    className={`text-xs ${selectedCategory === category.id ? 'text-blue-700' : 'text-gray-600'}`}>{category.name}</span>
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <Button
                onClick={handleRecommend}
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl shadow-lg hover:shadow-xl active:shadow-md transition-all duration-200 active:scale-98 text-base">
                <Utensils/>
                추천받기
            </Button>
        </div>
    )
}
