import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(_request: Request, { params }: Params) {
  try {
    const singer = await prisma.singers.findUnique({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(singer);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        status: 500,
        message: error.message,
      });
    }
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await prisma.singers.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({
      message: "Singer deleted",
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        status: 500,
        message: error.message,
      });
    }
  }
}

export async function PUT(request: Request, { params }: Params) {
  const { name, age, avatar, gender } = await request.json();
  try {
    const singer = await prisma.singers.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        age,
        avatar,
        gender,
        updatedAt: new Date(),
      },
    });
    return NextResponse.json(singer);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        status: 500,
        message: error.message,
      });
    }
  }
}
