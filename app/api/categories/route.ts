import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.categories.findMany({
      where: {
        delYn: false,
      },
      select: {
        id: true,
        name: true,
        emoji: true,
        description: true,
      },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Failed" }, { status: 500 });
  }
}
