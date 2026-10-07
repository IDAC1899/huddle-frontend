import { Link } from 'react-router';

const EventCard = ({ event }) => {
  // only "going" rsvps take up a spot
  const goingCount = event.rsvps.filter((rsvp) => rsvp.status === 'going').length;
  const isFull = goingCount >= event.capacity;

  // turn "2026-10-09T19:00:00" into something readable like "Fri 9 Oct, 19:00"
  const startsAt = new Date(event.starts_at).toLocaleString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Link to={`/events/${event.id}`}>
      <article>
        <header>
          <h2>{event.title}</h2>
          {isFull && <span>Full</span>}
        </header>
        <p>{`${event.area} · ${startsAt}`}</p>
        <p>{`Going: ${goingCount} / ${event.capacity}`}</p>
      </article>
    </Link>
  );
};

export default EventCard;