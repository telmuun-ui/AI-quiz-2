import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ articleId: string }> } 
) {
  try {

    const { articleId } = await params;

    const article = await prisma.article.findUnique({
      where: { id: articleId }, 
      include: { user: true, quizzes: true }, 
    });

    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Successful", article },
      { status: 200 });
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json(
      { message: "Failed" },
      { status: 500 }
    );
  }
}