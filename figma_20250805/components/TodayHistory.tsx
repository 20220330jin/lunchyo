import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, Calendar } from 'lucide-react';
import { Menu } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TodayHistoryProps {
  selections: Menu[];
}

export function TodayHistory({ selections }: TodayHistoryProps) {
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  if (selections.length === 0) {
    return (
      <Card className="border-gray-200">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 mb-2">아직 선택한 메뉴가 없어요</h3>
          <p className="text-gray-600 text-center">
            메뉴를 추천받고 선택하면<br />
            여기에 기록이 남아요
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="w-5 h-5 text-blue-600" />
            오늘의 선택
          </CardTitle>
          <p className="text-sm text-gray-600">{today}</p>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {selections.map((menu, index) => (
            <div key={menu.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 flex-shrink-0">
                <ImageWithFallback
                  src={menu.image}
                  alt={menu.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-gray-900">{menu.name}</h4>
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                    {menu.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{menu.description}</p>
              </div>
              
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{index === 0 ? '방금' : `${index * 30}분 전`}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <div className="bg-blue-50 rounded-lg p-4 text-center">
        <p className="text-blue-700 text-sm">
          💡 다양한 메뉴를 시도해보세요!<br />
          매일 새로운 맛을 발견할 수 있어요
        </p>
      </div>
    </div>
  );
}