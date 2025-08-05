import React from 'react';
import { Button } from './ui/button';
import { Share2, MessageCircle } from 'lucide-react';

interface KakaoShareButtonProps {
  title: string;
  description: string;
  url?: string;
  imageUrl?: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export function KakaoShareButton({
  title,
  description,
  url = window.location.href,
  imageUrl,
  className = '',
  variant = 'default',
  size = 'md',
  showIcon = true
}: KakaoShareButtonProps) {
  const handleKakaoShare = () => {
    // 실제 카카오톡 공유 API 호출 (현재는 모의 구현)
    const shareData = {
      title,
      description,
      url,
      imageUrl
    };

    // Web Share API 지원 확인
    if (navigator.share) {
      navigator.share({
        title: shareData.title,
        text: shareData.description,
        url: shareData.url
      }).catch(console.error);
    } else {
      // 폴백: 클립보드 복사
      const shareText = `${shareData.title}\n${shareData.description}\n${shareData.url}`;
      navigator.clipboard.writeText(shareText).then(() => {
        alert('링크가 클립보드에 복사되었습니다!');
      }).catch(() => {
        // 폴백의 폴백: prompt로 표시
        prompt('아래 링크를 복사해서 공유하세요:', shareText);
      });
    }
  };

  const sizeClasses = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-4',
    lg: 'h-12 px-6'
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  if (variant === 'default') {
    return (
      <Button
        onClick={handleKakaoShare}
        className={`bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-yellow-900 rounded-xl shadow-sm hover:shadow-md active:shadow-sm transition-all duration-200 active:scale-98 ${sizeClasses[size]} ${className}`}
      >
        {showIcon && <MessageCircle className={`${iconSizes[size]} mr-2`} />}
        카카오톡 공유
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      onClick={handleKakaoShare}
      className={`rounded-xl transition-all duration-200 active:scale-98 ${sizeClasses[size]} ${className}`}
    >
      {showIcon && (
        variant === 'ghost' ? 
          <MessageCircle className={iconSizes[size]} /> : 
          <Share2 className={`${iconSizes[size]} ${variant === 'outline' ? 'mr-2' : ''}`} />
      )}
      {variant === 'outline' && '공유하기'}
    </Button>
  );
}

// 카카오톡 스타일 공유 카드 컴포넌트
interface ShareCardProps {
  title: string;
  description: string;
  roomCode?: string;
  password?: string;
  participants?: number;
  onShare: () => void;
}

export function ShareCard({ title, description, roomCode, password, participants, onShare }: ShareCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="space-y-4">
        <div className="text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <MessageCircle className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-lg text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>

        {(roomCode || password || participants !== undefined) && (
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            {roomCode && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">방 코드</span>
                <span className="text-sm text-gray-900 bg-white px-3 py-1 rounded-lg">{roomCode}</span>
              </div>
            )}
            {password && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">비밀번호</span>
                <span className="text-sm text-gray-900 bg-white px-3 py-1 rounded-lg">{password}</span>
              </div>
            )}
            {participants !== undefined && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">참여자 수</span>
                <span className="text-sm text-blue-600">{participants}명</span>
              </div>
            )}
          </div>
        )}

        <KakaoShareButton
          title={title}
          description={`${description}${roomCode ? `\n방 코드: ${roomCode}` : ''}${password ? `\n비밀번호: ${password}` : ''}`}
          className="w-full"
          size="lg"
        />

        <p className="text-xs text-gray-500 text-center">
          링크를 공유하여 친구들을 초대해보세요!
        </p>
      </div>
    </div>
  );
}