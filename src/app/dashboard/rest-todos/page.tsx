import { NewTodo, TodosGrid } from "@/features/dashboard/todos";
import { todosApi } from "@/features/dashboard/todos/services/";

export default async function RestTodosPage() {
  const todos = await todosApi.getTodos();

  return (
    <div className="flex w-full flex-col gap-4 sm:w-4/5">
      <h1 className="mb-4 text-2xl">Rest API</h1>

      <NewTodo />

      <TodosGrid todos={todos} />
    </div>
  );
}
