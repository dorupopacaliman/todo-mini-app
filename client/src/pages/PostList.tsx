import React, { Suspense, useEffect, useRef } from 'react';
import { Await, defer, Form, Link, useLoaderData, useNavigation, useSubmit } from 'react-router-dom';
import { getPosts } from '../api/posts';
import { getUsers } from '../api/users';
import FormGroup from '../components/FormGroup';
import PostCard, { SkeletonPostCard } from '../components/PostCard';
import { SkeletonList } from '../components/Skeleton';
import { PostType, UserType } from '../types';

const PostList = () => {
  const {
    postsPromise,
    usersPromise,
    searchParams: { query, userId },
  } = useLoaderData() as {
    postsPromise: Promise<PostType[]>;
    usersPromise: Promise<UserType[]>;
    searchParams: { query: string; userId: string };
  };
  const submit = useSubmit();

  const queryRef = useRef<HTMLInputElement>(null);
  const { state } = useNavigation();
  const isLoading = state === 'loading';

  useEffect(() => {
    if (queryRef.current) {
      queryRef.current.value = query ?? '';
    }
  }, [query]);

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
          <Link className="btn btn-outline" to="new">
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
            <Suspense
              fallback={
                <select name="userId" id="userId" disabled>
                  <option value="">Loading...</option>
                </select>
              }
            >
              <Await resolve={usersPromise}>
                {(users: UserType[]) => (
                  <select name="userId" id="userId" defaultValue={userId ?? ''}>
                    <option value="">Any</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                )}
              </Await>
            </Suspense>
          </FormGroup>
          <button className="btn">Filter</button>
        </div>
      </Form>

      {isLoading && <div className="mb-2">Loading...</div>}
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

  return defer({ postsPromise: posts, usersPromise: users, searchParams: { query, userId } });
};

export const postListRoute = {
  element: <PostList />,
  loader,
};
