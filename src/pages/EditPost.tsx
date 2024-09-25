import { redirect, useLoaderData } from 'react-router-dom';
import { updatePost } from '../api/posts';
import { postFormValidator } from '../helpers/postFormValidator';
import { getUsers } from '../api/users';
import { UserType, PostType } from '../types';
import { getPost } from '../api/posts';
import PostForm from '../components/PostForm';


const EditPost = () => {
  const { users, post } = useLoaderData() as { users: UserType[]; post: PostType };

  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <PostForm users={users} post={post} />
    </>
  );
};

const loader = async ({ params, request: { signal } }: { params: { id: string }; request: { signal: AbortSignal } }) => {
  const users = await getUsers({ signal });
  const post = await getPost(params.id, { signal });

  return { users, post };
};

const action = async ({ request, params }: { request: Request, params: { id: string } }) => {
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
