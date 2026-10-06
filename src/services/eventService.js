// src/services/eventService.js

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;

const index = async () => {
  try {
    const res = await fetch(`${BASE_URL}/events`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const show = async (eventId) => {
  try {
    const res = await fetch(`${BASE_URL}/events/${eventId}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (eventFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/events`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const update = async (eventId, eventFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/events/${eventId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteEvent = async (eventId) => {
  try {
    // delete sends back 204 with no body, so no res.json()
    await fetch(`${BASE_URL}/events/${eventId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  } catch (error) {
    console.log(error);
  }
};

// the events the signed in user is hosting and going to
const myEvents = async () => {
  try {
    const res = await fetch(`${BASE_URL}/my-events`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export {
  index,
  show,
  create,
  update,
  deleteEvent as delete,
  myEvents,
};