import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Share2, MapPin, Heart, Users, TrendingUp } from 'lucide-react';
import { Menu } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MenuCardProps {
  menu: Menu;
  onSelect: () => void;
}

export function MenuCard({ menu, onSelect }: MenuCardProps) {
  const [selectionCount, setSelectionCount] = useState(0);
  const [isCountAnimating, setIsCountAnimating] = useState(false);

  // Mock 실시간 집계 데이터 생성
  useEffect(() => {
    // 메뉴별 기본 선택 수 (실제로는 API에서 가져올 데이터)
    const baseCount = Math.floor(Math.random() * 50) + 5; // 5-55 사이 랜덤
    setSelectionCount(baseCount);

    // 실시간 업데이트 시뮬레이션 (실제로는 웹소켓 등으로 구현)
    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% 확률로 숫자 증가
        setSelectionCount(prev => {
          setIsCountAnimating(true);
          setTimeout(() => setIsCountAnimating(false), 600);
          return prev + 1;
        });
      }
    }, 5000); // 5초마다 체크

    return () => clearInterval(interval);
  }, [menu.id]);

  // 인기도에 따른 배지 색상 결정
  const getPopularityBadge = (count: number) => {
    if (count > 40) {
      return { icon: '🔥', text: '인기', color: 'bg-red-100 text-red-700 border-red-200' };
    } else if (count > 25) {
      return { icon: '⭐', text: '추천', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
    } else if (count > 15) {
      return { icon: '👍', text: '좋음', color: 'bg-green-100 text-green-700 border-green-200' };
    }
    return null;
  };

  const popularityBadge = getPopularityBadge(selectionCount);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const shareData = {
      title: `오늘 점심은 ${menu.name}!`,
      text: `${menu.description} - 오늘 ${selectionCount}명이 선택했어요`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(`${shareData.title} - ${shareData.text}`);
      alert('클립보드에 복사되었습니다!');
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert('찜하기 기능이 곧 추가될 예정이에요!');
  };

  const handleCardSelect = () => {
    // 카드 선택 시 집계 수 증가
    setSelectionCount(prev => prev + 1);
    setIsCountAnimating(true);
    setTimeout(() => setIsCountAnimating(false), 600);
    onSelect();
  };

  return (
    <Card 
      className="group overflow-hidden cursor-pointer transition-all duration-300 ease-out border-0 bg-white hover:shadow-xl hover:-translate-y-1 shadow-sm active:scale-98"
      onClick={handleCardSelect}
    >
      <CardContent className="p-0">
        <div className="relative">
          {/* 이미지 영역 */}
          <div className="relative w-full h-48 overflow-hidden">
            <ImageWithFallback
              src={menu.image}
              alt={menu.name}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
            
            {/* 카테고리 배지 */}
            <Badge 
              className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-gray-700 border-0 shadow-sm transition-all duration-300 group-hover:bg-white group-hover:shadow-md"
            >
              {menu.category}
            </Badge>

            {/* 인기도 배지 */}
            {popularityBadge && (
              <Badge 
                className={`absolute top-4 left-20 ${popularityBadge.color} backdrop-blur-sm border shadow-sm transition-all duration-300 group-hover:shadow-md`}
              >
                <span className="mr-1">{popularityBadge.icon}</span>
                {popularityBadge.text}
              </Badge>
            )}
            
            {/* 실시간 선택 집계 */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm transition-all duration-300 group-hover:bg-white group-hover:shadow-md">
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                <span className={`text-sm text-gray-700 transition-all duration-300 ${
                  isCountAnimating ? 'scale-125 text-blue-600' : ''
                }`}>
                  {selectionCount}
                </span>
                {isCountAnimating && (
                  <TrendingUp className="w-3.5 h-3.5 text-green-500 animate-bounce" />
                )}
              </div>
            </div>
            
            {/* 액션 버튼들 */}
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFavorite}
                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-red-500 p-0 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
                aria-label="찜하기"
              >
                <Heart className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-blue-600 p-0 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95"
                aria-label="공유하기"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* 컨텐츠 영역 */}
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h3 className="text-xl text-gray-900 group-hover:text-blue-600 transition-colors duration-200 flex-1 pr-2">
                  {menu.name}
                </h3>
                <div className="text-xs text-gray-500 text-right flex-shrink-0">
                  <div>오늘</div>
                  <div className={`transition-all duration-300 ${
                    isCountAnimating ? 'text-blue-600 scale-110' : ''
                  }`}>
                    {selectionCount}명 선택
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {menu.description}
              </p>
            </div>
            
            {/* 태그 영역 */}
            <div className="flex flex-wrap gap-2">
              {menu.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-blue-100"
                >
                  #{tag}
                </span>
              ))}
            </div>
            
            {/* 액션 버튼 */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-blue-600 transition-colors duration-200">
                <MapPin className="w-4 h-4" />
                <span>주변 맛집 보기</span>
              </div>
              
              <div className="w-12 h-12 rounded-full bg-blue-600 group-hover:bg-blue-700 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200 group-hover:scale-105 active:scale-95">
                <span className="text-white text-lg transform group-hover:translate-x-0.5 transition-transform duration-200">→</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}