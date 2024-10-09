import { Fragment, Suspense } from 'react';
import { Await } from 'react-router-dom';

export const Skeleton = ({ short, inline }: { short?: boolean; inline?: boolean }) => {
  return (
    <div
      className="skeleton"
      style={{
        width: short ? '15em' : undefined,
        display: inline ? 'inline-block' : undefined,
        verticalAlign: inline ? 'middle' : undefined,
      }}
    />
  );
};

export const SkeletonButton = () => {
  return <div className="skeleton skeleton-btn" />;
};

export const SkeletonInput = () => {
  return <div className="skeleton skeleton-input" />;
};

export const SkeletonList = ({ length, children }: { length: number; children: React.ReactNode }) => {
  return Array.from({ length }).map((_, index) => <Fragment key={index}>{children}</Fragment>);
};

export const SimpleSkeletonText = <T,>({
  resolve,
  children,
}: {
  resolve: Promise<T>;
  children: (data: T) => React.ReactNode;
}) => {
  return (
    <Suspense fallback={<Skeleton short inline />}>
      <Await resolve={resolve}>{children}</Await>
    </Suspense>
  );
};
