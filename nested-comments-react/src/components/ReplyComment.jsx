import { useState } from "react";

/**
 * Form component capturing user reply text and submitting to parent ID
 */
const ReplyComment = ({ setShowReplyBox, addComment, parentId }) => {
  const [replyText, setReplyText] = useState("");

  const handleAddReply = () => {
    if (!replyText.trim()) return;

    // Call custom hook action to create comment entry
    addComment(replyText, parentId);

    // Reset input state and hide input panel
    setReplyText("");
    setShowReplyBox(false);
  };

  return (
    <div className="reply-container">
      <input
        type="text"
        className="reply-input"
        placeholder="Write a reply..."
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAddReply();
        }}
        autoFocus
      />
      <button className="reply-add-btn" onClick={handleAddReply}>
        Add Reply
      </button>
    </div>
  );
};

export default ReplyComment;
