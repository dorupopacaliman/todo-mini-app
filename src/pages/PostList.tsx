import { Link, useLoaderData } from 'react-router-dom';
import { getPosts } from '../api/posts';
import { getUsers } from '../api/users';
import PostCard from '../components/PostCard';
import { PostType, UserType } from '../types';

const PostList = () => {
  const { posts, users } = useLoaderData() as { posts: PostType[]; users: UserType[] };

  return (
    <>
      <h1 className="page-title">
        Posts
        <div className="title-btns">
          <Link className="btn btn-outline" to="/posts/new">
            New
          </Link>
        </div>
      </h1>

      <form method="get" action="/posts" className="form mb-4">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="query">Query</label>
            <input type="search" name="query" id="query" />
          </div>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select name="userId" id="userId">
              <option value="">Any</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <button className="btn">Filter</button>
        </div>
      </form>

      <div className="card-grid">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

const postListLoader = async ({ request: { signal } }: { request: { signal: AbortSignal } }) => {
  const [posts, users] = await Promise.all([getPosts({ signal }), getUsers({ signal })]);

  const postsUserIds = posts.map(post => post.userId);
  const usersWithPosts = users.filter(user => postsUserIds.includes(user.id));
  return { posts, users: usersWithPosts };
};

export const postListRoute = {
  element: <PostList />,
  loader: postListLoader,
};
