import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Clock, Users} from "lucide-react";
import {KakaoShareButton} from "@/modules/home/ui/views/kakao-share-button";

export const MenuVoting = () => {
    return (
        <div className="space-y-6">
            {/* 정보 */}
            <Card className="border-0 bg-gradient-to-br from-green-50 to-blue-50 shadow-sm">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Badge className="bg-green-600 text-white">방 코드: </Badge>
                                <Badge variant="outline" className="border-green-200 text-green-700">
                                    <Users className="w-3 h-3 mr-1" />
                                    2 명
                                </Badge>
                            </div>
                            <p className="text-sm text-gray-600"></p>
                        </div>
                        <KakaoShareButton />
                    </div>
                    {/* 타이머 */}
                    <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 rounded-lg px-3 py-2">
                        <Clock className="w-4 h-4" />
                        <span>남은 시간: 21</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

