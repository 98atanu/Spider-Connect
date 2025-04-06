import React, { useState } from "react";
import { Post, updatePost } from "../store/slices/post-slice";
import { useAppDispatch } from "../store";

interface UpdateCardProps {
  post: Post;
  onClose: () => void;
}

const UpdateCard: React.FC<UpdateCardProps> = ({ post, onClose }) => {
  const dispatch = useAppDispatch();
  const [caption, setCaption] = useState(post.caption);

  const handleUpdate = () => {
    if (caption.trim() && caption !== post.caption) {
      dispatch(updatePost({ ...post, caption }));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 text-white p-6 rounded-2xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Post</h2>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full p-2 bg-slate-700 rounded-md mb-4"
          rows={4}
        />
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-600 rounded-md hover:bg-slate-500"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-indigo-500 rounded-md hover:bg-indigo-400"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCard;
