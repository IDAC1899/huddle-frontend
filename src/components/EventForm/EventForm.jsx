import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

// Services
import * as eventService from '../../services/eventService';

// the areas people can pick from
const AREAS = ['Manama', 'Muharraq', 'Riffa', 'Isa Town', 'Seef', 'Juffair', 'Hamad Town', 'Sitra', 'Budaiya', 'Amwaj'];

const EventForm = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    area: '',
    starts_at: '',
    capacity: '',
  });

  useEffect(() => {
    const fetchEvent = async () => {
      const eventData = await eventService.show(eventId);
      setFormData({
        title: eventData.title,
        description: eventData.description,
        area: eventData.area,
        // the date input wants "2026-10-09T19:00", so cut off the seconds
        starts_at: eventData.starts_at.slice(0, 16),
        capacity: eventData.capacity,
      });
    };
    // only fetch when editing an existing event
    if (eventId) fetchEvent();
    // reset the form when leaving the edit page
    return () => setFormData({ title: '', description: '', area: '', starts_at: '', capacity: '' });
  }, [eventId]);

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    // the number input gives back a string, the api wants a number
    const eventData = { ...formData, capacity: Number(formData.capacity) };

    let savedEvent;
    if (eventId) {
      savedEvent = await eventService.update(eventId, eventData);
    } else {
      savedEvent = await eventService.create(eventData);
    }

    // errors like "Operation forbidden" come back as detail
    if (savedEvent.detail) {
      if (typeof savedEvent.detail === 'string') {
        setMessage(savedEvent.detail);
      } else {
        setMessage('Please check the form and try again');
      }
      return;
    }

    navigate(`/events/${savedEvent.id}`);
  };

  return (
    <main>
      <h1>{eventId ? 'Edit Event' : 'New Event'}</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title-input'>Title</label>
        <input
          required
          type='text'
          name='title'
          id='title-input'
          value={formData.title}
          onChange={handleChange}
        />

        <label htmlFor='description-input'>Description</label>
        <textarea
          required
          name='description'
          id='description-input'
          value={formData.description}
          onChange={handleChange}
        />

        <label htmlFor='area-input'>Area</label>
        <select
          required
          name='area'
          id='area-input'
          value={formData.area}
          onChange={handleChange}
        >
          <option value=''>Choose an area</option>
          {AREAS.map((area) => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>

        <label htmlFor='starts-at-input'>Date and time</label>
        <input
          required
          type='datetime-local'
          name='starts_at'
          id='starts-at-input'
          value={formData.starts_at}
          onChange={handleChange}
        />

        <label htmlFor='capacity-input'>Capacity</label>
        <input
          required
          type='number'
          min='1'
          name='capacity'
          id='capacity-input'
          value={formData.capacity}
          onChange={handleChange}
        />

        <button type='submit'>{eventId ? 'UPDATE EVENT' : 'CREATE EVENT'}</button>
        <button type='button' onClick={() => navigate(eventId ? `/events/${eventId}` : '/events')}>
          CANCEL
        </button>
      </form>
    </main>
  );
};

export default EventForm;