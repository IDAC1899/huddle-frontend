const AttendeeList = ({ rsvps }) => {
  // split the rsvps into going and maybe
  const goingRsvps = rsvps.filter((rsvp) => rsvp.status === 'going');
  const maybeRsvps = rsvps.filter((rsvp) => rsvp.status === 'maybe');

  return (
    <section className="attendees">
      <h2>Who's Going</h2>
      {!goingRsvps.length && <p className="empty">No one yet. Be the first!</p>}
      <ul>
        {goingRsvps.map((rsvp) => (
          <li key={rsvp.id}>
            {/* first letter of the username as a little avatar */}
            <span className="avatar">{rsvp.user.username[0]}</span>
            {rsvp.user.username}
          </li>
        ))}
      </ul>

      {maybeRsvps.length > 0 && (
        <>
          <h3>Maybe</h3>
          <ul className="maybe-list">
            {maybeRsvps.map((rsvp) => (
              <li key={rsvp.id}>
                <span className="avatar">{rsvp.user.username[0]}</span>
                {rsvp.user.username}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default AttendeeList;