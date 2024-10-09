import { defer, redirect, useLoaderData } from 'react-router-dom';
import { getPost, updatePost } from '../api/posts';
import { getUsers } from '../api/users';
import PostForm from '../components/PostForm';
import { postFormValidator } from '../helpers/postFormValidator';
import { PostType, UserType } from '../types';

const EditPost = () => {
  const { usersPromise, postPromise } = useLoaderData() as { usersPromise: Promise<UserType[]>; postPromise: Promise<PostType> };

  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <PostForm usersPromise={usersPromise} postPromise={postPromise} />
    </>
  );
};

const loader = async ({
  params,
  request: { signal },
}: {
  params: { id?: string };
  request: { signal: AbortSignal };
}) => {
  if (!params.id) {
    throw new Response('Not Found', { status: 404 });
  }

  const users = getUsers({ signal });
  const post = getPost(params.id, { signal });

  return defer({ usersPromise: users, postPromise: post });
};

const action = async ({ request, params }: { request: Request; params: { id?: string } }) => {
  if (!params.id) {
    throw new Response('Not Found', { status: 404 });
  }

  const formData = await request.formData();
  const title = formData.get('title');
  const userId = formData.get('userId');
  const body = formData.get('body');

  const errors = postFormValidator({ title, body });
  if (Object.values(errors).some(error => error !== '')) {
    return errors;
  }

  const signal = request.signal;
  const response = await updatePost(params.id, { title, userId, body }, { signal: signal });

  return redirect(`/posts/${response.id}`);
};

export const editPostRouter = {
  element: <EditPost />,
  loader,
  action,
};
