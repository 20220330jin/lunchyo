import {GlobalHeader} from "@/components/global-header";
import {Navbar} from "@/components/layouts/navbar";
import {Toaster} from "react-hot-toast";

export default function MainLayout({children}: { children: React.ReactNode }) {
    return (
        <>
            <GlobalHeader/>
            <div>
                <Navbar/>
                {children}
                <Toaster />
            </div>
        </>
    )
}
