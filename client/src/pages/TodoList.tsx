import { Suspense, useEffect, useRef } from 'react';
import { Await, defer, Form, Link, useLoaderData } from 'react-router-dom';
import { getTodos } from '../api/todos';
import FormGroup from '../components/FormGroup';
import { Skeleton, SkeletonList } from '../components/Skeleton';
import TodoItem from '../components/TodoItem';
import { TodoType } from '../types';

const TodoList = () => {
  const { todosPromise } = useLoaderData() as { todosPromise: { todos: TodoType[]; query: string } };

  const { query } = todosPromise;

  const queryRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (queryRef.current) {
      queryRef.current.value = query ?? '';
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
        <Suspense
          fallback={
            <SkeletonList length={10}>
              <li>
                <Skeleton short />
              </li>
            </SkeletonList>
          }
        >
          <Await resolve={todosPromise}>
            {(todosPromise: { todos: TodoType[]; query: string }) =>
              todosPromise.todos.map(todo => <TodoItem key={todo.id} todo={todo} />)
            }
          </Await>
        </Suspense>
      </ul>
    </>
  );
};

const todoListLoader = async ({ request: { signal, url } }: { request: { signal: AbortSignal; url: string } }) => {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get('query') || '';

  return defer({ todosPromise: getTodos({ signal, query }) });
};

export const todoListRoute = {
  element: <TodoList />,
  loader: todoListLoader,
};
