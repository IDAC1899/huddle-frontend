import { useEffect, useState } from 'react';

// Services
import * as eventService from '../../services/eventService';

// Components
import EventCard from '../EventCard/EventCard';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function getAllEvents() {
      try {
        const allEvents = await eventService.index();
        setEvents(allEvents);
      } catch (error) {
        console.log(error);
      }
    }

    getAllEvents();
  }, []);

  return (
    <main>
      <h1>Upcoming events</h1>
      {!events.length && <p>There are no events yet.</p>}
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </main>
  );
};

export default EventList;