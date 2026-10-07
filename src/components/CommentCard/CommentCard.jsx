import { Link } from 'react-router';

const CommentCard = ({ comment, eventId, currentUserId, handleDeleteComment }) => {
  // turn the created_at date into something readable like "7 Oct, 10:30"
  const postedAt = new Date(comment.created_at).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <article>
      <header>
        <p>{`${comment.user.username} · ${postedAt}`}</p>
        {comment.user.id === currentUserId && (
          <>
            <Link to={`/events/${eventId}/comments/${comment.id}/edit`}>Edit</Link>
            <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
          </>
        )}
      </header>
      <p>{comment.content}</p>
    </article>
  );
};

export default CommentCard;