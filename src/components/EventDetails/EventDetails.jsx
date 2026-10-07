import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';

// Context
import { UserContext } from '../../contexts/UserContext';

// Services
import * as eventService from '../../services/eventService';
import * as rsvpService from '../../services/rsvpService';
import * as commentService from '../../services/commentService';

// Components
import RsvpButton from '../RsvpButton/RsvpButton';
import AttendeeList from '../AttendeeList/AttendeeList';
import CommentForm from '../CommentForm/CommentForm';
import CommentList from '../CommentList/CommentList';

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState('');

  // the token stores the user's id as a string in "sub", guests have no user
  const currentUserId = user ? Number(user.sub) : null;

  useEffect(() => {
    async function getEvent() {
      try {
        const eventData = await eventService.show(eventId);
        setEvent(eventData);
      } catch (error) {
        console.log(error);
      }
    }

    getEvent();
  }, [eventId]);

  const handleDeleteEvent = async () => {
    await eventService.delete(eventId);
    navigate('/events');
  };

  const handleRsvp = async (status) => {
    setMessage('');
    try {
      // check if the signed in user already rsvp'd to this event
      const rsvpInEvent = event.rsvps.find((rsvp) => rsvp.user.id === currentUserId);

      if (rsvpInEvent) {
        // already rsvp'd, so switch between going and maybe
        const updatedRsvp = await rsvpService.update(rsvpInEvent.id, { status });
        setEvent({
          ...event,
          rsvps: event.rsvps.map((rsvp) => (rsvp.id === updatedRsvp.id ? updatedRsvp : rsvp)),
        });
      } else {
        const newRsvp = await rsvpService.create(eventId, { status });
        setEvent({ ...event, rsvps: [...event.rsvps, newRsvp] });
      }
    } catch (err) {
      // shows messages like "This event is full"
      setMessage(err.message);
    }
  };

  const handleCancelRsvp = async (rsvpId) => {
    setMessage('');
    await rsvpService.delete(rsvpId);
    setEvent({ ...event, rsvps: event.rsvps.filter((rsvp) => rsvp.id !== rsvpId) });
  };

  const handleAddComment = async (formData) => {
    const newComment = await commentService.create(eventId, formData);
    setEvent({ ...event, comments: [...event.comments, newComment] });
  };

  const handleDeleteComment = async (commentId) => {
    await commentService.delete(commentId);
    setEvent({
      ...event,
      comments: event.comments.filter((comment) => comment.id !== commentId),
    });
  };

  if (!event) return <main>Loading ...</main>;

  // the api sends back { detail: "Event not found" } for a bad id
  if (event.detail) return <main>{event.detail}</main>;

  // only "going" rsvps take up a spot
  const goingCount = event.rsvps.filter((rsvp) => rsvp.status === 'going').length;

  // the signed in user's rsvp, if they have one
  const currentUserRsvp = event.rsvps.find((rsvp) => rsvp.user.id === currentUserId);

  // turn "2026-10-09T19:00:00" into something readable like "Fri 9 Oct, 19:00"
  const startsAt = new Date(event.starts_at).toLocaleString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <main>
      <section>
        <header>
          <h1>{event.title}</h1>
          <p>{`Hosted by ${event.user.username}`}</p>
          <p>{`${event.area} · ${startsAt}`}</p>
          {event.user.id === currentUserId && (
            <>
              <Link to={`/events/${eventId}/edit`}>Edit</Link>
              <button onClick={handleDeleteEvent}>Delete</button>
            </>
          )}
        </header>
        <p>{event.description}</p>
      </section>

      <section>
        <p>{`${goingCount} / ${event.capacity} going`}</p>
        {user ? (
          <RsvpButton
            currentUserRsvp={currentUserRsvp}
            handleRsvp={handleRsvp}
            handleCancelRsvp={handleCancelRsvp}
          />
        ) : (
          <p>
            <Link to='/sign-in'>Sign in</Link> to RSVP.
          </p>
        )}
        {message && <p>{message}</p>}
      </section>

      <AttendeeList rsvps={event.rsvps} />

      <section>
        <h2>Comments</h2>
        {user ? (
          <CommentForm handleAddComment={handleAddComment} />
        ) : (
          <p>
            <Link to='/sign-in'>Sign in</Link> to comment.
          </p>
        )}
        <CommentList
          comments={event.comments}
          eventId={eventId}
          currentUserId={currentUserId}
          handleDeleteComment={handleDeleteComment}
        />
      </section>
    </main>
  );
};

export default EventDetails;