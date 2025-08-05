import React, { useState, useEffect } from 'react';
import { CategoryType } from '../App';
import brandLogo from 'figma:asset/979ae87316c449226e9754c258c8db8a7e457075.png';

interface LoadingRecommendationProps {
  category: CategoryType;
}

export function LoadingRecommendation({ category }: LoadingRecommendationProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const getCategoryName = (cat: CategoryType): string => {
    return cat === 'all' ? '다양한' : cat;
  };

  const loadingMessages = [
    `맛있는 ${getCategoryName(category)} 메뉴를 찾고 있어요`,
    '주변 맛집 정보도 함께 준비중이에요',
    '곧 완성돼요, 조금만 기다려주세요',
    '최고의 메뉴를 선별하고 있어요'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 800);

    return () => clearInterval(interval);
  }, [loadingMessages.length]);

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      {/* 상단 로딩 영역 */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-6">
          {/* 로고 애니메이션 - BrandLoadingScreen과 동일 */}
          <div className="relative">
            <div className="w-32 h-32 animate-pulse">
              <img 
                src={brandLogo} 
                alt="LUNCHYO" 
                className="w-full h-full object-contain animate-bounce"
                style={{ animationDuration: '2s' }}
              />
            </div>
            
            {/* 로딩 링 애니메이션 */}
            <div className="absolute inset-0 w-32 h-32 border-4 border-transparent border-t-blue-500 rounded-full animate-spin opacity-30"></div>
            <div className="absolute -inset-2 w-36 h-36 border-2 border-transparent border-t-blue-300 rounded-full animate-spin opacity-20" style={{ animationDuration: '3s' }}></div>
          </div>

          {/* 브랜드명 */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl text-gray-900 tracking-wide animate-fade-in">
              LUNCHYO
            </h1>
            <div className="w-16 h-0.5 bg-blue-500 mx-auto animate-expand"></div>
          </div>

          {/* 로딩 도트들 */}
          <div className="flex space-x-2 mt-8">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ 
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '1.2s'
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 메시지 영역 */}
      <div className="pb-16 px-6 text-center">
        <div className="space-y-3">
          <h3 className="text-lg text-gray-900 transition-all duration-500 ease-in-out">
            {loadingMessages[currentMessageIndex]}
          </h3>
          <p className="text-sm text-gray-500">
            AI가 당신을 위한 완벽한 메뉴를 찾고 있어요
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes expand {
          from { width: 0; }
          to { width: 4rem; }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out 0.5s both;
        }
        
        .animate-expand {
          animation: expand 0.8s ease-out 1s both;
        }
      `}</style>
    </div>
  );
}