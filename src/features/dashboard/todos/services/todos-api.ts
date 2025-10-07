import type {
  CreateTodoPayload,
  UpdateTodoPayload,
} from "@/features/dashboard/todos/types";
import { apiUrl } from "@/lib/config";
import type { TodoModel } from "@/generated/prisma/models";

const apiUrlClient = "/api/todos/";

export const getTodos = async () => {
  const resp = await fetch(`${apiUrl}/todos`, { cache: "no-cache" });

  const todos: TodoModel[] = await resp.json();

  return todos;
};

export const createTodo = async (todo: CreateTodoPayload) => {
  const body = JSON.stringify(todo);

  await fetch(apiUrlClient, {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateTodo = async (todo: UpdateTodoPayload) => {
  const body = JSON.stringify(todo);

  await fetch(`${apiUrlClient}${todo.id}`, {
    method: "PUT",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteCompletedTodos = async () => {
  await fetch(apiUrlClient, {
    method: "DELETE",
  });
};
