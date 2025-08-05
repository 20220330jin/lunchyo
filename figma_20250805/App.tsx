import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { MainRecommendation } from './components/MainRecommendation';
import { MenuCard } from './components/MenuCard';
import { MenuQuiz } from './components/MenuQuiz';
import { MenuRoulette } from './components/MenuRoulette';
import { MenuVoting } from './components/MenuVoting';
import { RestaurantBottomSheet } from './components/RestaurantBottomSheet';
import { TodayHistory } from './components/TodayHistory';
import { LoadingRecommendation } from './components/LoadingRecommendation';
import { BrandLoadingScreen } from './components/BrandLoadingScreen';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { ArrowLeft, RotateCcw, Sparkles, Vote } from 'lucide-react';
import brandLogo from 'figma:asset/979ae87316c449226e9754c258c8db8a7e457075.png';

export interface Menu {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  distance: string;
  rating: number;
  category: string;
  address: string;
  tags: string[];
  image: string;
}

export type CategoryType = 'all' | '한식' | '양식' | '일식' | '중식' | '아시안' | '분식' | '카페';

export default function App() {
  const [recommendedMenus, setRecommendedMenus] = useState<Menu[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [todaySelections, setTodaySelections] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [showInitialScreen, setShowInitialScreen] = useState(true);
  const [visibleMenus, setVisibleMenus] = useState<number>(0);
  const [showBrandLoading, setShowBrandLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeTab, setActiveTab] = useState('recommend');

  const getAllMenus = (): Menu[] => [
    // 한식
    {
      id: '1',
      name: '김치찌개',
      category: '한식',
      description: '따뜻하고 든든한 국물 요리',
      image: 'https://images.unsplash.com/photo-1582049489210-c9bf2ad81bc1?w=400&h=300&fit=crop',
      tags: ['매운맛', '따뜻한', '든든한']
    },
    {
      id: '2',
      name: '비빔밥',
      category: '한식',
      description: '영양 균형이 잘 잡힌 건강식',
      image: 'https://images.unsplash.com/photo-1562059390-a761a084768e?w=400&h=300&fit=crop',
      tags: ['건강한', '영양만점', '신선한']
    },
    {
      id: '3',
      name: '불고기',
      category: '한식',
      description: '달콤 짭짤한 한국의 대표 요리',
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop',
      tags: ['달콤한', '고기', '인기메뉴']
    },
    // 양식
    {
      id: '4',
      name: '파스타',
      category: '양식',
      description: '가벼우면서도 맛있는 이탈리안',
      image: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop',
      tags: ['가벼운', '맛있는', '양식']
    },
    {
      id: '5',
      name: '리조또',
      category: '양식',
      description: '부드럽고 크리미한 이탈리안 쌀요리',
      image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop',
      tags: ['크리미', '부드러운', '고급스러운']
    },
    {
      id: '6',
      name: '스테이크',
      category: '양식',
      description: '육즙 가득한 프리미엄 스테이크',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
      tags: ['육즙', '프리미엄', '고기']
    },
    // 일식
    {
      id: '7',
      name: '초밥',
      category: '일식',
      description: '신선한 회와 완벽한 샤리의 조화',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
      tags: ['신선한', '고급', '일식']
    },
    {
      id: '8',
      name: '라멘',
      category: '일식',
      description: '진한 국물과 쫄깃한 면의 만남',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
      tags: ['진한맛', '따뜻한', '면요리']
    },
    {
      id: '9',
      name: '돈카츠',
      category: '일식',
      description: '바삭하고 두툼한 일본식 돈까스',
      image: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?w=400&h=300&fit=crop',
      tags: ['바삭한', '두툼한', '튀김']
    },
    // 중식
    {
      id: '10',
      name: '짜장면',
      category: '중식',
      description: '달콤한 춘장 소스의 대표 중식',
      image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&h=300&fit=crop',
      tags: ['달콤한', '면요리', '인기메뉴']
    },
    {
      id: '11',
      name: '탕수육',
      category: '중식',
      description: '바삭한 튀김과 새콤달콤한 소스',
      image: 'https://images.unsplash.com/photo-1559847844-d721426d6edc?w=400&h=300&fit=crop',
      tags: ['바삭한', '새콤달콤', '튀김']
    },
    // 아시안
    {
      id: '12',
      name: '팟타이',
      category: '아시안',
      description: '태국의 대표적인 볶음면 요리',
      image: 'https://images.unsplash.com/photo-1559314809-0f31657def5e?w=400&h=300&fit=crop',
      tags: ['매콤한', '볶음면', '이국적']
    },
    {
      id: '13',
      name: '쌀국수',
      category: '아시안',
      description: '깔끔하고 시원한 베트남 국수',
      image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop',
      tags: ['깔끔한', '시원한', '국수']
    },
    // 분식
    {
      id: '14',
      name: '떡볶이',
      category: '분식',
      description: '매콤달콤한 한국의 대표 간식',
      image: 'https://images.unsplash.com/photo-1598511777073-998b4c24e517?w=400&h=300&fit=crop',
      tags: ['매콤달콤', '분식', '간식']
    },
    {
      id: '15',
      name: '김밥',
      category: '분식',
      description: '간편하고 든든한 한국식 김밥',
      image: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400&h=300&fit=crop',
      tags: ['간편한', '든든한', '분식']
    }
  ];

  const handleMenuRecommendation = async (category: CategoryType = 'all') => {
    setIsLoading(true);
    setShowInitialScreen(false);
    setSelectedCategory(category);
    setVisibleMenus(0);
    setShowQuiz(false);
    
    // Mock API call with longer loading for better UX
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const allMenus = getAllMenus();
    let filteredMenus = allMenus;
    
    if (category !== 'all') {
      filteredMenus = allMenus.filter(menu => menu.category === category);
    }
    
    // 랜덤하게 2-3개 선택
    const shuffled = filteredMenus.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.floor(Math.random() * 2) + 2);
    
    setRecommendedMenus(selected);
    setIsLoading(false);
    
    // 메뉴를 순차적으로 표시하는 애니메이션
    selected.forEach((_, index) => {
      setTimeout(() => {
        setVisibleMenus(prev => prev + 1);
      }, index * 200);
    });

    // 퀴즈 표시 (메뉴 로딩 완료 후 1초 뒤)
    setTimeout(() => {
      setShowQuiz(true);
    }, selected.length * 200 + 1000);
  };

  const handleMenuSelect = (menu: Menu | string) => {
    // 문자열인 경우 (룰렛/투표에서) Menu 객체로 변환
    if (typeof menu === 'string') {
      const foundMenu = getAllMenus().find(m => m.name === menu);
      if (foundMenu) {
        setSelectedMenu(foundMenu);
        setShowRestaurants(true);
        if (!todaySelections.find(m => m.id === foundMenu.id)) {
          setTodaySelections(prev => [...prev, foundMenu]);
        }
      }
      return;
    }

    // Menu 객체인 경우
    setSelectedMenu(menu);
    setShowRestaurants(true);
    if (!todaySelections.find(m => m.id === menu.id)) {
      setTodaySelections(prev => [...prev, menu]);
    }
  };

  // 퀴즈에서 메뉴 선택 시 (오늘의 선택에 추가하지 않음)
  const handleQuizMenuSelect = (menu: Menu) => {
    setSelectedMenu(menu);
    setShowRestaurants(true);
  };

  const handleRecommendAgain = () => {
    setRecommendedMenus([]);
    setSelectedMenu(null);
    setShowRestaurants(false);
    setVisibleMenus(0);
    setShowQuiz(false);
    handleMenuRecommendation(selectedCategory);
  };

  const handleBackToInitial = () => {
    setShowInitialScreen(true);
    setRecommendedMenus([]);
    setSelectedMenu(null);
    setShowRestaurants(false);
    setIsLoading(false);
    setSelectedCategory('all');
    setVisibleMenus(0);
    setShowQuiz(false);
  };

  const handleBrandLoadingComplete = () => {
    setShowBrandLoading(false);
  };

  // 탭 변경 시 초기 상태로 리셋
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab !== 'recommend') {
      setShowInitialScreen(true);
      setRecommendedMenus([]);
      setSelectedMenu(null);
      setShowRestaurants(false);
      setIsLoading(false);
      setSelectedCategory('all');
      setVisibleMenus(0);
      setShowQuiz(false);
    }
  };

  // 브랜드 로딩 화면
  if (showBrandLoading) {
    return <BrandLoadingScreen onComplete={handleBrandLoadingComplete} />;
  }

  // 메뉴 추천 로딩 화면
  if (isLoading) {
    return <LoadingRecommendation category={selectedCategory} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 max-w-md">
        {/* 미니멀 네비게이션 헤더 - 추천 메뉴 페이지에서만 표시 */}
        {!showInitialScreen && activeTab === 'recommend' && (
          <header className="flex items-center justify-between mb-6 pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToInitial}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200 active:scale-95 transition-all duration-150 px-3 py-2 h-10"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>처음으로</span>
            </Button>
            
            <div className="w-8 h-8">
              <img 
                src={brandLogo} 
                alt="LUNCHYO" 
                className="w-full h-full object-contain opacity-80"
              />
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRecommendAgain}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 active:bg-blue-100 active:scale-95 transition-all duration-150 px-3 py-2 h-10"
            >
              <RotateCcw className="w-4 h-4" />
              <span>다시 추천</span>
            </Button>
          </header>
        )}

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
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

          <TabsContent value="recommend" className="space-y-6">
            {showInitialScreen ? (
              <MainRecommendation 
                onRecommend={handleMenuRecommendation}
                isLoading={isLoading}
              />
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl text-gray-900 mb-1">추천 메뉴</h2>
                  <p className="text-sm text-gray-600">
                    {selectedCategory === 'all' ? '전체' : selectedCategory} 메뉴를 추천했어요
                  </p>
                </div>

                {/* 메뉴 퀴즈 */}
                {showQuiz && (
                  <div className={`transform transition-all duration-500 ease-out ${
                    showQuiz ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
                  }`}>
                    <MenuQuiz 
                      onMenuSelect={handleQuizMenuSelect}
                      availableMenus={getAllMenus()}
                    />
                  </div>
                )}
                
                <div className="space-y-4">
                  {recommendedMenus.map((menu, index) => (
                    <div
                      key={menu.id}
                      className={`transform transition-all duration-500 ease-out ${
                        index < visibleMenus
                          ? 'translate-y-0 opacity-100 scale-100'
                          : 'translate-y-8 opacity-0 scale-95'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <MenuCard
                        menu={menu}
                        onSelect={() => handleMenuSelect(menu)}
                      />
                    </div>
                  ))}
                  
                  {/* 로딩 스켈레톤 효과 */}
                  {visibleMenus < recommendedMenus.length && (
                    <div className="animate-pulse">
                      <div className="bg-white rounded-2xl border-0 shadow-sm overflow-hidden">
                        <div className="h-48 bg-gray-200"></div>
                        <div className="p-5 space-y-3">
                          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                          <div className="flex gap-2">
                            <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                            <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="roulette">
            <MenuRoulette 
              availableMenus={getAllMenus()}
              onMenuSelect={handleMenuSelect}
            />
          </TabsContent>

          <TabsContent value="voting">
            <MenuVoting 
              availableMenus={getAllMenus()}
              onMenuSelect={handleMenuSelect}
            />
          </TabsContent>

          <TabsContent value="history">
            <TodayHistory selections={todaySelections} />
          </TabsContent>
        </Tabs>

        <RestaurantBottomSheet
          isOpen={showRestaurants}
          onClose={() => setShowRestaurants(false)}
          selectedMenu={selectedMenu}
        />
      </div>
    </div>
  );
}