import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Calendar} from "lucide-react";
import {ImageWithFallback} from "../../../../../figma_20250805/components/figma/ImageWithFallback";

export const TodayHistory = () => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <Calendar />
                        오늘의 선택
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <div>
                            <ImageWithFallback />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
