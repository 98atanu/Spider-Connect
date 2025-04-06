import { useAppSelector } from "../../store/index";
import CommentForm from "./CommentForm"; 

interface CommentThreadProps {
  postId: string;
  parentId?: string;
}

const CommentThread: React.FC<CommentThreadProps> = ({ postId, parentId }) => {
  
  const allComments = useAppSelector((state) => state.comments.comments);

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
          <CommentThread postId={postId} parentId={comment.id} />
          <CommentForm postId={postId} parentId={comment.id} />
        </div>
      ))}
      
      {!parentId && <CommentForm postId={postId} />}
    </div>
  );
};

export default CommentThread;
