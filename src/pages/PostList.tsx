import { useLoaderData } from 'react-router-dom';
import { getPosts } from '../api/posts';
import PostCard from '../components/PostCard';
import { PostType } from '../types';

const PostList = () => {
  const posts = useLoaderData() as PostType[];

  return (
    <>
      <h1 className="page-title">Posts</h1>
      <div className="card-grid">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

const postListLoader = async ({ request: { signal } }: { request: { signal: AbortSignal } }) => {
  return await getPosts({ signal });
};

export const postListRoute = {
  element: <PostList />,
  loader: postListLoader,
};
