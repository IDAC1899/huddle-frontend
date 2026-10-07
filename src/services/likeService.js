// src/services/likeService.js

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;

const create = async (commentId) => {
  try {
    const res = await fetch(`${BASE_URL}/comments/${commentId}/likes`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    const data = await res.json();

    // errors like "You can't like your own comment" come back as detail
    if (data.detail) {
      throw new Error(data.detail);
    }

    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

const deleteLike = async (likeId) => {
  try {
    // delete sends back 204 with no body, so no res.json()
    await fetch(`${BASE_URL}/likes/${likeId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  create,
  deleteLike as delete,
};