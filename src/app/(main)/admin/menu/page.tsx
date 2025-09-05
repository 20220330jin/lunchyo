'use client'
import AdminMenu from "@/modules/admin/ui/views/admin-menu";
import {ChangeEvent, useState} from "react";
import {Menu} from "@/modules/home/types/recommendation";
import {CreateMenuRequest, GetMenusRequest} from "@/modules/admin/types/admin.api.type";
import {adminInitializer} from "@/modules/admin/types/admin.initializer";
import {useUploadUrlMutation, useCreateMenuMutation} from "@/modules/admin/queries/use-admin-mutations";
import {useGetMenusQuery} from "@/modules/admin/queries/use-admin-queries";
import toast from "react-hot-toast";

export default function AdminMenuPage() {
    /**
     * Hooks
     */
    const uploadUrlMutation = useUploadUrlMutation();
    const createMenuMutation = useCreateMenuMutation();


    /**
     * States
     */
    /* 메뉴 추가/수정 팝업 제어 state */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isEditingMenu, setIsEditingMenu] = useState<Menu | null>(null);
    /* 메뉴 추가/수정 파라미터 state */
    const [menuParam, setMenuParams] = useState<CreateMenuRequest>(adminInitializer.INITIAL_MENU_PARAM);
    /* 이미지 업로드 로딩 제어 state */
    // const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
    /* 메뉴 추가/수정 팝업 오픈 제어 */
    const [isOpenMenuModal, setIsOpenMenuModal] = useState<boolean>(false);
    /* 메뉴 조회 요청 파라미터 state */
    const [searchMenuParam, setSearchMenuParam] = useState<GetMenusRequest>(adminInitializer.INITIAL_GET_MENUS_REQUEST_PARAM);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {data: menus, isLoading, error} = useGetMenusQuery(searchMenuParam);

    /**
     * Handlers
     */
    /* 메뉴 추가 및 수정 파라미터 변경 handler */
    const handleParam = (key: keyof CreateMenuRequest, value: string) => {
        console.log('key', key, 'value', value);
        setMenuParams((current) => ({
            ...current,
            [key]: value,
        }))
    }
    /* 모달 오픈 제어 */
    const handleMenuModal = () => {
        console.log(isOpenMenuModal)
        setIsOpenMenuModal(!isOpenMenuModal);
    }

    /* 이미지 업로드 로직 handler */
    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return;

        uploadUrlMutation.mutate({fileName: file.name, fileType: file.type}, {
            onSuccess: async (data) => {
                await fetch(data.uploadUrl, {method: 'PUT', body: file, headers: {'Content-Type': file.type}})
                handleParam('image', data.fileUrl);
            },
            onError: (error) => {
                alert(`이미지 업로드 실패: ${error.message}`)
            }
        })
    }
    /* 메뉴 생성 handler */
    const handleSubmit = () => {
        if (isEditingMenu) {
            console.log('수정모드')
        } else {
            createMenuMutation.mutate(menuParam, {
                onSuccess: () => {
                    toast.success('메뉴가 등록되었습니다.')
                    handleMenuModal();
                },
                onError: (error) => {
                    console.log(error)
                    toast.error('메뉴 등록에 실패하였습니다.')
                }
            })
        }
    }
    /* 검색 조건 변경 handler */
    const handleSearchParam = (key: keyof CreateMenuRequest, value: string) => {
        setSearchMenuParam(({
            ...searchMenuParam,
            [key]: value,
        }))
    }

    return <AdminMenu isEditingMenu={isEditingMenu} menuParam={menuParam} handleParam={handleParam}
                      isUploading={uploadUrlMutation.isPending} isOpenMenuModal={isOpenMenuModal}
                      handleMenuModal={handleMenuModal} handleImageChange={handleImageChange}
                      handleSubmit={handleSubmit} handleSearchParam={handleSearchParam} searchMenuParam={searchMenuParam} menus={menus}/>
}
