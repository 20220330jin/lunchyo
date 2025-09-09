'use client'
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Home, MapPin, MessageSquare, Vote} from "lucide-react";
import {useState} from "react";
import Link from "next/link";

export const BottomNavbar = () => {
    const BottomTabs = [
        {
            href: '/',
            value: 'value',
            label: '홈',
            icon: <Home className="w-5 h-5"/>,
            activeColor: 'data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600'
        },
        {
            href: '/voting',
            value: 'voting',
            label: '투표',
            icon: <Vote className="w-5 h-5"/>,
            activeColor: 'data-[state=active]:bg-green-50 data-[state=active]:text-green-600'
        },
        {
            href: '/review',
            value: 'review',
            label: '리뷰',
            icon: <MessageSquare className="w-5 h-5"/>,
            activeColor: 'data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600'
        },
        {
            href: '/nearby',
            value: 'nearby',
            label: '주변맛집',
            icon: <MapPin className="w-5 h-5"/>,
            activeColor: 'data-[state=active]:bg-orange-50 data-[state=active]:text-orange-600'
        },
    ]
    const [activeTab, setActiveTab] = useState('home');
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    }
    return (
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
                <div className="container mx-auto px-4 max-w-md">
                    <TabsList className="grid w-full grid-cols-4 bg-transparent h-16 shadow-none">
                        {BottomTabs.map((tab) => (
                            <TabsTrigger key={tab.value} value={tab.value} className={`hover:bg-gray-50 h-12 flex flex-col items-center gap-1 text-xs border-none bg-transparent ${tab.activeColor}`}>
                                <Link href={tab.href} className="flex flex-col items-center gap-1"
                                      >{tab.icon}{tab.label}</Link>
                            </TabsTrigger>
                        ))}
                        {/*<TabsTrigger value="home"*/}
                        {/*             className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 hover:bg-gray-50 h-12 flex flex-col items-center gap-1 text-xs border-none bg-transparent">*/}
                        {/*    <Home className="w-5 h-5"/>*/}
                        {/*</TabsTrigger>*/}
                    </TabsList>
                </div>
            </div>
        </Tabs>
    )
}
