'use client'
import {Tabs} from "@/components/ui/tabs";
import {HomeNavbar} from "@/modules/home/ui/components/home-navbar";
import {usePathname} from "next/navigation";
import {AdminNavbar} from "@/modules/admin/ui/components/admin-navbar";

export const Navbar = () => {
    const pathname = usePathname();

    if (pathname.startsWith("/admin")) {
        return (
            <Tabs defaultValue="dashboard" className="w-full">
                <AdminNavbar />
            </Tabs>
        )
    }
    return (
        <Tabs defaultValue="recommend" className="w-full">
            <HomeNavbar/>
        </Tabs>
    )
}
