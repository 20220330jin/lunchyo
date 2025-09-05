'use client'
import {useLoading} from "@/context/loading-context";
import {useEffect, useState} from "react";

export const GlobalLoadingOverlay = () => {
    const {isLoading} = useLoading();
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    console.log('isLoading', isLoading);

    const loadingMessages = [
        '곧 추천 메뉴가 준비됩니다. 잠시만 기다려주세요.',
        '김현진입니다.',
        '양영조입니다.'
    ]

    useEffect(() => {
        console.log('loading', loadingMessages);
        const interval = setInterval(() => {
            setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
        }, 800);

        return () => clearInterval(interval);
    }, [isLoading, loadingMessages.length])

    if (!isLoading) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
            {/* 상단 로딩 영역 */}
            <div className="flex-1 flex items-center justify-center">
                <div className="flex">
                    {/* 로고 애니메이션 */}
                    <div>
                        <div>이미지</div>
                        {/* 로딩 링 애니메이션 */}
                        <div className="absolute"/>
                        <div className="absolute"/>
                    </div>
                    {/* 브랜드 명 */}
                    <div>
                        <h1>LunchYo!!!</h1>
                        <div className="w-16"/>
                    </div>
                    {/* 로딩 도트 */}
                    <div>
                        <div className="w-2 h-2"/>
                    </div>
                </div>
            </div>
            {/* 하단 메시지 영역 */}
            <div>
                <div>
                    <h3>로딩메시지</h3>
                    <p>추천 메뉴를 검색중입니다!</p>
                </div>
            </div>
        </div>
    )
}
