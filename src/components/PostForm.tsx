import { Form, Link, useActionData, useNavigation } from 'react-router-dom';
import { PostType, UserType } from '../types';
import FormGroup from './FormGroup';

const PostForm = ({ users, post }: { users: UserType[]; post?: PostType }) => {
  const actionData = useActionData() as { [key: string]: string } | undefined;
  const { state } = useNavigation();

  const isSubmitting = state === 'loading' || state === 'submitting';

  return (
    <Form method="post" className="form">
      <div className="form-row">
        <FormGroup label="Title" error={actionData?.title}>
          <input type="text" name="title" id="title" defaultValue={post?.title} />
        </FormGroup>
        <FormGroup label="Author">
          <select name="userId" id="userId" defaultValue={post?.userId}>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </FormGroup>
      </div>
      <div className="form-row">
        <FormGroup label="Body" error={actionData?.body}>
          <textarea name="body" id="body" defaultValue={post?.body} />
        </FormGroup>
      </div>
      <div className="form-row form-btn-row">
        <Link className="btn btn-outline" to="..">
          Cancel
        </Link>
        <button className="btn" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save'}
        </button>
      </div>
    </Form>
  );
};

export default PostForm;
