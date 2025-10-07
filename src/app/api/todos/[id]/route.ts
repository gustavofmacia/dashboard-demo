import prisma from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";
import z from "zod";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: Context) {
  const { id } = await params;

  const todo = await prisma.todo.findUnique({ where: { id: id } });

  if (!todo) {
    return NextResponse.json(
      { message: `Todo con ${id} no existe.` },
      { status: 404 }
    );
  }

  return NextResponse.json(todo);
}

const putSchema = z.object({
  description: z.string().optional(),
  complete: z.boolean().optional(),
});

export async function PUT(request: NextRequest, { params }: Context) {
  try {
    const { id } = await params;
    const data = await request.json();

    const validatedData = putSchema.parse(data);

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(error.issues);

      return NextResponse.json(error.issues, { status: 400 });
    }

    if (error && typeof error === "object" && "code" in error) {
      const { id } = await params;

      if (error.code === "P2025") {
        return NextResponse.json(
          { message: `Todo con id ${id} no existe.` },
          { status: 404 }
        );
      }

      return NextResponse.json(error);
    }

    return NextResponse.json(error);
  }
}
