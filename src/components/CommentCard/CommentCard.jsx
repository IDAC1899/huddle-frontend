import { Link } from 'react-router';

const CommentCard = ({ comment, eventId, currentUserId, handleDeleteComment, handleLike, handleUnlike }) => {
  // turn the created_at date into something readable like "7 Oct, 10:30"
  const postedAt = new Date(comment.created_at).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  // your own comments sit on the right, like a chat
  const isMine = comment.user.id === currentUserId;

  // the signed in user's like on this comment, if they liked it
  const likeInComment = comment.likes.find((like) => like.user_id === currentUserId);

  return (
    <article className={isMine ? 'comment mine' : 'comment'}>
      <header>
        <p className="comment-author">{comment.user.username}</p>
        <p className="comment-time">{postedAt}</p>
      </header>
      <p className="comment-content">{comment.content}</p>
      {comment.image && <img src={comment.image} alt="" className="comment-image" />}

      <div className="comment-footer">
        {isMine ? (
          // you can't like your own comment, so just show the count
          <span className="like-count">{`♥ ${comment.likes.length}`}</span>
        ) : (
          <button
            className={likeInComment ? 'like-button liked' : 'like-button'}
            aria-label={likeInComment ? 'Unlike comment' : 'Like comment'}
            onClick={() => (likeInComment ? handleUnlike(comment.id, likeInComment.id) : handleLike(comment.id))}
          >
            {`♥ ${comment.likes.length}`}
          </button>
        )}

        {isMine && (
          <div className="comment-actions">
            <Link to={`/events/${eventId}/comments/${comment.id}/edit`}>Edit</Link>
            <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
          </div>
        )}
      </div>
    </article>
  );
};

export default CommentCard;