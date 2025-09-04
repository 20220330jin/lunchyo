import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Plus, Trash2, Upload} from "lucide-react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {UI_CATEGORIES} from "@/constants/category";
import {Textarea} from "@/components/ui/textarea";
import {Menu} from "@/modules/home/types/recommendation";
import {CreateMenuRequest} from "@/modules/admin/types/admin.api.type";
import Image from "next/image";
import {ChangeEvent} from "react";

interface AdminMenuProps {
    isEditingMenu: Menu | null;
    menuParam: CreateMenuRequest;
    handleParam: (key: keyof CreateMenuRequest, value: string) => void;
    isUploading: boolean;
    isOpenMenuModal: boolean;
    handleMenuModal: () => void;
    handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AdminMenu = ({
                       isEditingMenu,
                       menuParam,
                       handleParam,
                       isUploading,
                       isOpenMenuModal,
                       handleMenuModal,
                       handleImageChange
                   }: AdminMenuProps) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl text-foreground">메뉴 관리</h2>
                    <p className="text-sm text-muted-foreground">총 2개</p>
                </div>
                <Dialog open={isOpenMenuModal} onOpenChange={handleMenuModal}>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="w-4 h-4 mr-2"/>
                            메뉴 추가
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md max-h-[90vh]">
                        <DialogHeader>
                            <DialogTitle>{isEditingMenu ? '메뉴 수정' : '세 매뉴 추가'}</DialogTitle>
                            <DialogDescription>메뉴 정보를 입력해주세요.</DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="max-h-[60vh]">
                            <div className="space-y-4 pr-4">
                                {/* 메뉴명 */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">메뉴명</Label>
                                    <Input id="name" value={menuParam.name}
                                           onChange={(e) => handleParam('name', e.target.value)} placeholder="예: 김치찌개"/>
                                </div>
                                {/* 카테고리 */}
                                <div className="space-y-2">
                                    <Label>카테고리</Label>
                                    <Select value={menuParam.categoryId}
                                            onValueChange={(e) => handleParam('categoryId', e)}>
                                        <SelectTrigger>
                                            <SelectValue/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {UI_CATEGORIES.map((category) => (
                                                <SelectItem key={category.id}
                                                            value={category.id}>{category.emoji} {category.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                {/* 설명 */}
                                <div className="space-y-2">
                                    <Label htmlFor="description">설명</Label>
                                    <Textarea id="description" value={menuParam.description}
                                              onChange={(e) => handleParam('description', e.target.value)}
                                              placeholder="메뉴에 대한 간단한 설명을 입력하세요." rows={3}/>
                                </div>
                                {/* 이미지 검색 */}
                                <div className="space-y-2">
                                    <Label>이미지</Label>
                                    <div className="space-y-3">
                                        <div
                                            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                                            <input type="file" accept="image/*" className="hidden" id="image-upload"
                                                   onChange={handleImageChange}
                                                   disabled={isUploading}/>
                                            <label htmlFor="image-upload"
                                                   className={`cursor-pointer flex flex-col items-center gap-2 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                                <Upload className="w-8 h-8 text-muted-foreground"/>
                                                <div className="text-sm">
                                                    <span
                                                        className="font-medium text-blue-600 hover:text-blue-700">{isUploading ? '업로드 중' : '클릭하여 이미지 업로드'}</span>
                                                    <p className="text-muted-foreground mt-1">PNG, JPG, GIF 파일</p>
                                                </div>
                                            </label>
                                        </div>
                                        {/* 이미지 미리보기 */}
                                        {menuParam.image && (
                                            <div className="relative">
                                                <Image src={menuParam.image} alt="preview"/>
                                                <div className="absolute top-2 right-2">
                                                    <Button size="sm" variant="secondary">
                                                        <Trash2/>
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                        <DialogFooter>
                            <Button variant="outline" onClick={handleMenuModal}>최소</Button>
                            <Button>{isEditingMenu ? '수정' : '삭제'}</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
export default AdminMenu
