import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const singers = await prisma.singers.findMany({});
  return NextResponse.json(singers);
}

export async function POST(request: Request, _params: any) {
  const { name, age, avatar, gender } = await request.json();
  const singer = await prisma.singers.create({
    data: {
      name,
      age,
      avatar,
      gender,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  return NextResponse.json(singer);
}
