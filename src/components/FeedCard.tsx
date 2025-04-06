import React, { useState } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../store";
import { toggleLike } from "../store/slices/like-slice";
import { Post, deletePost } from "../store/slices/post-slice";
import CommentThread from "./comment-thread/CommentThread";
import UpdateCard from "./UpdateCard";

interface FeedCardProps {
  post: Post;
}

const FeedCard: React.FC<FeedCardProps> = ({ post }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const likes = useAppSelector((state) => state.likes[post.id] || []);
  const isLiked = user && likes.includes(user.email);

  const [showComments, setShowComments] = useState(false);
  const [updateModal, setUpdateModal] = useState(false); // ✅ Modal state

  const handleLike = () => {
    if (user) {
      dispatch(toggleLike({ postId: post.id, userEmail: user.email }));
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleDelete = () => {
    dispatch(deletePost(post.id));
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
    <div className="bg-slate-800 text-white rounded-2xl shadow-md p-4 mb-6 max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="font-semibold text-lg">{post.user.name}</p>
          <p className="text-xs text-slate-400">{timeAgo(post.createdAt)}</p>
        </div>
        {user?.email === post.user.email && (
  <div className="space-x-3 flex items-center">
    <button
      onClick={() => setUpdateModal(true)}
      className="text-slate-300 hover:text-indigo-400 text-xl hover:scale-105 cursor-pointer"
      title="Edit"
    >
      <MdEditSquare />
    </button>
    <button
      onClick={handleDelete}
      className="text-slate-300 hover:text-red-400 text-xl hover:scale-105 cursor-pointer"
      title="Delete"
    >
      <RiDeleteBin5Fill />
    </button>
  </div>
)}
      </div>

      {/* Image */}
      {post.image && (
        <div className="my-3 w-full h-[400px] sm:h-[500px] rounded-xl overflow-hidden">
          <img src={post.image} alt="Post" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Caption */}
      <p className="mb-4">{post.caption}</p>

      {/* Actions */}
      <div className="flex items-center space-x-6 text-slate-300 ">
        <button onClick={handleLike} className="flex items-center gap-1 hover:text-pink-400 transition cursor-pointer">
          <FaHeart className={isLiked ? "text-pink-500" : ""} />
          <span>{likes.length}</span>
        </button>
        <button onClick={toggleComments} className="flex items-center gap-1 hover:text-blue-400 transition cursor-pointer">
          <BiSolidMessageRounded />
          <span>Comment</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && <CommentThread postId={post.id} />}

      {/* Update Modal */}
      {updateModal && (
        <UpdateCard post={post} onClose={() => setUpdateModal(false)} />
      )}
    </div>
  );
};

export default FeedCard;
