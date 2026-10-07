import CommentCard from '../CommentCard/CommentCard';

const CommentList = ({ comments, eventId, currentUserId, handleDeleteComment }) => {
  return (
    <>
      {!comments.length && <p>No comments yet.</p>}
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          eventId={eventId}
          currentUserId={currentUserId}
          handleDeleteComment={handleDeleteComment}
        />
      ))}
    </>
  );
};

export default CommentList;