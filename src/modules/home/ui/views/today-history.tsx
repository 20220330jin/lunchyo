import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Calendar} from "lucide-react";

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
                            asdf
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
