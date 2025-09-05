import {NextRequest, NextResponse} from "next/server";
import {CreateMenuRequest} from "@/modules/admin/types/admin.api.type";
import {db} from "@/db";
import {menus} from "@/db/schema";
import {and, ilike} from "drizzle-orm";

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

export async function GET(request: NextRequest) {
    try {
        const name = request.nextUrl.searchParams.get("name");

        const conditions = [];

        if (name) {
            conditions.push(ilike(menus.name, `%${name}%`))
        }

        const query = db.select().from(menus);

        if (conditions.length > 0) {
            query.where(and(...conditions));
        }

        const result = await query;

        return NextResponse.json(result);

    } catch (error) {
        console.error("Error getting menu", error);
        return NextResponse.json({message: 'Error fetching menus'}, {status: 500})
    }
}
