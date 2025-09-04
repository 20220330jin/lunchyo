"use client"
import {Tabs, TabsContent} from "@/components/ui/tabs";
import {useState} from "react";
import {MainRecommendation} from "@/modules/home/ui/views/main-recommendation";
import {MenuRoulette} from "@/modules/home/ui/views/menu-roulette";
import {MenuVoting} from "@/modules/home/ui/views/menu-voting";
import {TodayHistory} from "@/modules/home/ui/views/today-history";

/**
 * 메인 페이지
 *
 * @author hjkim
 * @constructor
 */
export const HomeView = () => {
    /**
     * Hooks
     */
    /**
     * States
     */
    /* 추천페이지 헤더 노출 제어 state */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [showHeader, setShowHeader] = useState<boolean>(true);
    /* 탭 제어 state */
    const [activeTab, setActiveTab] = useState<string>("recommend");

    /**
     * Variables
     */
    /* 추천페이지 진입시 탭 노출 제어 */
    // 탭 네비게이션 표시 여부 결정
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const shouldShowTabs = !(activeTab === 'recommend' && !showHeader);

    /**
     * Handlers
     */
    /* 탭 제어 handler */
    const handleTabChange = (tab: string) => {
        console.log(tab);
        setActiveTab(tab);
    };
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-4 max-w-wd">
                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                    {/*{shouldShowTabs && (*/}
                    {/*    */}
                    {/*)}*/}
                    {/* 탭 컨텐츠: 추천받기 */}
                    <TabsContent value="recommend">
                        {showHeader ? (
                            <MainRecommendation/>
                        ) : (
                            <div>
                                <div>
                                    <h2>추천 메뉴</h2>
                                    <p>메뉴를 추천했어요</p>
                                </div>
                            </div>
                        )}
                    </TabsContent>
                    {/* 탭 컨텐츠: 룰렛 */}
                    <TabsContent value="roulette" className="mt-0">
                        <MenuRoulette/>
                    </TabsContent>
                    {/* 탭 컨텐츠: 투표 */}
                    <TabsContent value="voting" className="mt-0">
                        <MenuVoting/>
                    </TabsContent>
                    {/* 탭 컨텐츠: 기록  */}
                    <TabsContent value="history" className="mt-0">
                        <TodayHistory/>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
