// import {HomeNavbar} from "@/modules/home/ui/components/home-navbar";

interface HomeLayoutProps {
    children: React.ReactNode;
}

export const HomeLayout = ({children}: HomeLayoutProps) => {
    return (
        <div>
            <div className="">
                {/*<HomeNavbar/>*/}
                <main>{children}</main>
            </div>
        </div>
    )
}
