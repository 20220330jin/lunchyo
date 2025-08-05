import React, { useEffect, useState } from 'react';
import brandLogo from 'figma:asset/979ae87316c449226e9754c258c8db8a7e457075.png';

interface BrandLoadingScreenProps {
  onComplete: () => void;
}

export function BrandLoadingScreen({ onComplete }: BrandLoadingScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        onComplete();
      }, 500); // fade out 완료 후 onComplete 호출
    }, 1800); // 1.8초 후 fade out 시작

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 bg-white z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${
      fadeOut ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* 로고 애니메이션 */}
      <div className="flex flex-col items-center space-y-6">
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