import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { RestaurantCard } from './RestaurantCard';
import { Menu, Restaurant } from '../App';
import { MapPin, Filter, Star, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface RestaurantBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMenu: Menu | null;
}

export function RestaurantBottomSheet({ isOpen, onClose, selectedMenu }: RestaurantBottomSheetProps) {
  const [selectedFilter, setSelectedFilter] = useState<'distance' | 'rating' | 'popular'>('distance');
  
  // Mock restaurant data
  const mockRestaurants: Restaurant[] = [
    {
      id: '1',
      name: '맛있는 김치찌개 전문점',
      distance: '120m',
      rating: 4.5,
      category: '한식',
      address: '서울시 강남구 테헤란로 123',
      tags: ['맛있는', '양많은', '친절한'],
      image: 'https://images.unsplash.com/photo-1582049489210-c9bf2ad81bc1?w=400&h=300&fit=crop'
    },
    {
      id: '2',
      name: '할머니 손맛 김치찌개',
      distance: '250m',
      rating: 4.3,
      category: '한식',
      address: '서울시 강남구 역삼동 456',
      tags: ['전통맛', '푸짐한', '깔끔한'],
      image: 'https://images.unsplash.com/photo-1582049489210-c9bf2ad81bc1?w=400&h=300&fit=crop'
    },
    {
      id: '3',
      name: '오늘의 김치찌개',
      distance: '380m',
      rating: 4.7,
      category: '한식',
      address: '서울시 강남구 삼성동 789',
      tags: ['신선한', '빠른배달', '인기맛집'],
      image: 'https://images.unsplash.com/photo-1582049489210-c9bf2ad81bc1?w=400&h=300&fit=crop'
    },
    {
      id: '4',
      name: '맛집 김치찌개 본점',
      distance: '450m',
      rating: 4.4,
      category: '한식',
      address: '서울시 강남구 논현동 321',
      tags: ['본점', '오래된맛집', '단골추천'],
      image: 'https://images.unsplash.com/photo-1582049489210-c9bf2ad81bc1?w=400&h=300&fit=crop'
    },
    {
      id: '5',
      name: '우리집 김치찌개',
      distance: '520m',
      rating: 4.2,
      category: '한식',
      address: '서울시 강남구 신사동 654',
      tags: ['가정식', '따뜻한', '저렴한'],
      image: 'https://images.unsplash.com/photo-1582049489210-c9bf2ad81bc1?w=400&h=300&fit=crop'
    }
  ];

  const filterOptions = [
    { id: 'distance', name: '거리순', icon: MapPin },
    { id: 'rating', name: '평점순', icon: Star },
    { id: 'popular', name: '인기순', icon: SlidersHorizontal }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl border-t-0 bg-gray-50 p-0">
        {/* 핸들 바 */}
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-6"></div>
        
        <div className="px-6 pb-6 h-full flex flex-col">
          {/* 헤더 */}
          <div className="mb-6">
            <SheetTitle className="flex items-center gap-2 text-xl mb-2">
              <span className="text-2xl">{selectedMenu?.category === '한식' ? '🇰🇷' : '🍽️'}</span>
              {selectedMenu?.name} 맛집
            </SheetTitle>
            <p className="text-sm text-gray-600 mb-4">
              가까운 순으로 총 {mockRestaurants.length}곳을 찾았어요
            </p>
            
            {/* 필터 버튼들 */}
            <div className="flex gap-2">
              {filterOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <Button
                    key={option.id}
                    variant={selectedFilter === option.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(option.id as any)}
                    className={`flex items-center gap-1.5 h-9 px-3 transition-all duration-200 active:scale-95 ${
                      selectedFilter === option.id
                        ? 'bg-blue-600 text-white shadow-sm scale-105'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700'
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span className="text-xs">{option.name}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* 통계 카드 */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white rounded-xl p-3 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="text-lg text-blue-600 mb-1">4.4</div>
              <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                평균 평점
              </div>
            </div>
            <div className="bg-white rounded-xl p-3 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="text-lg text-blue-600 mb-1">320m</div>
              <div className="text-xs text-gray-600">평균 거리</div>
            </div>
            <div className="bg-white rounded-xl p-3 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="text-lg text-blue-600 mb-1">8분</div>
              <div className="text-xs text-gray-600">평균 이동시간</div>
            </div>
          </div>
          
          {/* 맛집 리스트 */}
          <div className="flex-1 space-y-3 overflow-y-auto">
            {mockRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
              />
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}