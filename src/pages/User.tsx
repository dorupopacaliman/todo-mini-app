import { useLoaderData } from 'react-router-dom';
import { getUserPosts } from '../api/posts';
import { getUserTodos } from '../api/todos';
import { getUser } from '../api/users';
import PostCard from '../components/PostCard';
import TodoItem from '../components/TodoItem';
import { PostType, TodoType, UserType } from '../types';

const User = () => {
  const { user, todos, posts } = useLoaderData() as { user: UserType, todos: TodoType[], posts: PostType[] };

  return (
    <>
      <h1 className="page-title">{user.name}</h1>
      <div className="page-subtitle">{user.email}</div>
      <div>
        <b>Company:</b> {user.company.name}
      </div>
      <div>
        <b>Website:</b> {user.website}
      </div>
      <div>
        <b>Address:</b> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
      </div>
      <h3 className="mt-4 mb-2">Posts</h3>
      <div className="card-grid">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  );
};

const userLoader = async ({
  params,
  request: { signal },
}: {
  params: { id: string };
  request: { signal: AbortSignal };
}) => {
  const [user, todos, posts] = await Promise.all([
    getUser(params.id, { signal }),
    getUserTodos(params.id, { signal }),
    getUserPosts(params.id, { signal }),
  ]);

  return { user, todos, posts };
};

export const userRoute = {
  element: <User />,
  loader: userLoader,
};
