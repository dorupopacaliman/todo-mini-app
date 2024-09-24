import { useLoaderData } from 'react-router-dom';
import { getTodos } from '../api/todos';
import { TodoType } from '../types';
import TodoItem from '../components/TodoItem';

const TodoList = () => {
  const todos = useLoaderData() as TodoType[];

  return (
    <>
      <h1 className="page-title">Todos</h1>
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  );
};

const todoListLoader = async ({ request: { signal } }: { request: { signal: AbortSignal } }) => {
  return await getTodos({ signal });
};

export const todoListRoute = {
  element: <TodoList />,
  loader: todoListLoader,
};
