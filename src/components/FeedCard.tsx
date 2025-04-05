import { Post } from "../store/slices/post-slice";

interface Props {
  post: Post;
}

const FeedCard = ({ post }: Props) => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
      <div className="text-slate-300 text-sm mb-2">{post.createdAt}</div>
      <div className="text-lg text-white font-semibold mb-4">{post.caption}</div>

      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="rounded-lg max-h-96 w-full object-cover border border-slate-600 mb-4"
        />
      )}

      <div className="text-sm text-slate-400">Posted by: {post.user.name}</div>
    </div>
  );
};

export default FeedCard;
