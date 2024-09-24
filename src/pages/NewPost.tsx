import { Form, Link, redirect, useActionData, useLoaderData } from 'react-router-dom';
import { addPost } from '../api/posts';

import { getUsers } from '../api/users';
import { UserType } from '../types';
const NewPost = () => {
  const users = useLoaderData() as UserType[];
  const actionData = useActionData() as { type: string; message: string } | undefined;

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <Form method="post" className="form">
        <div className="form-row">
          <div className={`form-group ${actionData?.type === 'title' ? 'error' : ''}`}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
            {actionData?.type === 'title' && <div className="error-message">{actionData.message}</div>}
          </div>
          <div className={`form-group ${actionData?.type === 'userId' ? 'error' : ''}`}>
            <label htmlFor="userId">Author</label>
            <select name="userId" id="userId">
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {actionData?.type === 'userId' && <div className="error-message">{actionData.message}</div>}
          </div>
        </div>
        <div className="form-row">
          <div className={`form-group ${actionData?.type === 'body' ? 'error' : ''}`}>
            <label htmlFor="body">Body</label>
            <textarea name="body" id="body"></textarea>
            {actionData?.type === 'body' && <div className="error-message">{actionData.message}</div>}
          </div>
        </div>
        <div className="form-row form-btn-row">
          <Link className="btn btn-outline" to="..">
            Cancel
          </Link>
          <button className="btn">Save</button>
        </div>
      </Form>
    </>
  );
};

const newPostLoader = async ({ request: { signal } }: { request: { signal: AbortSignal } }) => {
  return await getUsers({ signal });
};

export const newPostRoute = {
  element: <NewPost />,
  loader: newPostLoader,
  action: async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const title = formData.get('title');
    const userId = formData.get('userId');
    const body = formData.get('body');

    if (title === '') {
      return { type: 'title', message: 'Required' };
    }
    if (body === '') {
      return { type: 'body', message: 'Required' };
    }

    if (userId === '') {
      return { type: 'userId', message: 'Required' };
    }

    const signal = request.signal;

    const response = await addPost({ title, userId, body }, { signal });

    return redirect(`/posts/${response.id}`);
  },
};
