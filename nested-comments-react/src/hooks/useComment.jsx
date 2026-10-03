import { useState } from "react";

/**
 * Custom hook to manage normalized comments tree data.
 * Data Structure: Hash Map (Dictionary) keyed by Comment ID.
 * Benefits: O(1) direct reads/updates without deep nested array loops.
 */
const useComment = (initialData) => {
  // Normalize state as a key-value dictionary object
  const [commentsMap, setCommentsMap] = useState(initialData.comments);

  /**
   * ADD COMMENT HANDLER
   * @param {string} textValue - Content of the new reply
   * @param {string|number} parentId - ID of the comment being replied to
   */
  const addComment = (textValue, parentId) => {
    const trimmedText = textValue.trim();
    if (!trimmedText) return;

    // Generate unique ID for new comment
    const newCommentId = crypto.randomUUID();

    const newCommentObj = {
      id: newCommentId,
      parentId: parentId,
      value: trimmedText,
      children: [], // Initialize with no replies
    };

    setCommentsMap((previousMap) => {
      const parentComment = previousMap[parentId];

      // Guard check: ensure parent exists before attaching reply
      if (!parentComment) return previousMap;

      return {
        ...previousMap,
        // 1. Add new comment entry to dictionary
        [newCommentId]: newCommentObj,
        // 2. Immutably append new ID to parent's 'children' ID array
        [parentId]: {
          ...parentComment,
          children: [...parentComment.children, newCommentId],
        },
      };
    });
  };

  /**
   * DELETE COMMENT HANDLER (CASCADE DELETE USING BFS)
   * Deletes target comment AND all nested sub-replies recursively
   * to avoid memory orphan nodes in normalized state.
   *
   * @param {string|number} targetId - ID of comment to remove
   */
  const deleteComment = (targetId) => {
    setCommentsMap((previousMap) => {
      const updatedMap = { ...previousMap };
      const targetComment = updatedMap[targetId];

      if (!targetComment) return previousMap;

      // STEP 1: Unlink target ID from parent comment's 'children' array
      const parentId = targetComment.parentId;
      if (parentId && updatedMap[parentId]) {
        updatedMap[parentId] = {
          ...updatedMap[parentId],
          children: updatedMap[parentId].children.filter(
            (childId) => childId !== targetId,
          ),
        };
      }

      // STEP 2: Breadth-First Search (BFS) to gather & delete all descendant sub-tree nodes
      const queue = [targetId];

      while (queue.length > 0) {
        const currentIdToDelete = queue.shift();
        const currentNode = updatedMap[currentIdToDelete];

        if (currentNode) {
          // Push all child IDs to queue before removing current node
          if (currentNode.children && currentNode.children.length > 0) {
            queue.push(...currentNode.children);
          }

          // Remove node from hash map
          delete updatedMap[currentIdToDelete];
        }
      }

      return updatedMap;
    });
  };

  return { commentsMap, addComment, deleteComment };
};

export default useComment;
