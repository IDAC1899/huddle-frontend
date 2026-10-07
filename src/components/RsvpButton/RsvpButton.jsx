const RsvpButton = ({ currentUserRsvp, handleRsvp, handleCancelRsvp }) => {
  // what the signed in user picked, or null if they haven't rsvp'd
  const currentStatus = currentUserRsvp ? currentUserRsvp.status : null;

  return (
    <div>
      <button onClick={() => handleRsvp('going')} disabled={currentStatus === 'going'}>
        Going
      </button>
      <button onClick={() => handleRsvp('maybe')} disabled={currentStatus === 'maybe'}>
        Maybe
      </button>
      {currentUserRsvp && (
        <button onClick={() => handleCancelRsvp(currentUserRsvp.id)}>Cancel RSVP</button>
      )}
    </div>
  );
};

export default RsvpButton;