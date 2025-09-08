import {RestaurantType} from "@/modules/home/types";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Share2, Star} from "lucide-react";

interface RestaurantCardProps {
    restaurant: RestaurantType;
}

export const RestaurantCard = ({restaurant}: RestaurantCardProps) => {
    return (
        <Card className="overflow-hidden hover:shadow-md transition-all duration-300 border-0 bg-white group active:scale-98">
            <CardContent className="p-4">
                <div className="space-y-3">
                    {/* 헤더 영역 */}
                    <div className="flex items-center justify-between">
                        <div className="flex-1 pr-2">
                            <h3 className="text-base text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-200">{restaurant.place_name}</h3>
                            <p className="text-xs text-gray-500 mt-1 leading-tight">{restaurant.address_name}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="p-1.5 h-7 w-7 text-gray-400 hover:text-blue-600 hover:bg-blue-50 flex-shrink-0 transition-all duration-200 active:scale-90">
                            <Share2 className="w-3 h-3" />
                        </Button>
                    </div>
                    {/* 주요 정보 */}
                    <div>
                        <div>
                            <Star />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
