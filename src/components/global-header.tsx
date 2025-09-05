'use client'
import {Button} from "@/components/ui/button";
import {ArrowLeft, Home, Menu, Settings} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";

export const GlobalHeader = () => {
    /**
     * Hooks
     */
    const router = useRouter();
    const pathname = usePathname();

    const isAdminPage = pathname.startsWith("/admin");
    const isHomePage = pathname === '/';
    return (
        <header className="container mx-auto px-4 max-w-md">
            <div className="flex items-center justify-between h-14">
                <div className="flex items-center gap-2">
                    {isAdminPage ? (
                        <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
                            <Home className="w-5 h-5"/>
                        </Button>
                    ) : !isHomePage && (
                        <Button variant="ghost" size="icon" onClick={() => router.back()}>
                            <ArrowLeft className="w-5 h-5"/>
                        </Button>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {isAdminPage ? (
                        <Button variant="ghost" size="icon">
                            <Menu className="w-5 h-5"/>
                        </Button>
                    ) : (
                        <>
                            <Button variant="ghost" size="icon">
                                <Menu className="w-5 h-5"/>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => router.push("/admin/menu")}>
                                <Settings className="w-5 h-5"/>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}
