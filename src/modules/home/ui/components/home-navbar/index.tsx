import {TabsList, TabsTrigger} from "@/components/ui/tabs";
import {History, Sparkles, Vote} from "lucide-react";
import Link from "next/link";

export const HomeNavbar = () => {
    /**
     * Hooks
     */
    const homeTabs = [
        {href: '/', value: 'recommend', label: '추천받기', icon: null, activeColor: 'data-[state=active]:bg-blue-600'},
        {
            href: '/roulette',
            value: 'roulette',
            label: '룰렛',
            icon: <Sparkles className="w-3 h-3"/>,
            activeColor: 'data-[state=active]:bg-blue-600'
        },
        {
            href: '/voting',
            value: 'voting',
            label: '투표',
            icon: <Vote className="w-3 h-3"/>,
            activeColor: 'data-[state=active]:bg-blue-600'
        },
        {
            href: '/history',
            value: 'history',
            label: '기록',
            icon: <History className="w-3 h-3"/>,
            activeColor: 'data-[state=active]:bg-blue-600'
        },
    ];
    return (
        <TabsList className="grid w-full grid-cols-4 bg-card h-12 shadow-sm">
            {homeTabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value} asChild>
                    <Link href={tab.href}
                          className={`data-[state=active]:text-white hover:bg-gray-100 active:scale-95 transition-all duration-100 h-10 text-xs rounded-lg flex items-center gap-1 
      ${tab.activeColor}`}>
                        {tab.icon}
                        {tab.label}
                    </Link>
                </TabsTrigger>
            ))}
        </TabsList>
        // <TabsList className="grid w-full grid-cols-4 mb-4 bg-card h-12 shadow-sm">
        //     <TabsTrigger value="recommend"
        //                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white hover:bg-blue-50 active:scale-95 transition-all duration-150 h-10 text-xs rounded-lg">추천받기</TabsTrigger>
        //     <TabsTrigger value="roulette"
        //                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white hover:bg-purple-50 active:scale-95 transition-all duration-150 h-10 text-xs rounded-lg flex items-center gap-1">
        //         <Sparkles className="w-3 h-3"/>
        //         룰렛
        //     </TabsTrigger>
        //     <TabsTrigger value="voting"
        //                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white hover:bg-green-50 active:scale-95 transition-all duration-150 h-10 text-xs rounded-lg flex items-center gap-1">
        //         <Vote className="w-3 h-3"/>
        //         투표
        //     </TabsTrigger>
        //     <TabsTrigger value="history"
        //                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white hover:bg-blue-50 active:scale-95 transition-all duration-150 h-10 text-xs rounded-lg flex items-center gap-1">
        //         <History className="w-3 h-3"/>
        //         기록
        //     </TabsTrigger>
        // </TabsList>
    )
}
