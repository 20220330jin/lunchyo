"use client";
import { Button } from "@/shared/ui/button";
import { Utensils } from "lucide-react";
import { Card, CardContent } from "@/shared/ui/card";
import { useState } from "react";
import { CategoryType } from "@/shared/types";

interface RecommendationFormProps {
  onRecommend: (category: CategoryType) => void;
}

/**
 * 메인 화면 메뉴 추천받기 폼 컴포넌트
 *
 * @description
 * 카테고리 선택 영역과 추천받기 버튼으로 구성
 *
 * @author hjkim
 * @constructor
 */
export const RecommendationForm = ({
  onRecommend,
}: RecommendationFormProps) => {
  const categories: { id: CategoryType; name: string; emoji: string }[] = [
    { id: "all", name: "전체", emoji: "🍽️" },
    { id: "한식", name: "한식", emoji: "🇰🇷" },
    { id: "양식", name: "양식", emoji: "🍝" },
    { id: "일식", name: "일식", emoji: "🍣" },
    { id: "중식", name: "중식", emoji: "🥢" },
    { id: "아시안", name: "아시안", emoji: "🍜" },
    { id: "분식", name: "분식", emoji: "🍢" },
    { id: "카페", name: "카페", emoji: "☕" },
  ];
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const handleRecommend = () => {
    onRecommend(selectedCategory);
  };
  return (
    <>
      {/* 카테고리 선택 영역 */}
      <Card className="bg-white border-0 shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-base text-gray-900 mb-4">음식 종류</h3>
          <div className="grid grid-cols-4 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 min-h-[72px] active:scale-95 ${selectedCategory === category.id ? "bg-blue-50 border-2 border-blue-200 shadow-sm scale-105" : "bg-gray-50 border-2 border-transparent hover:bg-gray-100 hover:scale-102"}`}
              >
                <span className="text-2xl">{category.emoji}</span>
                <span
                  className={`text-xs ${selectedCategory === category.id ? "text-blue-700" : "text-gray-600"}`}
                >
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
      {/* 추천받기 버튼 영역 */}
      <Button
        type="button"
        onClick={handleRecommend}
        className="w-full h-14 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl shadow-xl active:shadow-md transition-all duration-200 active:scale-98 text-base"
      >
        <Utensils className="w-5 h-5 mr-2" />
        {selectedCategory === "all"
          ? "추천받기"
          : `${categories.find((category) => category.id === selectedCategory)?.name} 추천받기`}
      </Button>
    </>
  );
};
