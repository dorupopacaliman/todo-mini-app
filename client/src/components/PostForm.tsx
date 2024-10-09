import { Suspense } from 'react';
import { Await, Form, Link, useActionData, useNavigation } from 'react-router-dom';
import { PostType, UserType } from '../types';
import FormGroup from './FormGroup';
import { SkeletonInput } from './Skeleton';

const PostForm = ({
  usersPromise,
  postPromise,
}: {
  usersPromise: Promise<UserType[]>;
  postPromise?: Promise<PostType>;
}) => {
  const actionData = useActionData() as { [key: string]: string } | undefined;
  const { state } = useNavigation();

  const isSubmitting = state === 'loading' || state === 'submitting';

  return (
    <Form method="post" className="form">
      <div className="form-row">
        <FormGroup label="Title" error={actionData?.title} htmlFor="title">
          <Suspense fallback={<SkeletonInput />}>
            <Await resolve={postPromise}>
              {(post: PostType) => <input type="text" name="title" id="title" defaultValue={post?.title} />}
            </Await>
          </Suspense>
        </FormGroup>
        <FormGroup label="Author" htmlFor="userId">
          <Suspense fallback={<SkeletonInput />}>
            <Await resolve={postPromise}>
              {(post: PostType) => (
                <Suspense
                  fallback={
                    <select name="userId" id="userId" disabled>
                      <option value="">Loading...</option>
                    </select>
                  }
                >
                  <Await resolve={usersPromise}>
                    {(users: UserType[]) => (
                      <select name="userId" id="userId" defaultValue={post?.userId}>
                        {users.map(user => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </Await>
                </Suspense>
              )}
            </Await>
          </Suspense>
        </FormGroup>
      </div>
      <div className="form-row">
        <FormGroup label="Body" error={actionData?.body} htmlFor="body">
          <Suspense fallback={<SkeletonInput />}>
            <Await resolve={postPromise}>
              {(post: PostType) => <textarea name="body" id="body" defaultValue={post?.body} />}
            </Await>
          </Suspense>
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
