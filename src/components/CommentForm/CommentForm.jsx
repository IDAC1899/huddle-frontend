import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

// Services
import * as commentService from '../../services/commentService';

// Helpers
import { readImage, MAX_IMAGE_SIZE } from '../../lib/helpers/image-helpers';

const CommentForm = ({ handleAddComment }) => {
  const { eventId, commentId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({ content: '', image: '' });

  useEffect(() => {
    const fetchComment = async () => {
      const commentData = await commentService.show(commentId);
      // comments without a photo come back as null
      setFormData({ content: commentData.content, image: commentData.image || '' });
    };
    // only fetch when editing an existing comment
    if (commentId) fetchComment();
  }, [commentId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleImageChange = async (evt) => {
    setMessage('');
    const file = evt.target.files[0];
    if (!file) return;

    // keep photos small so the event page stays quick
    if (file.size > MAX_IMAGE_SIZE) {
      setMessage('Please choose a photo under 2MB');
      evt.target.value = '';
      return;
    }

    const image = await readImage(file);
    setFormData({ ...formData, image });
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, image: '' });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (eventId && commentId) {
      await commentService.update(commentId, formData);
      navigate(`/events/${eventId}`);
    } else {
      handleAddComment(formData);
    }
    setFormData({ content: '', image: '' });
  };

  return (
    <form onSubmit={handleSubmit} className={commentId ? 'comment-form edit-page' : 'comment-form'}>
      {commentId && <h1>Edit Comment</h1>}
      <label htmlFor='content-input'>{commentId ? 'Your comment' : 'Add a comment'}</label>
      <textarea
        required
        name='content'
        id='content-input'
        value={formData.content}
        onChange={handleChange}
      />

      {message && <p className="error">{message}</p>}

      <div className="comment-form-row">
        {formData.image ? (
          <div className='image-preview small'>
            <img src={formData.image} alt='Comment photo preview' />
            <button type='button' onClick={handleRemoveImage}>Remove photo</button>
          </div>
        ) : (
          <label className="photo-picker">
            Add a photo
            <input type='file' accept='image/*' onChange={handleImageChange} />
          </label>
        )}
        <button type='submit'>{commentId ? 'UPDATE COMMENT' : 'POST'}</button>
      </div>
    </form>
  );
};

export default CommentForm;