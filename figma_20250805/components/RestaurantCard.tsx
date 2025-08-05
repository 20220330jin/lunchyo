import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Share2, Star, Navigation, Clock, Phone } from 'lucide-react';
import { Restaurant } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const shareData = {
      title: `${restaurant.name} 추천!`,
      text: `${restaurant.address} - 평점 ${restaurant.rating}⭐`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(`${shareData.title} - ${shareData.text}`);
      alert('클립보드에 복사되었습니다!');
    }
  };

  const handleNavigate = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert('지도 앱으로 연결됩니다');
  };

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert('전화 기능이 곧 추가될 예정이에요!');
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 border-0 bg-white group active:scale-98">
      <CardContent className="p-0">
        <div className="flex h-32">
          {/* 이미지 영역 */}
          <div className="w-32 h-32 flex-shrink-0 relative overflow-hidden">
            <ImageWithFallback
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          {/* 정보 영역 */}
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h3 className="text-base text-gray-900 leading-tight pr-2 group-hover:text-blue-600 transition-colors duration-200">
                  {restaurant.name}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="p-1.5 h-7 w-7 text-gray-400 hover:text-blue-600 hover:bg-blue-50 flex-shrink-0 transition-all duration-200 active:scale-90"
                  aria-label="공유하기"
                >
                  <Share2 className="w-3 h-3" />
                </Button>
              </div>
              
              {/* 평점 및 거리 */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-700">{restaurant.rating}</span>
                </div>
                <Badge variant="outline" className="text-xs px-1.5 py-0.5 border-blue-200 text-blue-700">
                  {restaurant.distance}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>5-10분</span>
                </div>
              </div>
              
              {/* 주소 */}
              <p className="text-xs text-gray-500 leading-tight">{restaurant.address}</p>
            </div>
            
            {/* 하단 액션 영역 */}
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {restaurant.tags.slice(0, 2).map((tag, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCall}
                  className="p-1.5 h-8 w-8 text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 active:scale-90"
                  aria-label="전화하기"
                >
                  <Phone className="w-3.5 h-3.5" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNavigate}
                  className="p-1.5 h-8 w-8 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 active:scale-90"
                  aria-label="길찾기"
                >
                  <Navigation className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}