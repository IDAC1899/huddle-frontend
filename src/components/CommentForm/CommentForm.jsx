import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

// Services
import * as commentService from '../../services/commentService';

const CommentForm = ({ handleAddComment }) => {
  const { eventId, commentId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ content: '' });

  useEffect(() => {
    const fetchComment = async () => {
      const commentData = await commentService.show(commentId);
      setFormData({ content: commentData.content });
    };
    // only fetch when editing an existing comment
    if (commentId) fetchComment();
  }, [commentId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (eventId && commentId) {
      await commentService.update(commentId, formData);
      navigate(`/events/${eventId}`);
    } else {
      handleAddComment(formData);
    }
    setFormData({ content: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      {commentId && <h1>Edit Comment</h1>}
      <label htmlFor='content-input'>Your comment:</label>
      <textarea
        required
        name='content'
        id='content-input'
        value={formData.content}
        onChange={handleChange}
      />
      <button type='submit'>{commentId ? 'UPDATE COMMENT' : 'POST'}</button>
    </form>
  );
};

export default CommentForm;