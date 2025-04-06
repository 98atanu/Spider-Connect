import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/index";
import { addComment } from "../../store/slices/comment-slice";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs

interface CommentFormProps {
  postId: string;
  parentId?: string; // Optional, for nested comments
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, parentId }) => {
  const [content, setContent] = useState("");
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const handleCommentSubmit = () => {
    if (user && content.trim()) {
      const newComment = {
        id: uuidv4(),
        postId,
        content,
        user: { name: user.name, email: user.email },
        createdAt: new Date().toISOString(),
        parentId,
      };
      dispatch(addComment(newComment));
      setContent(""); // Clear input field after submission
    }
  };

  return (
    <div className="my-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 rounded-lg bg-slate-700 text-white placeholder-slate-400"
        placeholder="Write a comment..."
      />
      <div className="mt-2 flex justify-between items-center">
        <button
          onClick={handleCommentSubmit}
          className={`${
            parentId
              ? "text-sm text-indigo-400 underline hover:text-indigo-300"
              : "bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
          } transition`}
        >
          {parentId ? "Reply" : "Comment"}
        </button>
        {/* Optionally, add a cancel button for replies */}
        {parentId && (
          <button
            onClick={() => setContent("")}
            className="text-sm text-slate-300 hover:text-slate-100 underline"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentForm;
