"use client";

import type { UpdateTodoPayload } from "@/features/dashboard/todos/types";
import type { TodoModel } from "@/generated/prisma/models";
import { useState } from "react";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

interface Props {
  todo: TodoModel;
  toogleTodo: (todo: UpdateTodoPayload) => Promise<TodoModel | unknown>;
}

export const TodoItem = ({ todo, toogleTodo }: Props) => {
  const [loading, setLoading] = useState(false);

  const onToogleTodo = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await toogleTodo({
        id: todo.id,
        complete: !todo.complete,
      });
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex items-center gap-1 rounded-lg border border-dashed p-5 shadow-sm transition-all sm:gap-2 ${todo.complete ? "border-blue-500 bg-blue-50 line-through" : "border-red-500 bg-red-50"} `}
    >
      <button
        className={`cursor-pointer ${loading ? "animate-pulse" : ""}`}
        onClick={() => onToogleTodo()}
        disabled={loading}
      >
        {todo.complete ? (
          <IoCheckboxOutline size={30} />
        ) : (
          <IoSquareOutline size={30} />
        )}
      </button>

      <div className=""> {todo.description}</div>
    </div>
  );
};
