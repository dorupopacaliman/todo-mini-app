import { Link } from 'react-router-dom';
import { Skeleton, SkeletonButton } from './Skeleton';

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className="card">
      <div className="card-header">{post.title}</div>
      <div className="card-body">
        <div className="card-preview-text">{post.body}</div>
      </div>
      <div className="card-footer">
        <Link className="btn" to={`/posts/${post.id}`}>
          View
        </Link>
      </div>
    </div>
  );
};

export default PostCard;

export const SkeletonPostCard = () => {
  return (
    <div className="card">
      <div className="card-header">
        <Skeleton short />
      </div>
      <div className="card-body">
        <div className="card-preview-text">
          <Skeleton short />
          <Skeleton short />
          <Skeleton short />
          <Skeleton short />
        </div>
      </div>
      <div className="card-footer">
        <SkeletonButton />
      </div>
    </div>
  );
};
