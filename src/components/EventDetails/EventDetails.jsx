import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';

// Context
import { UserContext } from '../../contexts/UserContext';

// Services
import * as eventService from '../../services/eventService';
import * as rsvpService from '../../services/rsvpService';
import * as commentService from '../../services/commentService';
import * as likeService from '../../services/likeService';

// Components
import RsvpButton from '../RsvpButton/RsvpButton';
import AttendeeList from '../AttendeeList/AttendeeList';
import CommentForm from '../CommentForm/CommentForm';
import CommentList from '../CommentList/CommentList';
import SignUpPrompt from '../SignUpPrompt/SignUpPrompt';

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState('');
  // the popup asking guests to sign up
  const [showSignUpPrompt, setShowSignUpPrompt] = useState(false);

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

  const handleLike = async (commentId) => {
    // guests get asked to sign up instead
    if (!user) {
      setShowSignUpPrompt(true);
      return;
    }

    try {
      const newLike = await likeService.create(commentId);
      // add the like to the comment it belongs to
      setEvent({
        ...event,
        comments: event.comments.map((comment) =>
          comment.id === commentId ? { ...comment, likes: [...comment.likes, newLike] } : comment
        ),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async (commentId, likeId) => {
    await likeService.delete(likeId);
    // take the like off the comment it belongs to
    setEvent({
      ...event,
      comments: event.comments.map((comment) =>
        comment.id === commentId ? { ...comment, likes: comment.likes.filter((like) => like.id !== likeId) } : comment
      ),
    });
  };

  if (!event) return <main className="status">Loading ...</main>;

  // a bad id (like a guest going to /events/new) sends back a detail instead of an event
  if (event.detail) return <main className="status">Event not found</main>;

  // only "going" rsvps take up a spot
  const goingCount = event.rsvps.filter((rsvp) => rsvp.status === 'going').length;
  const isFull = goingCount >= event.capacity;

  // how much of the capacity is taken, used for the width of the bar
  const percentFull = Math.min((goingCount / event.capacity) * 100, 100);

  // the signed in user's rsvp, if they have one
  const currentUserRsvp = event.rsvps.find((rsvp) => rsvp.user.id === currentUserId);

  // split the date up for the stub, like "9" and "Oct"
  const startsAt = new Date(event.starts_at);
  const day = startsAt.getDate();
  const month = startsAt.toLocaleString('en-GB', { month: 'short' });

  // "Friday 19:00" for the line under the title
  const weekday = startsAt.toLocaleString('en-GB', { weekday: 'long' });
  const time = startsAt.toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return (
    <main className="event-page">
      {event.image && <img src={event.image} alt="" className="event-banner" />}

      <header className="event-hero">
        <div className="ticket-stub hero-stub">
          <span className="stub-day">{day}</span>
          <span className="stub-month">{month}</span>
        </div>
        <div className="hero-text">
          <h1>{event.title}</h1>
          <p className="hero-meta">{`${event.area}, ${weekday} ${time}`}</p>
          <p className="hero-host">{`Hosted by ${event.user.username}`}</p>
          {event.user.id === currentUserId && (
            <div className="owner-actions">
              <Link to={`/events/${eventId}/edit`} className="btn btn-outline btn-small">Edit</Link>
              <button onClick={handleDeleteEvent} className="btn btn-danger btn-small">Delete</button>
            </div>
          )}
        </div>
      </header>

      <div className="event-layout">
        <div className="event-main">
          <section className="event-description">
            <h2>About This Event</h2>
            <p>{event.description}</p>
          </section>

          <section className="comments">
            <h2>Comments</h2>
            <CommentList
              comments={event.comments}
              eventId={eventId}
              currentUserId={currentUserId}
              handleDeleteComment={handleDeleteComment}
              handleLike={handleLike}
              handleUnlike={handleUnlike}
            />
            {user ? (
              <CommentForm handleAddComment={handleAddComment} />
            ) : (
              <button className="btn btn-outline write-comment" onClick={() => setShowSignUpPrompt(true)}>
                Write a Comment
              </button>
            )}
          </section>
        </div>

        <aside className="event-side">
          <section className="rsvp-panel">
            <p className="rsvp-count">
              <span className={isFull ? 'count-number full' : 'count-number'}>{goingCount}</span>
              {` of ${event.capacity} going`}
            </p>
            <div className="spots-bar">
              <div className={isFull ? 'spots-fill full' : 'spots-fill'} style={{ width: `${percentFull}%` }}></div>
            </div>
            {user ? (
              <RsvpButton
                currentUserRsvp={currentUserRsvp}
                handleRsvp={handleRsvp}
                handleCancelRsvp={handleCancelRsvp}
              />
            ) : (
              <button className="btn btn-red rsvp-guest" onClick={() => setShowSignUpPrompt(true)}>
                RSVP
              </button>
            )}
            {message && <p className="error">{message}</p>}
          </section>

          <AttendeeList rsvps={event.rsvps} />
        </aside>
      </div>

      {showSignUpPrompt && <SignUpPrompt handleClose={() => setShowSignUpPrompt(false)} />}
    </main>
  );
};

export default EventDetails;