import {Button} from "@/components/ui/button";
import {ArrowLeft, RotateCcw} from "lucide-react";
import {Tabs, TabsList} from "@/components/ui/tabs";

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
                    <TabsList></TabsList>
                </Tabs>
            </div>
        </div>
    );
}
