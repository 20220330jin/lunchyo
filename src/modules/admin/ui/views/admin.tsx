import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Settings} from "lucide-react";

const Admin = () => {
    return (
        <div>
            <Tabs>
                <TabsList>
                    <TabsTrigger value='menu'>
                        <Settings/>
                        메뉴관리
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    )
}

export default Admin
