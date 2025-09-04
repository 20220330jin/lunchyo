import {NextRequest, NextResponse} from "next/server";
import {CreateMenuRequest} from "@/modules/admin/types/admin.api.type";
import {db} from "@/db";
import {menus} from "@/db/schema";

export async function POST(request: NextRequest) {
    try {
        const body: CreateMenuRequest = await request.json();
        if (!body.name || !body.categoryId) {
            return NextResponse.json({message: 'Name, Category are Required'}, {status: 400});
        }

        const newMenu = await db.insert(menus).values({
            name: body.name,
            category: body.categoryId,
            description: body.description,
            image: body.image,
        }).returning();

        return NextResponse.json({message: 'Successfully created menu', menu: newMenu});
    } catch (error) {
        console.error("Error creating Menu", error);
        return NextResponse.json({message: 'Error creating Menu', error}, {status: 500});
    }
}
