// src/services/commentService.js

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;

const show = async (commentId) => {
  try {
    const res = await fetch(`${BASE_URL}/comments/${commentId}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (eventId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/events/${eventId}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const update = async (commentId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteComment = async (commentId) => {
  try {
    // delete sends back 204 with no body, so no res.json()
    await fetch(`${BASE_URL}/comments/${commentId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  show,
  create,
  update,
  deleteComment as delete,
};