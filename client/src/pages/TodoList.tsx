import { useEffect, useRef } from 'react';
import { Form, Link, useLoaderData, useNavigation } from 'react-router-dom';
import { getTodos } from '../api/todos';
import FormGroup from '../components/FormGroup';
import TodoItem from '../components/TodoItem';
import { TodoType } from '../types';

const TodoList = () => {
  const { todos, query } = useLoaderData() as { todos: TodoType[]; query: string };
  const { state } = useNavigation();
  const queryRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (queryRef.current) {
      queryRef.current.value = query;
    }
  }, [query]);

  return (
    <>
      <h1 className="page-title mb-2">
        Todos
        <div className="title-btns">
          <Link to="/todos/new" className="btn">
            New
          </Link>
        </div>
      </h1>

      <Form className="form">
        <div className="form-row">
          <FormGroup label="Search" htmlFor="query">
            <input type="search" id="query" name="query" ref={queryRef} />
          </FormGroup>
          <button className="btn">Search</button>
        </div>
      </Form>

      <ul>
        {state === 'loading' && <div className="loading">Loading...</div>}
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  );
};

const todoListLoader = async ({ request: { signal, url } }: { request: { signal: AbortSignal; url: string } }) => {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get('query') || '';

  return await getTodos({ signal, query });
};

export const todoListRoute = {
  element: <TodoList />,
  loader: todoListLoader,
};
