import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import z from "zod";
import { DEFAULT_TAKE, MAX_TAKE } from "@/features/dashboard/todos/constants";
import type { TodoModel } from "@/generated/prisma/models";

// https://www.prisma.io/docs/orm/prisma-client/queries/pagination

export async function GET(
  request: NextRequest
): Promise<NextResponse<TodoModel[] | unknown>> {
  try {
    const searchParams = request.nextUrl.searchParams;

    let take = Number(searchParams.get("take") ?? DEFAULT_TAKE);

    if (Number.isNaN(take) || !Number.isInteger(take) || take <= 0) {
      take = DEFAULT_TAKE;
    }

    // if (Number.isNaN(take) || !Number.isInteger(take) || take <= 0) {
    //   return NextResponse.json(
    //     { message: "Take tiene que ser un número entero" },
    //     { status: 404 }
    //   );
    // }

    if (take > MAX_TAKE) {
      take = MAX_TAKE;
    }

    const todos = await prisma.todo.findMany({ take });

    return NextResponse.json(todos);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
}

const postSchema = z.object({
  description: z.string(),
  complete: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const validatedData = postSchema.parse(data);

    const createdTodo = await prisma.todo.create({ data: validatedData });

    return NextResponse.json(createdTodo);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(error.issues);

      return NextResponse.json(error.issues, { status: 400 });
    }

    console.error(error);
    return NextResponse.json(error);
  }
}

export async function DELETE() {
  try {
    const deletedCompletedTodos = await prisma.todo.deleteMany({
      where: { complete: true },
    });

    console.log(deletedCompletedTodos);

    return NextResponse.json({
      message: `${deletedCompletedTodos.count} todos deleted`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
}
