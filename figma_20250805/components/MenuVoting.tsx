import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { MenuSelector } from './MenuSelector';
import { KakaoShareButton, ShareCard } from './KakaoShareButton';
import { PasswordModal } from './PasswordModal';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Vote, Users, Link, Settings, Trophy, Clock, CheckCircle } from 'lucide-react';
import { Menu } from '../App';

interface VoteData {
  menu: string;
  votes: string[]; // 투표한 사용자 닉네임들
  percentage: number;
}

interface VotingRoom {
  id: string;
  menus: string[];
  password: string;
  createdAt: Date;
  participants: string[];
  votes: Record<string, string[]>; // menu -> voters
  isActive: boolean;
  endTime?: Date;
}

interface MenuVotingProps {
  availableMenus: Menu[];
  onMenuSelect?: (menu: string) => void;
}

export function MenuVoting({ availableMenus, onMenuSelect }: MenuVotingProps) {
  const [selectedMenus, setSelectedMenus] = useState<string[]>([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<VotingRoom | null>(null);
  const [showShareCard, setShowShareCard] = useState(false);
  const [mode, setMode] = useState<'create' | 'voting' | 'result'>('create');
  const [nickname, setNickname] = useState('');
  const [myVote, setMyVote] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // 투표방 생성
  const createRoom = async () => {
    if (selectedMenus.length < 2) return;

    const room: VotingRoom = {
      id: Math.random().toString(36).substr(2, 6).toUpperCase(),
      menus: selectedMenus,
      password: '1234', // 실제로는 사용자가 설정
      createdAt: new Date(),
      participants: ['나'],
      votes: selectedMenus.reduce((acc, menu) => ({ ...acc, [menu]: [] }), {}),
      isActive: true,
      endTime: new Date(Date.now() + 10 * 60 * 1000) // 10분 후 종료
    };

    setCurrentRoom(room);
    setMode('voting');
    setShowShareCard(true);
    setNickname('나');
  };

  // 투표방 참여
  const joinRoom = () => {
    setShowPasswordModal(true);
  };

  const handleJoinSuccess = (joinNickname?: string) => {
    if (joinNickname) {
      setNickname(joinNickname);
    }
    
    // Mock room data
    const mockRoom: VotingRoom = {
      id: 'VOTE1',
      menus: ['김치찌개', '파스타', '초밥', '떡볶이'],
      password: '1234',
      createdAt: new Date(),
      participants: ['방장', joinNickname || '게스트'],
      votes: {
        '김치찌개': ['방장'],
        '파스타': [],
        '초밥': [],
        '떡볶이': []
      },
      isActive: true,
      endTime: new Date(Date.now() + 5 * 60 * 1000)
    };

    setCurrentRoom(mockRoom);
    setSelectedMenus(mockRoom.menus);
    setMode('voting');
  };

  // 투표하기
  const handleVote = (menu: string) => {
    if (!currentRoom || !nickname || myVote === menu) return;

    const newVotes = { ...currentRoom.votes };
    
    // 기존 투표 제거
    if (myVote) {
      newVotes[myVote] = newVotes[myVote].filter(voter => voter !== nickname);
    }
    
    // 새 투표 추가
    newVotes[menu] = [...newVotes[menu], nickname];
    
    setCurrentRoom({
      ...currentRoom,
      votes: newVotes
    });
    
    setMyVote(menu);
  };

  // 투표 결과 계산
  const getVoteData = (): VoteData[] => {
    if (!currentRoom) return [];

    const totalVotes = Object.values(currentRoom.votes).reduce((sum, voters) => sum + voters.length, 0);
    
    return currentRoom.menus.map(menu => ({
      menu,
      votes: currentRoom.votes[menu] || [],
      percentage: totalVotes > 0 ? Math.round((currentRoom.votes[menu]?.length || 0) / totalVotes * 100) : 0
    }));
  };

  // 투표 종료
  const endVoting = () => {
    if (!currentRoom) return;
    
    setCurrentRoom({
      ...currentRoom,
      isActive: false
    });
    setMode('result');
  };

  // 타이머 업데이트
  useEffect(() => {
    if (!currentRoom?.endTime || !currentRoom.isActive) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const end = currentRoom.endTime!.getTime();
      const remaining = Math.max(0, end - now);
      
      setTimeLeft(remaining);
      
      if (remaining === 0) {
        endVoting();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentRoom]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (mode === 'create') {
    return (
      <div className="space-y-6">
        {/* 기능 선택 */}
        <Card className="border-0 bg-gradient-to-br from-green-50 to-blue-50 shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Vote className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl text-gray-900 mb-2">메뉴 투표</h2>
            <p className="text-sm text-gray-600 mb-6">
              친구들과 함께 투표로 메뉴를 정해보세요!
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => setMode('create')}
                className="h-12 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-98"
              >
                <Settings className="w-4 h-4 mr-2" />
                투표 만들기
              </Button>
              
              <Button
                onClick={joinRoom}
                variant="outline"
                className="h-12 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 active:bg-green-100 rounded-xl transition-all duration-200 active:scale-98"
              >
                <Link className="w-4 h-4 mr-2" />
                투표 참여
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 메뉴 선택 */}
        <MenuSelector
          selectedMenus={selectedMenus}
          onMenusChange={setSelectedMenus}
          availableMenus={availableMenus}
          maxMenus={6}
          minMenus={2}
          title="투표 메뉴 설정"
          description="투표에 포함할 메뉴들을 선택하세요"
        />

        {/* 투표 생성 버튼 */}
        {selectedMenus.length >= 2 && (
          <Button
            onClick={createRoom}
            className="w-full h-12 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-98"
          >
            <Vote className="w-4 h-4 mr-2" />
            투표 만들기
          </Button>
        )}

        {/* 공유 카드 */}
        {showShareCard && currentRoom && (
          <ShareCard
            title="메뉴 투표가 생성되었어요!"
            description="친구들을 초대해서 함께 투표해보세요"
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
          title="투표 참여"
          description="투표방의 비밀번호를 입력해주세요"
          requireNickname={true}
        />
      </div>
    );
  }

  if (mode === 'result') {
    const voteData = getVoteData().sort((a, b) => b.votes.length - a.votes.length);
    const winner = voteData[0];

    return (
      <div className="space-y-6">
        {/* 투표 결과 헤더 */}
        <Card className="border-0 bg-gradient-to-br from-green-50 to-blue-50 shadow-sm">
          <CardContent className="p-6 text-center">
            <Trophy className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-xl text-gray-900 mb-2">투표 완료!</h2>
            <p className="text-sm text-gray-600">
              총 {currentRoom?.participants.length}명이 참여했습니다
            </p>
          </CardContent>
        </Card>

        {/* 우승 메뉴 */}
        {winner && (
          <Card className="border-0 bg-gradient-to-r from-green-50 to-emerald-50 shadow-sm border border-green-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg text-gray-900 mb-1">최종 결과</h3>
              <div className="bg-white rounded-xl px-6 py-4 shadow-sm">
                <p className="text-2xl text-green-600 mb-1">{winner.menu}</p>
                <p className="text-sm text-gray-600">
                  {winner.votes.length}표 ({winner.percentage}%)
                </p>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                오늘 점심은 <span className="text-green-600">{winner.menu}</span>로 결정!
              </p>
              
              {onMenuSelect && (
                <Button
                  onClick={() => onMenuSelect(winner.menu)}
                  className="mt-4 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-xl px-6 py-2 transition-all duration-200 active:scale-98"
                >
                  맛집 찾아보기
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* 전체 투표 결과 */}
        <Card className="border-0 bg-white shadow-sm">
          <CardContent className="p-6">
            <h4 className="text-base text-gray-900 mb-4">상세 투표 결과</h4>
            <div className="space-y-4">
              {voteData.map((vote, index) => (
                <div key={vote.menu} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {index === 0 && <Trophy className="w-4 h-4 text-green-600" />}
                      <span className="text-sm text-gray-900">{vote.menu}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{vote.votes.length}표</span>
                      <Badge variant={index === 0 ? "default" : "outline"} className={index === 0 ? "bg-green-100 text-green-700" : ""}>
                        {vote.percentage}%
                      </Badge>
                    </div>
                  </div>
                  <Progress 
                    value={vote.percentage} 
                    className="h-2"
                  />
                  {vote.votes.length > 0 && (
                    <p className="text-xs text-gray-500">
                      {vote.votes.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 새 투표 버튼 */}
        <Button
          onClick={() => {
            setMode('create');
            setCurrentRoom(null);
            setMyVote(null);
            setShowShareCard(false);
            setSelectedMenus([]);
          }}
          variant="outline"
          className="w-full h-12 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 active:bg-green-100 rounded-xl transition-all duration-200 active:scale-98"
        >
          새 투표 시작하기
        </Button>
      </div>
    );
  }

  // 투표 진행 화면
  const voteData = getVoteData();
  const totalVotes = voteData.reduce((sum, vote) => sum + vote.votes.length, 0);

  return (
    <div className="space-y-6">
      {/* 룸 정보 */}
      {currentRoom && (
        <Card className="border-0 bg-gradient-to-br from-green-50 to-blue-50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-green-100 text-green-700">방 코드: {currentRoom.id}</Badge>
                  <Badge variant="outline" className="border-green-200 text-green-700">
                    <Users className="w-3 h-3 mr-1" />
                    {currentRoom.participants.length}명
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  {currentRoom.participants.join(', ')}
                </p>
              </div>
              
              <KakaoShareButton
                title="메뉴 투표 참여하기"
                description={`${currentRoom.menus.join(', ')} 중에서 투표해요!`}
                variant="ghost"
                size="sm"
                showIcon={true}
              />
            </div>

            {/* 타이머 */}
            {currentRoom.isActive && timeLeft > 0 && (
              <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 rounded-lg px-3 py-2">
                <Clock className="w-4 h-4" />
                <span>남은 시간: {formatTime(timeLeft)}</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* 투표 현황 */}
      <Card className="border-0 bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-gray-900">메뉴 투표</h3>
            <div className="text-sm text-gray-600">
              총 {totalVotes}표
            </div>
          </div>

          <div className="space-y-3">
            {voteData.map((vote) => (
              <button
                key={vote.menu}
                onClick={() => handleVote(vote.menu)}
                disabled={!currentRoom?.isActive}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-200 active:scale-98 ${
                  myVote === vote.menu
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200 bg-gray-50 hover:border-green-200 hover:bg-green-50'
                } ${!currentRoom?.isActive ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {myVote === vote.menu && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                    <span className="text-gray-900">{vote.menu}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{vote.votes.length}표</span>
                    <Badge variant="outline" className="border-green-200 text-green-700">
                      {vote.percentage}%
                    </Badge>
                  </div>
                </div>
                <Progress 
                  value={vote.percentage} 
                  className="h-2"
                />
                {vote.votes.length > 0 && (
                  <p className="text-xs text-gray-500 mt-2 text-left">
                    {vote.votes.join(', ')}
                  </p>
                )}
              </button>
            ))}
          </div>

          {myVote && (
            <div className="mt-4 p-3 bg-green-50 rounded-xl text-center">
              <p className="text-sm text-green-700">
                ✅ <span className="text-green-600">{myVote}</span>에 투표했습니다
              </p>
            </div>
          )}

          {/* 투표 종료 버튼 (방장만) */}
          {currentRoom?.participants[0] === nickname && currentRoom.isActive && (
            <Button
              onClick={endVoting}
              variant="outline"
              className="w-full mt-4 h-11 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 active:bg-green-100 rounded-xl transition-all duration-200 active:scale-98"
            >
              투표 종료하기
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}