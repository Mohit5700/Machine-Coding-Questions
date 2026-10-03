import "./App.css";
import CommentBox from "./components/CommentBox";
import commentsData from "./utils/commentsData.json";
import useComment from "./hooks/useComment";

function App() {
  // Extract normalized state and actions from custom hook
  const { commentsMap, addComment, deleteComment } = useComment(commentsData);

  // Root comment ID in mock data is "1" (or 1)
  const rootComment = commentsMap[1];

  // Guard clause if root comment does not exist or has been deleted
  if (!rootComment) return <div>No comments available</div>;

  return (
    <div className="app-container">
      {/* Root comment kickstarts the recursive rendering tree */}
      <CommentBox
        comment={rootComment}
        allComments={commentsMap}
        addComment={addComment}
        deleteComment={deleteComment}
      />
    </div>
  );
}

export default App;
