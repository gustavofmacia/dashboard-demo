"use client";

import { todosServerActions } from "@/features/dashboard/todos/actions";
import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";

export const NewTodo = () => {
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const trimDescription = description.trim();
    if (trimDescription.length === 0) return;

    setLoading(true);
    try {
      await todosServerActions.createTodo({ description: trimDescription });
      setDescription("");
    } catch (error) {
      console.error("Failed to create todo:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCompletedTodos = async () =>
    await todosServerActions.deleteCompletedTodo();

  return (
    <form onSubmit={onSubmit} className="flex w-full justify-between">
      <div
        className={`flex gap-2 transition-all ${loading ? "animate-pulse" : ""}`}
      >
        <input
          type="text"
          onChange={(event) => setDescription(event.target.value)}
          value={description}
          className="w-6/12 rounded-lg border-2 border-gray-200 py-2 pr-3 pl-3 transition-all outline-none focus:border-sky-500"
          disabled={loading}
          placeholder="Descripción..."
        />

        <button
          disabled={loading}
          type="submit"
          className="flex cursor-pointer items-center justify-center rounded bg-sky-500 px-4 py-2 text-white transition-all hover:bg-sky-700"
        >
          Crear
        </button>
      </div>

      <button
        onClick={handleDeleteCompletedTodos}
        type="button"
        className="flex cursor-pointer items-center justify-center gap-2 rounded bg-red-400 p-2 text-white transition-all hover:bg-red-700"
      >
        <IoTrashOutline />
        Borrar completadas
      </button>
    </form>
  );
};
