"use server";

import prisma from "@/lib/prisma";
import type {
  CreateTodoPayload,
  UpdateTodoPayload,
} from "@/features/dashboard/todos/types";
import { revalidatePath } from "next/cache";
import type { TodoModel } from "@/generated/prisma/models";
import { DEFAULT_TAKE, MAX_TAKE } from "@/features/dashboard/todos/constants";
import type { ActionResponsePromise } from "@/features/dashboard/types";

export const getTodos = async (
  takeParam?: string
): ActionResponsePromise<TodoModel[]> => {
  try {
    let take = Number(takeParam ?? DEFAULT_TAKE);

    if (Number.isNaN(take) || !Number.isInteger(take) || take <= 0) {
      take = DEFAULT_TAKE;
    }

    if (take > MAX_TAKE) {
      take = MAX_TAKE;
    }

    const todos = await prisma.todo.findMany({ take });

    return { success: true, data: todos, status: 200 };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error inesperado al obtener todos",
      status: 500,
    };
  }
};

export const createTodo = async (
  todo: CreateTodoPayload
): ActionResponsePromise<TodoModel> => {
  try {
    console.log("START - createTodo");

    const { description } = todo;

    const createdTodo = await prisma.todo.create({ data: { description } });

    console.log("END - createTodo", createdTodo);

    revalidatePath("/dashboard/server-actions-todo");

    return { success: true, data: createdTodo, status: 201 };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error inesperado al crear un Todo",
      status: 500,
    };
  }
};

export const updateTodo = async (
  todo: UpdateTodoPayload
): ActionResponsePromise<TodoModel> => {
  try {
    const updatedTodo = await prisma.todo.update({
      where: { id: todo.id },
      data: { description: todo.description, complete: todo.complete },
    });

    revalidatePath("/dashboard/server-actions-todo");

    return { success: true, data: updatedTodo, status: 200 };
  } catch (error) {
    if (error && typeof error === "object" && "code" in error) {
      if (error?.code === "P2025") {
        console.error(error);

        return {
          success: false,
          message: `Todo con id ${todo.id} no existe.`,
          status: 404,
        };
      }
    }

    console.error(error);

    return {
      success: false,
      message: "Error inesperado al actualizar un Todo",
      status: 500,
    };
  }
};

export const deleteCompletedTodo =
  async (): ActionResponsePromise<TodoModel> => {
    try {
      const deletedCompletedTodos = await prisma.todo.deleteMany({
        where: { complete: true },
      });

      revalidatePath("/dashboard/server-actions-todo");

      return {
        success: true,
        message: `${deletedCompletedTodos.count} todos eliminados`,
        status: 200,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Error inesperado al crear un Todo",
        status: 500,
      };
    }
  };
