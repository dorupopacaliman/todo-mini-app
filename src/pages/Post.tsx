import { Link, useLoaderData } from 'react-router-dom';
import { getComments } from '../api/comments';
import { getPost } from '../api/posts';
import { getUser } from '../api/users';
import { PostType } from '../types';
interface Comment {
  id: number;
  email: string;
  body: string;
}

interface User {
  id: number;
  name: string;
}

interface LoaderData {
  post: PostType;
  comments: Comment[];
  user: User;
}

const Post = () => {
  const { post, comments, user } = useLoaderData() as LoaderData;

  return (
    <>
      <h1 className="page-title">{post.title}</h1>
      <span className="page-subtitle">
        By: <Link to={`/users/${user.id}`}>{user.name}</Link>
      </span>
      <div>{post.body}</div>
      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        {comments.map(comment => (
          <div className="card" key={comment.id}>
            <div className="card-body">
              <div className="text-sm mb-1">{comment.email}</div>
              {comment.body}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const postLoader = async ({
  params: { id },
  request: { signal },
}: {
  params: { id: string };
  request: { signal: AbortSignal };
}) => {
  const comments = getComments(id, { signal });
  const post = await getPost(id, { signal });
  const user = getUser(post.userId, { signal });

  return { post, comments: await comments, user: await user };
};

export const postRoute = {
  element: <Post />,
  loader: postLoader,
};
