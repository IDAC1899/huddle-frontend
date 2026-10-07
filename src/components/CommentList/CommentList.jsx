import CommentCard from '../CommentCard/CommentCard';

const CommentList = ({ comments, eventId, currentUserId, handleDeleteComment, handleLike, handleUnlike }) => {
  return (
    <>
      {!comments.length && <p className="empty">No comments yet.</p>}
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          eventId={eventId}
          currentUserId={currentUserId}
          handleDeleteComment={handleDeleteComment}
          handleLike={handleLike}
          handleUnlike={handleUnlike}
        />
      ))}
    </>
  );
};

export default CommentList;