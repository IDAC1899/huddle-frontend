import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';

// Services
import * as eventService from '../../services/eventService';

// Components
import EventCard from '../EventCard/EventCard';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [hosting, setHosting] = useState([]);
  const [attending, setAttending] = useState([]);

  useEffect(() => {
    async function getMyEvents() {
      try {
        const myEventsData = await eventService.myEvents();

        // an expired token sends back { detail } instead of the lists
        if (myEventsData.detail) {
          console.log(myEventsData.detail);
          return;
        }

        setHosting(myEventsData.hosting);
        setAttending(myEventsData.attending);
      } catch (error) {
        console.log(error);
      }
    }

    getMyEvents();
  }, []);

  return (
    <main>
      <h1>Welcome, {user.username}</h1>

      <section>
        <h2>Hosting</h2>
        {!hosting.length && (
          <p>
            You're not hosting anything yet. <Link to="/events/new">Post an event</Link>
          </p>
        )}
        {hosting.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </section>

      <section>
        <h2>Your RSVPs</h2>
        {!attending.length && (
          <p>
            You haven't RSVP'd to anything yet. <Link to="/events">Browse events</Link>
          </p>
        )}
        {attending.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </section>
    </main>
  );
};

export default Dashboard;