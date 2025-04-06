import { useAppSelector } from "../../store/index";
import CommentForm from "./CommentForm"; // Import the CommentForm component

interface CommentThreadProps {
  postId: string;
  parentId?: string; // Optional for nested comments
}

const CommentThread: React.FC<CommentThreadProps> = ({ postId, parentId }) => {
  // Get all comments from the state
  const allComments = useAppSelector((state) => state.comments.comments);

  // Filter the comments for the current post and parentId (to get nested comments)
  const comments = allComments.filter(
    (comment) => comment.postId === postId && comment.parentId === parentId
  );

  return (
    <div className="ml-4 pl-4 border-l border-slate-600">
      {comments.map((comment) => (
        <div key={comment.id} className="mb-4">
          <p className="text-sm text-slate-300">
            <strong>{comment.user.name}:</strong> {comment.content}
          </p>
          {/* Render nested comments */}
          <CommentThread postId={postId} parentId={comment.id} />
          {/* Button to reply to this comment */}
          <CommentForm postId={postId} parentId={comment.id} />
        </div>
      ))}
      
      {/* Form to add new comments */}
      {!parentId && <CommentForm postId={postId} />}
    </div>
  );
};

export default CommentThread;
