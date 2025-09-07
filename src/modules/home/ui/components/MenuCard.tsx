import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {ImageWithFallback} from "@/components/ImageWithFallback";
import {Heart, MapPin, Share2, TrendingUp, Users} from "lucide-react";
import {Button} from "@/components/ui/button";
import { Menu } from "@/core/types/menu.type";

interface MenuCardProps {
    menu: Menu;
}

export const MenuCard = ({menu}: MenuCardProps) => {
    return (
        <Card
            className="group overflow-hidden cursor-pointer transition-all duration-300 ease-out bg-white hover:shadow-xl hover:-translate-y-1 border-0 active:scale-98">
            <div className="relative">
                {/* 이미지 영역 */}
                <div className="relative w-full h-48 overflow-hidden">
                    {menu.image ? (
                        <ImageWithFallback src={menu.image} alt={menu.name}
                                           fill
                                           className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"/>
                    ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400 text-sm">No Image</span>
                        </div>
                    )}
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"/>
                    <Badge variant="secondary"
                           className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-gray-700 border-0 shadow-sm transition-all duration-300 group-hover:bg-white group-hover:shadow-md">{menu.category}</Badge>
                    {/* 인기도 배지 */}
                    <Badge>
                        <span>인기</span>
                    </Badge>
                    {/* 실시간 선택 집계 */}
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm transition-all duration-300 group-hover:bg-white group-hover:shadow-md">
                        <div className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-blue-600" />
                            <span>22</span>
                            <TrendingUp className="w-3.5 h-3.5 text-green-500 animate-bounce" />
                        </div>
                    </div>
                    {/* 액션 버튼 */}
                    <div className="absolute top-4 right-4 flex gap-2">
                        <Button variant="ghost" size="icon"><Heart /></Button>
                        <Button><Share2 /></Button>
                    </div>
                </div>
                {/* 컨텐츠 영역 */}
                <CardContent>
                    <div>
                        <div>
                            <h3>{menu.name}</h3>
                            <div>
                                <div>오늘</div>
                                <div>22명 선택</div>
                            </div>
                        </div>
                        <p>{menu.description}</p>
                    </div>
                    {/* 태그 영역 */}
                    <div />
                    {/* 액션 버튼 */}
                    <div>
                        <div>
                            <MapPin />
                            <span>주변 맛집 보기</span>
                        </div>
                        <Button>
                            <span>→</span>
                        </Button>
                    </div>
                </CardContent>
            </div>
        </Card>
    )
}
