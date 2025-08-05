"use client";
import { Sparkles, Utensils, Vote } from "lucide-react";
import { RecommendationForm } from "@/features/recommend-menu/ui/RecommendationForm";
import { useState } from "react";
import { CategoryType, Menu } from "@/shared/types";
import { MenuCard } from "@/entities/menu/ui/MenuCard";
import { Button } from "@/shared/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useCategories } from "@/features/category";

/**
 * HomePage
 * - 메인 페이지
 *
 * @description
 * 사용자가 보게 될 가장 첫 화면
 * 상단 탭에서 기능에 따라 페이지 전환
 *
 * @author hjkim
 * @constructor
 */
// TODO (20250804/x) (확인필요) function vs const -> hoisting 문제로 인해 function으로 작성 - hjkim
export default function HomePage() {
  // TEMP 추천 폼 or 추천 메뉴 제어
  const [showRecommendationForm, setShowRecommendationForm] = useState(true);
  const [recommendedMenus, setRecommendedMenus] = useState<Menu[]>([]);
  const [activeTab, setActiveTab] = useState("recommend");
  /**
   * Hooks
   *
   */
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError,
    error,
  } = useCategories();
  const handleMenuRecommendation = (selectedCategory: CategoryType) => {
    // 실제 API 호출 대신 임시 데이터 생성 -> 추후 API 만들면 삭제.
    const dummyMenus: Menu[] = [
      {
        menuId: "1",
        menuName: "김치찌개",
        menuCategory: "한식",
        menuDescription: "얼큰하고 맛있는 김치찌개입니다.",
      },
      {
        menuId: "2",
        menuName: "파스타",
        menuCategory: "양식",
        menuDescription: "크림 소스가 일품인 파스타입니다.",
      },
      {
        menuId: "3",
        menuName: "초밥",
        menuCategory: "일식",
        menuDescription: "신선한 재료로 만든 초밥 세트입니다.",
      },
    ];
    // 선택된 카테고리에 따라 필터링 (임시)
    const filtered =
      selectedCategory === "전체"
        ? dummyMenus
        : dummyMenus.filter((menu) => menu.menuCategory === selectedCategory);

    setRecommendedMenus(filtered);
    setShowRecommendationForm(false); // 추천 메뉴 목록을 보여주도록 상태 변경
  };
  const handleBackToInitial = () => {
    setShowRecommendationForm(false);
    setRecommendedMenus([]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        {/* 탭 영역 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-white h-12">
            <TabsTrigger
              value="recommend"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white hover:bg-blue-50 active:scale-95 transition-all duration-150 h-10 text-xs"
            >
              추천받기
            </TabsTrigger>
            <TabsTrigger
              value="roulette"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white hover:bg-purple-50 active:scale-95 transition-all duration-150 h-10 text-xs"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              룰렛
            </TabsTrigger>
            <TabsTrigger
              value="voting"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white hover:bg-green-50 active:scale-95 transition-all duration-150 h-10 text-xs"
            >
              <Vote className="w-3 h-3 mr-1" />
              투표
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white hover:bg-blue-50 active:scale-95 transition-all duration-150 h-10 text-xs"
            >
              기록
            </TabsTrigger>
          </TabsList>
          {/* 추천받기 탭 영역 */}
          <TabsContent value="recommend" className="space-y-6">
            {showRecommendationForm ? (
              <RecommendationForm
                onRecommend={handleMenuRecommendation}
                categories={categories || []}
              />
            ) : (
              <div className="space-y-4 text-center">
                <h2 className="text-xl text-gray-900 mb-1">추천 메뉴</h2>
                <p className="text-sm text-gray-600">
                  선택된 카테고리에 따라 메뉴를 추천했어요!
                </p>
                {recommendedMenus.map((menu) => (
                  <MenuCard key={menu.menuId} menu={menu} />
                ))}
                <Button
                  onClick={handleBackToInitial}
                  className="w-full h-12 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl shadow-sm"
                >
                  다시 추천받기
                </Button>
              </div>
            )}
          </TabsContent>
          {/* 룰렛 탭 영역 */}
          <TabsContent value="roulette">
            <p className="text-center text-gray-500">
              룰렛 기능은 준비중입니다.
            </p>
          </TabsContent>
          {/* 투표 탭 영역 */}
          <TabsContent value="voting">
            <p className="text-center text-gray-500">
              투표 기능은 준비중입니다.
            </p>
          </TabsContent>
          {/* 기록 탭 영역 */}
          <TabsContent value="history">
            <p className="text-center text-gray-500">
              기록 기능은 준비중입니다.
            </p>
          </TabsContent>
        </Tabs>
        {/* 상단 아이콘 및 헤드라인 */}
        <div className="text-center space-y-6">
          {/* 아이콘 영역 */}
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Utensils className="w-12 h-12 text-blue-600" />
          </div>
          {/* 헤드라인 영역 */}
          <div className="space-y-3">
            <h2 className="text-2xl text-gray-900">오늘 점심 메뉴를</h2>
            <h2 className="text-2xl text-gray-900">추천 받아보세요!!</h2>
            <p className="text-gray-600 pt-1">
              원하는 음식 종류를 선택해주세요.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
