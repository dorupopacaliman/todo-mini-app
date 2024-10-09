import { Suspense } from 'react';
import { Await, defer, Link, NavLink, useLoaderData } from 'react-router-dom';
import { getComments } from '../api/comments';
import { getPost } from '../api/posts';
import { getUser } from '../api/users';
import { SimpleSkeletonText, Skeleton, SkeletonList } from '../components/Skeleton';
import { PostType, UserType } from '../types';

type Comment = {
  id: number;
  email: string;
  body: string;
};

type User = {
  id: number;
  name: string;
};

const Post = () => {
  const { postPromise, commentsPromise, userPromise } = useLoaderData() as {
    postPromise: Promise<PostType>;
    commentsPromise: Promise<Comment[]>;
    userPromise: Promise<User>;
  };

  return (
    <>
      <h1 className="page-title">
        <SimpleSkeletonText resolve={postPromise}>{post => post.title}</SimpleSkeletonText>
        <div className="title-btns">
          <NavLink className="btn btn-outline" to="edit">
            Edit
          </NavLink>
        </div>
      </h1>
      <span className="page-subtitle">
        By:{' '}
        <Suspense fallback={<Skeleton short inline />}>
          <Await resolve={userPromise}>{(user: UserType) => <Link to={`/users/${user.id}`}>{user.name}</Link>}</Await>
        </Suspense>
      </span>
      <Suspense
        fallback={
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        }
      >
        <Await resolve={postPromise}>{(post: PostType) => <div>{post.body}</div>}</Await>
      </Suspense>
      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        <Suspense
          fallback={
            <SkeletonList length={5}>
              <div className="card">
                <div className="card-body">
                  <div className="text-sm mb-1">
                    <Skeleton short />
                  </div>
                  <Skeleton />
                  <Skeleton />
                </div>
              </div>
            </SkeletonList>
          }
        >
          <Await resolve={commentsPromise}>
            {(comments: Comment[]) =>
              comments.map(comment => (
                <div className="card" key={comment.id}>
                  <div className="card-body">
                    <div className="text-sm mb-1">{comment.email}</div>
                    {comment.body}
                  </div>
                </div>
              ))
            }
          </Await>
        </Suspense>
      </div>
    </>
  );
};

const postLoader = async ({
  params: { id },
  request: { signal },
}: {
  params: { id?: string };
  request: { signal: AbortSignal };
}) => {
  if (!id) {
    throw new Response('Not Found', { status: 404 });
  }

  const comments = getComments(id, { signal });
  const post = getPost(id, { signal });

  return defer({
    postPromise: post,
    commentsPromise: comments,
    userPromise: post.then(post => getUser(post.userId.toString(), { signal })),
  });
};

export const postRoute = {
  element: <Post />,
  loader: postLoader,
};
