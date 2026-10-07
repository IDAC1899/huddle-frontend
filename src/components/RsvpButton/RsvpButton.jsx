const RsvpButton = ({ currentUserRsvp, handleRsvp, handleCancelRsvp }) => {
  // what the signed in user picked, or null if they haven't rsvp'd
  const currentStatus = currentUserRsvp ? currentUserRsvp.status : null;

  return (
    <div className="rsvp-buttons">
      <div className="rsvp-choice">
        <button
          className={currentStatus === 'going' ? 'going picked' : 'going'}
          onClick={() => handleRsvp('going')}
          disabled={currentStatus === 'going'}
        >
          Going
        </button>
        <button
          className={currentStatus === 'maybe' ? 'maybe picked' : 'maybe'}
          onClick={() => handleRsvp('maybe')}
          disabled={currentStatus === 'maybe'}
        >
          Maybe
        </button>
      </div>
      {currentUserRsvp && (
        <button className="cancel-rsvp" onClick={() => handleCancelRsvp(currentUserRsvp.id)}>Cancel RSVP</button>
      )}
    </div>
  );
};

export default RsvpButton;