import {Card, CardContent} from "@/components/ui/card";
import {Info, Play, RotateCcw, Trophy, Users} from "lucide-react";
import {KakaoShareButton} from "@/modules/home/ui/views/kakao-share-button";
import { Badge } from "@/components/ui/badge";
import {Button} from "@/components/ui/button";

export const MenuRoulette = () => {
    return (
        <div className="space-y-6">
            <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50 shadow-sm">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Badge className="bg-purple-600 text-white">방 코드</Badge>
                                <Badge variant="outline" className="border-purple-200 text-purple-700">
                                    <Users className="w-3 h-3 mr-1" />
                                    2명
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground"></p>
                        </div>
                        <KakaoShareButton />
                    </div>
                </CardContent>
            </Card>
            {/* 룰렛 */}
            <Card className="border-0 bg-white shadow-sm">
                <CardContent className="p-6">
                    <div className="text-center space-y-6">
                        <div>
                            <h3 className="text-lg text-gray-900 mb-1">메뉴 룰렛</h3>
                            <p className="text-sm text-muted-foreground">5개 메뉴 중 랜덤 선택</p>
                        </div>
                        {/* 룰렛 캔버스 */}
                        <div className="relative mx-auto w-80 h-80">
                            <canvas width={320} height={320} className="w-full h-full" />
                            <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full">
                                <div className="text-center">
                                    <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                                    <p className="text-sm text-purple-600">돌리는 중...</p>
                                </div>
                            </div>
                        </div>
                        {/* 결과표시 */}
                        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-100">
                            <CardContent className="p-6 text-center">
                                <Trophy className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                                <h4 className="text-xl text-gray-900 mb-2">결과</h4>
                                <Badge className="bg-white text-gray-900 text-2xl px-6 py-3 shadow-sm">김치</Badge>
                                <p className="text-sm text-muted-foreground mt-3">오늘점심은?</p>
                            </CardContent>
                        </Card>
                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1 h-12 border-purple-200 text-purple-700 hover:bg-purple-50">
                                <RotateCcw className="w-4 h-4 mr-2" />
                                초기화
                            </Button>
                            <Button className="flex-2 h-12 bg-purple-600 hover:bg-purple-700 text-white">
                                <Play className="w-4 h-4 mr-2" />
                                돌리는 중...
                            </Button>
                        </div>
                        {/* 메뉴 리스트 */}
                        <div className="text-left">
                            <h5 className="text-sm text-gray-700 mb-3 flex items-center gap-2">
                                <Info className="w-4 h-4" />
                                참여 메뉴
                            </h5>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="border-purple-200 text-purple-700">메뉴</Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
