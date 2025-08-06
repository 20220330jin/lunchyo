import {Button} from "@/components/ui/button";
import {ArrowLeft, RotateCcw} from "lucide-react";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";

export default function Home() {
    return (
        <div className="font-bold">
            <div>
                <header>
                    <Button>
                        <ArrowLeft />
                        <span>처음으로</span>
                    </Button>
                    <div>
                    </div>
                    <Button>
                        <RotateCcw />
                        <span>다시 추천</span>
                    </Button>
                </header>
                <Tabs>
                    <TabsList>
                        <TabsTrigger value="recommend">추천받기</TabsTrigger>
                        <TabsTrigger value="rolette">룰렛</TabsTrigger>
                        <TabsTrigger value="voting">투표</TabsTrigger>
                        <TabsTrigger value="history">기록</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
        </div>
    );
}
