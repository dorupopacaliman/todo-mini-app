import React, { useEffect, useRef } from 'react';
import { Form, Link, useLoaderData, useSubmit } from 'react-router-dom';
import { getPosts } from '../api/posts';
import { getUsers } from '../api/users';
import FormGroup from '../components/FormGroup';
import PostCard from '../components/PostCard';
import { PostType, UserType } from '../types';

const PostList = () => {
  const {
    posts,
    users,
    searchParams: { query, userId },
  } = useLoaderData() as {
    posts: PostType[];
    users: UserType[];
    searchParams: { query: string; userId: string };
  };
  const submit = useSubmit();

  const queryRef = useRef<HTMLInputElement>(null);
  const userIdRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (queryRef.current) {
      queryRef.current.value = query ?? '';
    }
  }, [query]);

  useEffect(() => {
    if (userIdRef.current) {
      userIdRef.current.value = userId ?? '';
    }
  }, [userId]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const queryValue = formData.get('query') as string;
    const userIdValue = formData.get('userId') as string;

    if (!queryValue) {
      formData.delete('query');
    }
    if (!userIdValue) {
      formData.delete('userId');
    }

    submit(formData, { method: 'get' });
  };

  return (
    <React.Fragment>
      <h1 className="page-title">
        Posts
        <div className="title-btns">
          <Link className="btn btn-outline" to="/posts/new">
            New
          </Link>
        </div>
      </h1>

      <Form method="get" className="form mb-4" onSubmit={onSubmit}>
        <div className="form-row">
          <FormGroup label="Query" htmlFor="query">
            <input type="search" name="query" id="query" ref={queryRef} />
          </FormGroup>
          <FormGroup label="Author" htmlFor="userId">
            <select name="userId" id="userId" ref={userIdRef}>
              <option value="">Any</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </FormGroup>
          <button className="btn">Filter</button>
        </div>
      </Form>

      <div className="card-grid">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </React.Fragment>
  );
};

const loader = async ({ request: { signal, url } }: { request: { signal: AbortSignal; url: string } }) => {
  const searchParams = new URL(url).searchParams;

  const query = searchParams.get('query');
  const userId = searchParams.get('userId');

  const filterParams = { q: query, userId };

  const posts = getPosts({ signal, params: filterParams });
  const users = getUsers({ signal });

  return { posts: await posts, users: await users, searchParams: { query, userId } };
};

export const postListRoute = {
  element: <PostList />,
  loader: loader,
};
