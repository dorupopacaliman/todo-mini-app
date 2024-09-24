import { useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();

  return (
    <>
      <h1>Error - Something went wrong</h1>
      {!import.meta.env.PROD && (
        <>
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </>
      )}
    </>
  );
};

export default Error;
