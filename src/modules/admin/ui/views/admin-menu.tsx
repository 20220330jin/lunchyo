import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Edit2, ImageIcon, Plus, Search, Trash2, Upload} from "lucide-react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {UI_CATEGORIES} from "@/constants/category";
import {Textarea} from "@/components/ui/textarea";
import { Menu } from "@/core/types/menu.type";
import {CreateMenuRequest, GetMenusRequest, GetMenusResponse} from "@/modules/admin/types/admin.api.type";
import Image from "next/image";
import {ChangeEvent} from "react";
import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";

interface AdminMenuProps {
    isEditingMenu: Menu | null;
    menuParam: CreateMenuRequest;
    handleParam: (key: keyof CreateMenuRequest, value: string) => void;
    isUploading: boolean;
    isOpenMenuModal: boolean;
    handleMenuModal: () => void;
    handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
    handleSearchParam: (key: keyof CreateMenuRequest, value: string) => void;
    searchMenuParam: GetMenusRequest;
    menus: GetMenusResponse[];
}

const AdminMenu = ({
                       isEditingMenu,
                       menuParam,
                       handleParam,
                       isUploading,
                       isOpenMenuModal,
                       handleMenuModal,
                       handleImageChange,
                       handleSubmit,
                       handleSearchParam,
                       searchMenuParam,
                       menus
                   }: AdminMenuProps) => {
    return (
        <div className="space-y-6 p-3">
            <div className="flex items-center justify-between pl-2 pr-2">
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
                                                            value={category.id}
                                                            disabled={category.id === 'all'}>{category.emoji} {category.name}</SelectItem>
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
                                            <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                                                <Image
                                                    src={menuParam.image}
                                                    alt="메뉴 이미지 미리보기"
                                                    fill
                                                    style={{objectFit: 'cover'}}
                                                />
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
                            <Button onClick={handleSubmit}>{isEditingMenu ? '수정' : '추가'}</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            {/* 검색 필터 */}
            <div className="flex flex-col sm:flex-row gap-4 space-y-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
                    <Input placeholder="메뉴 검색..." value={searchMenuParam.name}
                           onChange={(e) => handleSearchParam('name', e.target.value)} className="pl-9"/>
                </div>
            </div>
            {/* 메뉴 목록 */}
            <div className="space-y-3">
                {menus.length === 0 ? (
                    <div className="text-center py-12">
                        <div>
                            {searchMenuParam.name ? '검색 결과가 없습니다.' : '메뉴가 없습ㄴ디ㅏ. 첫 번째 메뉴를 추가해보세요!'}
                        </div>
                    </div>
                ) : (
                    menus.map((menu) => (
                        <Card key={menu.name}>
                            <CardContent className="p-4">
                                <div className="flex gap-4">
                                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                        {menu.image ? (
                                            <Image src={menu.image} alt={menu.name} fill
                                                   className="w-full h-full object-cover"/>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <ImageIcon className="w-6 h-6 text-muted-foreground"/>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-medium text-foreground truncate">{menu.name}</h3>
                                                {menu.description && <p className="text-sm text-muted-foreground mt-1">{menu.description}</p>}
                                                <div className="flex items-center gap-2 mt-2">
                                                    <Badge variant="outline" className="text-xs">{menu.category}</Badge>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 ml-4">
                                                <Button size="sm" variant="outline">
                                                    <Edit2 className="w-3 h-3"/>
                                                </Button>
                                                <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                                                    <Trash2 className="w-3 h-3"/>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
export default AdminMenu
