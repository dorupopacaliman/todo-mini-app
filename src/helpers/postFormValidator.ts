export const postFormValidator = ({ title, body }: { title: FormDataEntryValue | null; body: FormDataEntryValue | null }) => {
  const errors: { [key: string]: string } = {
    title: '',
    body: '',
  };

  if (title?.toString().trim().length === 0) {
    errors.title = 'Title is required';
  }
  if (body?.toString().trim().length === 0) {
    errors.body = 'Body is required';
  }

  return errors;
};
