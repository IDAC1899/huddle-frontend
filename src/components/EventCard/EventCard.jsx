import { Link } from 'react-router';

const EventCard = ({ event }) => {
  // only "going" rsvps take up a spot
  const goingCount = event.rsvps.filter((rsvp) => rsvp.status === 'going').length;
  const isFull = goingCount >= event.capacity;

  // how much of the capacity is taken, used for the width of the bar
  const percentFull = Math.min((goingCount / event.capacity) * 100, 100);

  // split the date up for the ticket stub, like "9" and "Oct"
  const startsAt = new Date(event.starts_at);
  const day = startsAt.getDate();
  const month = startsAt.toLocaleString('en-GB', { month: 'short' });

  // "Fri 19:00" for the line under the title
  const weekday = startsAt.toLocaleString('en-GB', { weekday: 'short' });
  const time = startsAt.toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return (
    <Link to={`/events/${event.id}`} className="ticket">
      <article>
        <div className="ticket-stub">
          <span className="stub-day">{day}</span>
          <span className="stub-month">{month}</span>
        </div>

        <div className="ticket-body">
          <h2>{event.title}</h2>
          <p className="ticket-meta">{`${event.area}, ${weekday} ${time}`}</p>

          <div className="spots-bar">
            <div className={isFull ? 'spots-fill full' : 'spots-fill'} style={{ width: `${percentFull}%` }}></div>
          </div>
          <p className="ticket-count">{`${goingCount} of ${event.capacity} going`}</p>
        </div>

        {isFull && <span className="full-stamp">Full</span>}
      </article>
    </Link>
  );
};

export default EventCard;