import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { MenuSelector } from './MenuSelector';
import { KakaoShareButton, ShareCard } from './KakaoShareButton';
import { PasswordModal } from './PasswordModal';
import { Badge } from './ui/badge';
import { Play, RotateCcw, Users, Link, Settings, Trophy, Sparkles } from 'lucide-react';
import { Menu } from '../App';

interface RouletteRoom {
  id: string;
  menus: string[];
  password: string;
  createdAt: Date;
  participants: string[];
  lastResult?: string;
}

interface MenuRouletteProps {
  availableMenus: Menu[];
  onMenuSelect?: (menu: string) => void;
}

export function MenuRoulette({ availableMenus, onMenuSelect }: MenuRouletteProps) {
  const [selectedMenus, setSelectedMenus] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<RouletteRoom | null>(null);
  const [showShareCard, setShowShareCard] = useState(false);
  const [mode, setMode] = useState<'create' | 'room'>('create');
  const [nickname, setNickname] = useState('');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // 룰렛 생성
  const createRoom = async () => {
    if (selectedMenus.length < 2) return;

    const room: RouletteRoom = {
      id: Math.random().toString(36).substr(2, 6).toUpperCase(),
      menus: selectedMenus,
      password: '1234', // 실제로는 사용자가 설정
      createdAt: new Date(),
      participants: ['나']
    };

    setCurrentRoom(room);
    setMode('room');
    setShowShareCard(true);
  };

  // 룰렛 참여
  const joinRoom = () => {
    setShowPasswordModal(true);
  };

  const handleJoinSuccess = (joinNickname?: string) => {
    if (joinNickname) {
      setNickname(joinNickname);
    }
    
    // Mock room data
    const mockRoom: RouletteRoom = {
      id: 'MOCK1',
      menus: ['김치찌개', '파스타', '초밥', '떡볶이', '불고기'],
      password: '1234',
      createdAt: new Date(),
      participants: ['방장', joinNickname || '게스트'],
      lastResult: undefined
    };

    setCurrentRoom(mockRoom);
    setSelectedMenus(mockRoom.menus);
    setMode('room');
  };

  // 룰렛 그리기
  const drawRoulette = () => {
    const canvas = canvasRef.current;
    if (!canvas || selectedMenus.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    const anglePerSlice = (2 * Math.PI) / selectedMenus.length;

    // 배경 그리기
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 룰렛 섹션들 그리기
    selectedMenus.forEach((menu, index) => {
      const startAngle = index * anglePerSlice + rotation;
      const endAngle = (index + 1) * anglePerSlice + rotation;

      // 섹션 색상 (파스텔 톤)
      const colors = [
        '#FFE5E5', '#E5F3FF', '#E5FFE5', '#FFF5E5', '#F5E5FF',
        '#E5FFFF', '#FFE5F5', '#F0FFE5', '#FFE5CC', '#E5E5FF'
      ];
      const color = colors[index % colors.length];

      // 섹션 그리기
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3;
      ctx.stroke();

      // 텍스트 그리기
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + anglePerSlice / 2);
      ctx.textAlign = 'center';
      ctx.fillStyle = '#374151';
      ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText(menu, radius * 0.7, 5);
      ctx.restore();
    });

    // 중앙 원 그리기
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    ctx.fillStyle = '#3B82F6';
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 4;
    ctx.stroke();

    // 포인터 그리기
    ctx.beginPath();
    ctx.moveTo(centerX, 20);
    ctx.lineTo(centerX - 15, 50);
    ctx.lineTo(centerX + 15, 50);
    ctx.closePath();
    ctx.fillStyle = '#EF4444';
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  // 룰렛 돌리기
  const spinRoulette = () => {
    if (isSpinning || selectedMenus.length < 2) return;

    setIsSpinning(true);
    setResult(null);

    const spins = 5 + Math.random() * 5; // 5-10바퀴
    const finalRotation = rotation + spins * 2 * Math.PI + Math.random() * 2 * Math.PI;
    const duration = 3000 + Math.random() * 2000; // 3-5초
    
    const startTime = Date.now();
    const startRotation = rotation;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOut 효과
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentRotation = startRotation + (finalRotation - startRotation) * easeProgress;
      
      setRotation(currentRotation);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // 결과 계산
        const normalizedRotation = (currentRotation % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
        const pointerAngle = (2 * Math.PI - normalizedRotation + Math.PI / 2) % (2 * Math.PI);
        const sliceAngle = (2 * Math.PI) / selectedMenus.length;
        const resultIndex = Math.floor(pointerAngle / sliceAngle);
        const selectedMenu = selectedMenus[resultIndex];
        
        setResult(selectedMenu);
        setIsSpinning(false);
        
        if (currentRoom) {
          setCurrentRoom({
            ...currentRoom,
            lastResult: selectedMenu
          });
        }

        if (onMenuSelect) {
          onMenuSelect(selectedMenu);
        }
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  // 다시 돌리기
  const resetRoulette = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setIsSpinning(false);
    setResult(null);
    setRotation(0);
  };

  useEffect(() => {
    drawRoulette();
  }, [selectedMenus, rotation]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  if (mode === 'create') {
    return (
      <div className="space-y-6">
        {/* 기능 선택 */}
        <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50 shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-xl text-gray-900 mb-2">메뉴 룰렛</h2>
            <p className="text-sm text-gray-600 mb-6">
              친구들과 함께 랜덤으로 메뉴를 선택해보세요!
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => setMode('create')}
                className="h-12 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-98"
              >
                <Settings className="w-4 h-4 mr-2" />
                룰렛 만들기
              </Button>
              
              <Button
                onClick={joinRoom}
                variant="outline"
                className="h-12 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 active:bg-purple-100 rounded-xl transition-all duration-200 active:scale-98"
              >
                <Link className="w-4 h-4 mr-2" />
                룰렛 참여
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 메뉴 선택 */}
        <MenuSelector
          selectedMenus={selectedMenus}
          onMenusChange={setSelectedMenus}
          availableMenus={availableMenus}
          maxMenus={8}
          minMenus={2}
          title="룰렛 메뉴 설정"
          description="룰렛에 포함할 메뉴들을 선택하세요"
        />

        {/* 룰렛 생성 버튼 */}
        {selectedMenus.length >= 2 && (
          <Button
            onClick={createRoom}
            className="w-full h-12 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-98"
          >
            <Play className="w-4 h-4 mr-2" />
            룰렛 만들기
          </Button>
        )}

        {/* 공유 카드 */}
        {showShareCard && currentRoom && (
          <ShareCard
            title="메뉴 룰렛이 생성되었어요!"
            description="친구들을 초대해서 함께 메뉴를 정해보세요"
            roomCode={currentRoom.id}
            password={currentRoom.password}
            participants={currentRoom.participants.length}
            onShare={() => {}}
          />
        )}

        <PasswordModal
          isOpen={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
          onSuccess={handleJoinSuccess}
          title="룰렛 참여"
          description="룰렛방의 비밀번호를 입력해주세요"
          requireNickname={true}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 룸 정보 */}
      {currentRoom && (
        <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-purple-100 text-purple-700">방 코드: {currentRoom.id}</Badge>
                  <Badge variant="outline" className="border-purple-200 text-purple-700">
                    <Users className="w-3 h-3 mr-1" />
                    {currentRoom.participants.length}명
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  {currentRoom.participants.join(', ')}
                </p>
              </div>
              
              <KakaoShareButton
                title="메뉴 룰렛 참여하기"
                description={`${currentRoom.menus.join(', ')} 중에서 선택해요!`}
                variant="ghost"
                size="sm"
                showIcon={true}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* 룰렛 */}
      <Card className="border-0 bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="text-center space-y-6">
            <div>
              <h3 className="text-lg text-gray-900 mb-1">메뉴 룰렛</h3>
              <p className="text-sm text-gray-600">
                {selectedMenus.length}개 메뉴 중 랜덤 선택
              </p>
            </div>

            {/* 룰렛 캔버스 */}
            <div className="relative mx-auto w-80 h-80">
              <canvas
                ref={canvasRef}
                width={320}
                height={320}
                className="w-full h-full"
              />
              
              {isSpinning && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full">
                  <div className="text-center">
                    <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-sm text-purple-600">돌리는 중...</p>
                  </div>
                </div>
              )}
            </div>

            {/* 결과 표시 */}
            {result && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <div className="text-center">
                  <Trophy className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                  <h4 className="text-xl text-gray-900 mb-2">결과</h4>
                  <div className="bg-white rounded-xl px-6 py-3 shadow-sm">
                    <p className="text-2xl text-purple-600">{result}</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    오늘 점심은 <span className="text-purple-600">{result}</span>로 결정!
                  </p>
                </div>
              </div>
            )}

            {/* 액션 버튼들 */}
            <div className="flex gap-3">
              <Button
                onClick={resetRoulette}
                variant="outline"
                disabled={isSpinning}
                className="flex-1 h-12 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 active:bg-purple-100 rounded-xl transition-all duration-200 active:scale-98"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                초기화
              </Button>
              
              <Button
                onClick={spinRoulette}
                disabled={isSpinning || selectedMenus.length < 2}
                className="flex-2 h-12 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-98"
              >
                <Play className="w-4 h-4 mr-2" />
                {isSpinning ? '돌리는 중...' : '룰렛 돌리기'}
              </Button>
            </div>

            {/* 메뉴 리스트 */}
            <div className="text-left">
              <h5 className="text-sm text-gray-700 mb-3">참여 메뉴</h5>
              <div className="flex flex-wrap gap-2">
                {selectedMenus.map((menu, index) => (
                  <Badge
                    key={menu}
                    variant="outline"
                    className="border-purple-200 text-purple-700"
                  >
                    {menu}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}