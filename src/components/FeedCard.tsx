import { FiHeart, FiMessageCircle } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../store";
import { toggleLike } from "../store/slices/like-slice";
import { Post } from "../store/slices/post-slice";

interface FeedCardProps {
  post: Post;
}

const FeedCard: React.FC<FeedCardProps> = ({ post }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const likes = useAppSelector((state) => state.likes[post.id] || []);
  const isLiked = user && likes.includes(user.email);

  const handleLike = () => {
    if (user) {
      dispatch(toggleLike({ postId: post.id, userEmail: user.email }));
    }
  };

  const timeAgo = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  return (
    <div className="bg-slate-800 text-white rounded-2xl shadow-md p-4 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="font-semibold text-lg">{post.user.name}</p>
          <p className="text-xs text-slate-400">{timeAgo(post.createdAt)}</p>
        </div>
      </div>

      {/* Image */}
      {post.image && (
  <div className="my-3 w-full h-[400px] sm:h-[500px] rounded-xl overflow-hidden">
    <img
      src={post.image}
      alt="Post"
      className="w-full h-full object-cover"
    />
  </div>
)}

      {/* Caption */}
      <p className="mb-4">{post.caption}</p>

      {/* Actions */}
      <div className="flex items-center space-x-6 text-slate-300">
        <button onClick={handleLike} className="flex items-center gap-1 hover:text-pink-400 transition">
          <FiHeart className={isLiked ? "text-pink-500" : ""} />
          <span>{likes.length}</span>
        </button>
        <button className="flex items-center gap-1 hover:text-blue-400 transition">
          <FiMessageCircle />
          <span>Comment</span>
        </button>
      </div>
    </div>
  );
};

export default FeedCard;
