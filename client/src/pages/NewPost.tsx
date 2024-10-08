import { defer, redirect, useLoaderData } from 'react-router-dom';

import { addPost } from '../api/posts';
import { getUsers } from '../api/users';
import PostForm from '../components/PostForm';
import { postFormValidator } from '../helpers/postFormValidator';
import { UserType } from '../types';
const NewPost = () => {
  const { usersPromise } = useLoaderData() as { usersPromise: Promise<UserType[]> };

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <PostForm usersPromise={usersPromise} />
    </>
  );
};

const loader = async ({ request: { signal } }: { request: { signal: AbortSignal } }) => {
  const users = getUsers({ signal });

  return defer({ usersPromise: users });
};

const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const title = formData.get('title');
  const userId = formData.get('userId');
  const body = formData.get('body');

  const errors = postFormValidator({ title, body });
  if (Object.values(errors).some(error => error !== '')) {
    return errors;
  }

  const signal = request.signal;
  const response = await addPost({ title, userId, body }, { signal: signal });

  return redirect(`/posts/${response.id}`);
};

export const newPostRouter = {
  element: <NewPost />,
  loader,
  action,
};
