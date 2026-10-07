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
      <h1 className="page-title">Welcome, {user.username}</h1>

      <section className="dashboard-section">
        <h2>Hosting</h2>
        {!hosting.length && (
          <p className="empty">
            You're not hosting anything yet. <Link to="/events/new">Post an event</Link>
          </p>
        )}
        <div className="ticket-grid">
          {hosting.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Your RSVPs</h2>
        {!attending.length && (
          <p className="empty">
            You haven't RSVP'd to anything yet. <Link to="/events">Browse events</Link>
          </p>
        )}
        <div className="ticket-grid">
          {attending.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;