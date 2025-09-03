import {GlobalHeader} from "@/components/global-header";
import {Navbar} from "@/components/layouts/navbar";

export default function MainLayout({children}: { children: React.ReactNode }) {
    return (
        <>
            <GlobalHeader/>
            <div>
                <Navbar/>
                {children}
            </div>
        </>
    )
}
