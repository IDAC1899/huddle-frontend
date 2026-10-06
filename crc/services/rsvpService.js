// src/services/rsvpService.js

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;

const create = async (eventId, rsvpFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/events/${eventId}/rsvps`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rsvpFormData),
    });

    const data = await res.json();

    // errors like "This event is full" come back as detail
    if (data.detail) {
      throw new Error(data.detail);
    }

    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

const update = async (rsvpId, rsvpFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/rsvps/${rsvpId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rsvpFormData),
    });

    const data = await res.json();

    // switching to going can also fail if the event is full
    if (data.detail) {
      throw new Error(data.detail);
    }

    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

const deleteRsvp = async (rsvpId) => {
  try {
    // delete sends back 204 with no body, so no res.json()
    await fetch(`${BASE_URL}/rsvps/${rsvpId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  create,
  update,
  deleteRsvp as delete,
};