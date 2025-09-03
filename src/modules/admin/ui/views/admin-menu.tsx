import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Label} from "@/components/ui/label";

const AdminMenu = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl text-foreground">메뉴 관리</h2>
                    <p className="text-sm text-muted-foreground">총 2개</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus/>
                            메뉴 추가
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>세 매뉴 추가</DialogTitle>
                            <DialogDescription>메뉴 정보를 입력해주세요.</DialogDescription>
                        </DialogHeader>
                        <ScrollArea>
                            <div>
                                <div>
                                    <Label htmlFor="name">메뉴명</Label>
                                </div>
                            </div>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
export default AdminMenu
