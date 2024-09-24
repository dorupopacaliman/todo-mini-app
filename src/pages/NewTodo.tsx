import { Form, Link, redirect, useActionData, useNavigation } from 'react-router-dom';
import { addTodo } from '../api/todos';

const NewTodo = () => {
  const actionData = useActionData() as string | undefined;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting' || navigation.state === 'loading';

  return (
    <>
      <h1 className="page-title">New Todo</h1>
      <Form className="form" method="post">
        {actionData && <div>{actionData}</div>}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" />
          </div>
        </div>
        <div className="form-btn-row form-row">
          <Link to=".." className="btn btn-outline">
            Back
          </Link>
          <button className="btn" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Create'}</button>
        </div>
      </Form>
    </>
  );
};

export default NewTodo;

export const newTodoRoute = {
  element: <NewTodo />,
  action: async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const title = formData.get('title');

    if (title === '') {
      return 'Title is required';
    }

    const signal = request.signal;
    await addTodo({ title, signal });

    return redirect('/todos');
  },
};
