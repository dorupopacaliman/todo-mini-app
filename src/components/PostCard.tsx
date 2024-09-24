import { Link } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className="card" key={post.id}>
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
