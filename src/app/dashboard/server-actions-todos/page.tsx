import { NewTodo, TodosGrid } from "@/features/dashboard/todos";
import { todosServerActions } from "@/features/dashboard/todos/actions";
import type { SearchParams } from "next/dist/server/request/search-params";

interface Props {
  searchParams: Promise<{ take: string } & SearchParams>;
}

export default async function ServerActionsTodo({ searchParams }: Props) {
  const { take } = await searchParams;

  const todos = await todosServerActions.getTodos(take);

  return (
    <div className="flex w-full flex-col gap-4 sm:w-4/5">
      <h1 className="mb-4 text-2xl">Server Actions</h1>

      <NewTodo />

      {todos.success && todos.data ? (
        <TodosGrid todos={todos.data} />
      ) : ( 
        <div className="text-red-500">Error loading todos</div>
      )}
    </div>
  );
}
