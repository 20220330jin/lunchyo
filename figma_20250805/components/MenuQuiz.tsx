import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Brain, Trophy, RotateCcw, CheckCircle, XCircle, MapPin, ArrowRight, BookOpen } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Menu } from '../App';

interface QuizQuestion {
  id: string;
  foodName: string;
  correctAnswer: string;
  options: string[];
  image: string;
  hint: string;
  explanation: string; // 답변 설명 추가
  menu: Menu; // 실제 메뉴 데이터와 연결
}

interface MenuQuizProps {
  className?: string;
  onMenuSelect: (menu: Menu) => void;
  availableMenus: Menu[];
}

export function MenuQuiz({ className, onMenuSelect, availableMenus }: MenuQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // 사용 가능한 메뉴와 퀴즈 문제를 매핑
  const createQuizQuestions = (): QuizQuestion[] => {
    const baseQuestions = [
      {
        foodName: '김치찌개',
        correctAnswer: '한국',
        options: ['한국', '일본', '중국'],
        image: 'https://images.unsplash.com/photo-1582049489210-c9bf2ad81bc1?w=400&h=300&fit=crop',
        hint: '발효된 배추로 만든 매운 국물 요리',
        explanation: '김치찌개는 한국의 대표적인 전통 음식입니다. 발효된 김치의 깊은 맛과 돼지고기, 두부 등이 어우러져 만들어지는 국물 요리로, 한국인의 소울푸드라고 불립니다. 김치의 발효 과정에서 생기는 유산균과 각종 영양소가 풍부해 건강에도 좋습니다.'
      },
      {
        foodName: '파스타',
        correctAnswer: '이탈리아',
        options: ['프랑스', '이탈리아', '스페인'],
        image: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop',
        hint: '밀가루 반죽으로 만든 면 요리',
        explanation: '파스타는 이탈리아가 원산지인 면 요리입니다. 듀럼 밀을 사용한 면에 다양한 소스를 조합하여 만들며, 스파게티, 펜네, 라자냐 등 수백 가지의 종류가 있습니다. 이탈리아 각 지역마다 고유한 파스타 요리법이 전해져 내려오고 있습니다.'
      },
      {
        foodName: '초밥',
        correctAnswer: '일본',
        options: ['일본', '한국', '중국'],
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
        hint: '신선한 생선과 초밥용 쌀의 조화',
        explanation: '초밥(스시)은 일본의 전통 음식입니다. 식초로 간을 한 샤리(초밥용 밥) 위에 신선한 생선이나 해산물을 올린 요리로, 에도 시대부터 발달하기 시작했습니다. 신선한 재료와 숙련된 기술이 필요한 일본 요리의 정수를 보여주는 음식입니다.'
      },
      {
        foodName: '팟타이',
        correctAnswer: '태국',
        options: ['베트남', '태국', '라오스'],
        image: 'https://images.unsplash.com/photo-1559314809-0f31657def5e?w=400&h=300&fit=crop',
        hint: '쌀국수를 볶은 동남아시아 요리',
        explanation: '팟타이는 태국의 국민 요리입니다. 쌀국수를 새우, 두부, 콩나물 등과 함께 볶고 타마린드, 피시소스, 설탕으로 만든 특별한 소스로 간을 맞춘 요리입니다. 달콤하고 새콤한 맛이 특징이며, 태국 길거리 음식의 대표주자입니다.'
      },
      {
        foodName: '짜장면',
        correctAnswer: '중국',
        options: ['중국', '한국', '일본'],
        image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&h=300&fit=crop',
        hint: '검은 춘장 소스를 사용한 면 요리',
        explanation: '짜장면은 중국 산동성이 원산지인 자장면(炸醬麵)에서 유래했습니다. 한국으로 전해져 한국인의 입맛에 맞게 변화하여 지금의 짜장면이 되었습니다. 춘장(된장의 일종)에 양파, 돼지고기 등을 볶아 만든 소스를 면에 비벼 먹는 요리입니다.'
      },
      {
        foodName: '비빔밥',
        correctAnswer: '한국',
        options: ['한국', '일본', '태국'],
        image: 'https://images.unsplash.com/photo-1562059390-a761a084768e?w=400&h=300&fit=crop',
        hint: '다양한 나물과 고추장을 비빈 한국 요리',
        explanation: '비빔밥은 한국의 전통 음식으로, 밥 위에 여러 가지 나물과 고기, 계란 등을 올리고 고추장을 넣어 비벼 먹는 요리입니다. 한 그릇에 탄수화물, 단백질, 비타민, 무기질이 고루 들어있어 영양학적으로도 우수한 음식으로 평가받습니다.'
      },
      {
        foodName: '불고기',
        correctAnswer: '한국',
        options: ['한국', '일본', '몽골'],
        image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop',
        hint: '달콤하게 양념한 고기 구이',
        explanation: '불고기는 한국의 전통적인 고기 요리입니다. 얇게 썬 소고기를 간장, 설탕, 배, 마늘 등으로 만든 양념에 재워 구운 요리로, 달콤하고 부드러운 맛이 특징입니다. 조선시대부터 전해 내려오는 궁중 요리에서 유래되었습니다.'
      },
      {
        foodName: '라멘',
        correctAnswer: '일본',
        options: ['일본', '중국', '한국'],
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
        hint: '진한 국물과 면의 일본 요리',
        explanation: '라멘은 일본의 대표적인 면 요리입니다. 중국의 라면에서 유래했지만 일본에서 독자적으로 발전하여 현재의 모습이 되었습니다. 돼지뼈, 닭뼈 등으로 우린 진한 국물과 쫄깃한 면, 다양한 토핑이 특징이며, 지역마다 고유한 스타일이 있습니다.'
      },
      {
        foodName: '떡볶이',
        correctAnswer: '한국',
        options: ['한국', '일본', '중국'],
        image: 'https://images.unsplash.com/photo-1598511777073-998b4c24e517?w=400&h=300&fit=crop',
        hint: '매콤달콤한 떡 요리',
        explanation: '떡볶이는 한국의 대표적인 길거리 음식입니다. 쌀로 만든 가래떡을 고추장 기반의 양념으로 볶아 만드는 요리로, 매콤달콤한 맛이 특징입니다. 1950년대부터 현재의 모습으로 발전하기 시작했으며, 한국인들이 가장 사랑하는 간식 중 하나입니다.'
      }
    ];

    // 사용 가능한 메뉴와 매칭되는 퀴즈 문제만 생성
    return baseQuestions
      .map((q, index) => {
        const matchingMenu = availableMenus.find(menu => 
          menu.name.includes(q.foodName) || q.foodName.includes(menu.name)
        );
        
        if (matchingMenu) {
          return {
            id: `quiz-${index}`,
            ...q,
            menu: matchingMenu
          };
        }
        return null;
      })
      .filter(Boolean) as QuizQuestion[];
  };

  const generateNewQuestion = () => {
    const questions = createQuizQuestions();
    if (questions.length === 0) return;
    
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setCurrentQuestion(randomQuestion);
    setSelectedAnswer('');
    setShowResult(false);
    setShowExplanation(false);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    setTotalQuestions(prev => prev + 1);
    
    const correct = answer === currentQuestion?.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 1);
    }

    // 결과 표시 후 1초 뒤에 설명 표시
    setTimeout(() => {
      setShowExplanation(true);
    }, 1000);
  };

  const handleNextQuestion = () => {
    generateNewQuestion();
  };

  const resetQuiz = () => {
    setScore(0);
    setTotalQuestions(0);
    generateNewQuestion();
  };

  const handleRestaurantView = () => {
    if (currentQuestion?.menu) {
      onMenuSelect(currentQuestion.menu);
    }
  };

  useEffect(() => {
    generateNewQuestion();
  }, [availableMenus]);

  if (!currentQuestion) return null;

  return (
    <Card className={`overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>
      <CardContent className="p-0">
        <div className="relative">
          {/* 헤더 */}
          <div className="bg-white/80 backdrop-blur-sm p-4 border-b border-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-base text-gray-900">메뉴 퀴즈</h3>
                  <p className="text-xs text-gray-600">이 음식은 어느 나라 음식일까요?</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {totalQuestions > 0 && (
                  <div className="flex items-center gap-1 text-sm">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-gray-700">{score}/{totalQuestions}</span>
                  </div>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetQuiz}
                  className="p-1.5 h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50 active:scale-90 transition-all duration-200"
                  aria-label="퀴즈 초기화"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>

          {/* 퀴즈 컨텐츠 */}
          <div className="p-4 space-y-4">
            {/* 음식 이미지 */}
            <div className={`relative transform transition-all duration-300 ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
              <div className="w-full h-40 rounded-xl overflow-hidden">
                <ImageWithFallback
                  src={currentQuestion.image}
                  alt={currentQuestion.foodName}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* 힌트 배지 */}
              <Badge className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-gray-700 border-0 shadow-sm">
                💡 {currentQuestion.hint}
              </Badge>
              
              {/* 결과 표시 */}
              {showResult && (
                <div className={`absolute inset-0 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isCorrect ? 'bg-green-500/20 backdrop-blur-sm' : 'bg-red-500/20 backdrop-blur-sm'
                }`}>
                  <div className="text-center">
                    {isCorrect ? (
                      <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-2 animate-bounce" />
                    ) : (
                      <XCircle className="w-16 h-16 text-red-600 mx-auto mb-2 animate-bounce" />
                    )}
                    <div className={`text-lg px-4 py-2 rounded-full ${
                      isCorrect ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                    }`}>
                      {isCorrect ? '정답!' : `정답: ${currentQuestion.correctAnswer}`}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 음식 이름 */}
            <div className="text-center">
              <h4 className="text-xl text-gray-900 mb-1">{currentQuestion.foodName}</h4>
              <p className="text-sm text-gray-600">이 음식의 원산지는?</p>
            </div>

            {/* 선택지 */}
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map((option, index) => {
                // 결과 상태에서의 스타일 계산
                const getOptionStyle = () => {
                  if (!showResult) {
                    // 결과 표시 전: 기본 상태
                    return 'bg-gray-100 border border-gray-300 text-gray-900 hover:bg-gray-200 hover:border-gray-400';
                  }
                  
                  // 결과 표시 후
                  if (option === currentQuestion.correctAnswer) {
                    // 정답 옵션
                    return 'bg-blue-100 border border-blue-300 text-blue-700';
                  } else if (selectedAnswer === option) {
                    // 선택했지만 오답인 옵션
                    return 'bg-red-100 border border-red-300 text-red-700';
                  } else {
                    // 미선택 옵션
                    return 'bg-gray-100 border border-gray-300 text-gray-900';
                  }
                };

                return (
                  <button
                    key={option}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={showResult}
                    className={`p-4 rounded-xl text-left transition-all duration-200 active:scale-98 ${getOptionStyle()}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {option === '한국' && '🇰🇷'}
                          {option === '일본' && '🇯🇵'}
                          {option === '중국' && '🇨🇳'}
                          {option === '이탈리아' && '🇮🇹'}
                          {option === '프랑스' && '🇫🇷'}
                          {option === '스페인' && '🇪🇸'}
                          {option === '태국' && '🇹🇭'}
                          {option === '베트남' && '🇻🇳'}
                          {option === '라오스' && '🇱🇦'}
                          {option === '몽골' && '🇲🇳'}
                        </span>
                        <span className="text-base">{option}</span>
                      </div>
                      
                      {/* 결과 표시 아이콘 */}
                      {showResult && (
                        <div className="flex-shrink-0">
                          {option === currentQuestion.correctAnswer ? (
                            <CheckCircle className="w-5 h-5 text-blue-600" />
                          ) : selectedAnswer === option ? (
                            <XCircle className="w-5 h-5 text-red-600" />
                          ) : null}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 답변 설명 영역 */}
            {showResult && showExplanation && (
              <div className={`transform transition-all duration-500 ease-out ${
                showExplanation ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
              }`}>
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm text-blue-800 mb-2">
                        📖 {currentQuestion.foodName}에 대해 알아보기
                      </h5>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 결과 후 액션 버튼들 */}
            {showResult && showExplanation && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  onClick={handleRestaurantView}
                  className="flex items-center justify-center gap-2 h-12 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl shadow-sm hover:shadow-md active:shadow-sm transition-all duration-200 active:scale-98"
                >
                  <MapPin className="w-4 h-4" />
                  <span>맛집 보기</span>
                </Button>
                
                <Button
                  onClick={handleNextQuestion}
                  variant="outline"
                  className="flex items-center justify-center gap-2 h-12 bg-white border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 active:bg-blue-100 rounded-xl shadow-sm hover:shadow-md active:shadow-sm transition-all duration-200 active:scale-98"
                >
                  <Brain className="w-4 h-4" />
                  <span>다음 문제</span>
                </Button>
              </div>
            )}

            {/* 퀴즈 설명 텍스트 */}
            {showResult && showExplanation && (
              <div className="text-center pt-2">
                <p className="text-xs text-gray-500">
                  궁금하다면 <span className="text-blue-600">{currentQuestion.foodName}</span> 맛집을 찾아보세요!
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}