// "use client";

import { TodoItem } from "@/features/dashboard/todos/components/TodoItem";
import { todosServerActions } from "@/features/dashboard/todos/actions";
import type { TodoModel } from "@/generated/prisma/models";

interface Props {
  todos: TodoModel[];
}

export const TodosGrid = ({ todos }: Props) => {
  // const router = useRouter();

  // const toggleTodo = async (todo: UpdateTodoPayload) => {
  //   await todosApi.updateTodo(todo);
  //   router.refresh();
  // };

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toogleTodo={todosServerActions.updateTodo}
          // toogleTodo={toggleTodo}
        />
      ))}
    </div>
  );
};
