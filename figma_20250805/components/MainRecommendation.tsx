import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Utensils } from 'lucide-react';
import { CategoryType } from '../App';

interface MainRecommendationProps {
  onRecommend: (category?: CategoryType) => void;
  isLoading: boolean;
}

export function MainRecommendation({ onRecommend, isLoading }: MainRecommendationProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');

  const categories = [
    { id: 'all' as CategoryType, name: '전체', emoji: '🍽️' },
    { id: '한식' as CategoryType, name: '한식', emoji: '🇰🇷' },
    { id: '양식' as CategoryType, name: '양식', emoji: '🍝' },
    { id: '일식' as CategoryType, name: '일식', emoji: '🍣' },
    { id: '중식' as CategoryType, name: '중식', emoji: '🥢' },
    { id: '아시안' as CategoryType, name: '아시안', emoji: '🍜' },
    { id: '분식' as CategoryType, name: '분식', emoji: '🍢' },
    { id: '카페' as CategoryType, name: '카페', emoji: '☕' }
  ];

  const handleRecommend = () => {
    onRecommend(selectedCategory);
  };

  return (
    <div className="space-y-8 pt-8">
      <div className="text-center space-y-6">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
          <Utensils className="w-12 h-12 text-blue-600" />
        </div>
        
        <div className="space-y-3">
          <h2 className="text-2xl text-gray-900">
            오늘 점심 메뉴를
          </h2>
          <h2 className="text-2xl text-gray-900">
            추천받아보세요!
          </h2>
          <p className="text-gray-600 mt-4">
            원하는 음식 종류를 선택해주세요
          </p>
        </div>
      </div>

      <Card className="bg-white border-0 shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-base text-gray-900 mb-4">음식 종류</h3>
          <div className="grid grid-cols-4 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 min-h-[72px] active:scale-95
                  ${selectedCategory === category.id
                    ? 'bg-blue-50 border-2 border-blue-200 shadow-sm scale-105'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100 hover:scale-102'
                  }
                `}
              >
                <span className="text-2xl">{category.emoji}</span>
                <span className={`text-xs ${
                  selectedCategory === category.id ? 'text-blue-700' : 'text-gray-600'
                }`}>
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={handleRecommend}
        disabled={isLoading}
        className="w-full h-14 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl shadow-lg hover:shadow-xl active:shadow-md transition-all duration-200 active:scale-98 text-base"
      >
        <Utensils className="w-5 h-5 mr-2" />
        {selectedCategory === 'all' ? '추천받기' : `${selectedCategory} 추천받기`}
      </Button>
    </div>
  );
}