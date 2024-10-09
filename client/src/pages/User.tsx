import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import { getUserPosts } from '../api/posts';
import { getUserTodos } from '../api/todos';
import { getUser } from '../api/users';
import PostCard, { SkeletonPostCard } from '../components/PostCard';
import { SimpleSkeletonText, Skeleton, SkeletonList } from '../components/Skeleton';
import { PostType, TodoType, UserType } from '../types';
import TodoItem from '../components/TodoItem';

const User = () => {
  const { userPromise, todosPromise, postsPromise } = useLoaderData() as {
    userPromise: Promise<UserType>;
    todosPromise: Promise<TodoType[]>;
    postsPromise: Promise<PostType[]>;
  };

  return (
    <>
      <h1 className="page-title">
        <SimpleSkeletonText resolve={userPromise}>{user => user.name}</SimpleSkeletonText>
      </h1>
      <div className="page-subtitle">
        <SimpleSkeletonText resolve={userPromise}>{user => user.email}</SimpleSkeletonText>
      </div>
      <div>
        <b>Company:</b> <SimpleSkeletonText resolve={userPromise}>{user => user.company.name}</SimpleSkeletonText>
      </div>
      <div>
        <b>Website:</b> <SimpleSkeletonText resolve={userPromise}>{user => user.website}</SimpleSkeletonText>
      </div>
      <div>
        <b>Address:</b>{' '}
        <SimpleSkeletonText resolve={userPromise}>
          {user => `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
        </SimpleSkeletonText>
      </div>
      <h3 className="mt-4 mb-2">Posts</h3>
      <div className="card-grid">
        <Suspense
          fallback={
            <SkeletonList length={10}>
              <SkeletonPostCard />
            </SkeletonList>
          }
        >
          <Await resolve={postsPromise}>
            {(posts: PostType[]) => posts.map(post => <PostCard key={post.id} post={post} />)}
          </Await>
        </Suspense>
      </div>
      <h3 className="mt-4 mb-2">Todos</h3>
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
            {(todos: TodoType[]) => todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
          </Await>
        </Suspense>
      </ul>
    </>
  );
};

const userLoader = async ({
  params,
  request: { signal },
}: {
  params: { id?: string };
  request: { signal: AbortSignal };
}) => {
  if (!params.id) {
    throw new Response('Not Found', { status: 404 });
  }

  const user = getUser(params.id, { signal });
  const todos = getUserTodos(params.id, { signal });
  const posts = getUserPosts(params.id, { signal });

  return defer({ userPromise: user, todosPromise: todos, postsPromise: posts });
};

export const userRoute = {
  element: <User />,
  loader: userLoader,
};
