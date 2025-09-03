import {TabsList, TabsTrigger} from "@/components/ui/tabs";
import Link from "next/link";

export const AdminNavbar = () => {
    const AdminTabs = [
        {
            href: '/admin/menu',
            value: 'adminMenu',
            label: '메뉴 관리',
            icon: null,
            activeColor: 'data-[state=active]:bg-blue-600'
        },
        {
            href: '/admin/user',
            value: 'adminUser',
            label: '사용자 관리',
            icon: null,
            activeColor: 'data-[state=active]:bg-blue-600'
        },
    ]
    return (
        <TabsList className="grid w-full grid-cols-2 bg-card h-12 shadow-sm">
            {AdminTabs.map((tab) => (
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
    )
}
