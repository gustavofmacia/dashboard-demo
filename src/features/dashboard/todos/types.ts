import type { TodoModel } from "@/generated/prisma/models";

export type CreateTodoPayload = {
  description: TodoModel["description"];
};

export type UpdateTodoPayload = {
  id: TodoModel["id"];
  description?: TodoModel["description"];
  complete?: TodoModel["complete"];
};
