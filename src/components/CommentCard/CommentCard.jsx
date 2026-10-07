import { Link } from 'react-router';

const CommentCard = ({ comment, eventId, currentUserId, handleDeleteComment }) => {
  // turn the created_at date into something readable like "7 Oct, 10:30"
  const postedAt = new Date(comment.created_at).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  // your own comments sit on the right, like a chat
  const isMine = comment.user.id === currentUserId;

  return (
    <article className={isMine ? 'comment mine' : 'comment'}>
      <header>
        <p className="comment-author">{comment.user.username}</p>
        <p className="comment-time">{postedAt}</p>
      </header>
      <p className="comment-content">{comment.content}</p>
      {isMine && (
        <div className="comment-actions">
          <Link to={`/events/${eventId}/comments/${comment.id}/edit`}>Edit</Link>
          <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
        </div>
      )}
    </article>
  );
};

export default CommentCard;