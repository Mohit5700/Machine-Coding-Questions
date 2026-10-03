import { useState } from "react";
import ReplyComment from "./ReplyComment";

/**
 * RECURSIVE COMPONENT: Renders individual comment node & its children
 */
const CommentBox = ({ comment, allComments, addComment, deleteComment }) => {
  // Toggle local visibility state for input form box
  const [showReplyBox, setShowReplyBox] = useState(false);

  const toggleReplyBox = () => {
    setShowReplyBox((prev) => !prev);
  };

  // Guard check: Prevent rendering broken or deleted child references
  if (!comment) return null;

  return (
    <div className="comment-container">
      {/* Primary Comment Card Header */}
      <div className="comment-header">
        <p className="comment-value">{comment.value}</p>

        <div className="comment-actions">
          {/* Toggle Reply Input form visibility */}
          <button className="reply-btn" onClick={toggleReplyBox}>
            {showReplyBox ? "Cancel" : "Reply"}
          </button>

          {/* Trigger Cascade Delete for this comment and all nested sub-replies */}
          <button
            className="delete-btn"
            onClick={() => deleteComment(comment.id)}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Conditional Reply Form Input Component */}
      {showReplyBox && (
        <ReplyComment
          setShowReplyBox={setShowReplyBox}
          addComment={addComment}
          parentId={comment.id}
        />
      )}

      {/* RECURSIVE STEP: Render child comments using normalized dictionary lookups */}
      <div className="nested-comments">
        {comment.children.map((childId) => (
          <CommentBox
            key={childId}
            comment={allComments[childId]} // O(1) hash map lookup
            allComments={allComments}
            addComment={addComment}
            deleteComment={deleteComment}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentBox;
