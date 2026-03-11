import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

export async function POST(
  request: Request, 
  { params }: { params: Promise<{ articleId: string }> }
) {
  try {
    const { userId } = await auth();
    const { articleId } = await params;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }


    const body = await request.json();

    const updatedArticle = await prisma.article.update({
      where: { id: articleId },
      data: { ...body }
    });

    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}