import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {ImageWithFallback} from "@/components/ImageWithFallback";
import {Heart, MapPin, Share2, TrendingUp, Users} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Menu} from "@/core/types/menu.type";

interface MenuCardProps {
    menu: Menu;
    onOpenBottomSheet: (menu: Menu) => void;
}

export const MenuCard = ({menu, onOpenBottomSheet}: MenuCardProps) => {
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
                    <Badge variant="default"
                           className="absolute top-4 left-20 backdrop-blur-sm shadow-sm transition-all duration-300 group-hover:shadow-md">
                        <span className="mr-1"/>
                        추천
                    </Badge>
                    {/* 실시간 선택 집계 */}
                    <div
                        className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm transition-all duration-300 group-hover:bg-white group-hover:shadow-md">
                        <div className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-blue-600"/>
                            <span>22</span>
                            <TrendingUp className="w-3.5 h-3.5 text-green-500 animate-bounce"/>
                        </div>
                    </div>
                    {/* 액션 버튼 */}
                    <div className="absolute top-4 right-4 flex gap-2">
                        <Button variant="ghost" size="icon"
                                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:text-red-500 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
                                aria-label="찜하기">
                            <Heart className="w-4 h-4"/>
                        </Button>
                        <Button variant="ghost" size="icon"
                                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-blue-600 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95"
                                aria-label="공유하기">
                            <Share2/>
                        </Button>
                    </div>
                </div>
                {/* 컨텐츠 영역 */}
                <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-start justify-between">
                            <h3 className="text-xl text-gray-900 group-hover:text-blue-600 transition-colors duration-200 flex-1 pr-2">{menu.name}</h3>
                            <div className="text-xs text-gray-500 text-right flex-shrink-0">
                                <div>오늘</div>
                                <div className={`transition-all duration-300`}>22명 선택</div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{menu.description}</p>
                    </div>
                    {/* 태그 영역 */}
                    <div/>
                    {/* 액션 버튼 */}
                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-blue-600 transition-colors duration-200">
                            <MapPin className="w-4 h-4"/>
                            <span>주변 맛집 보기</span>
                        </div>
                        <Button size="icon" onClick={() => onOpenBottomSheet(menu)} className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95">
                            <span className="text-white text-lg transform group-hover:translate-x-0.5 transition-transform duration-200">→</span>
                        </Button>
                    </div>
                </CardContent>
            </div>
        </Card>
    )
}
