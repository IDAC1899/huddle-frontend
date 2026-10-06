const AttendeeList = ({ rsvps }) => {
  // split the rsvps into going and maybe
  const goingRsvps = rsvps.filter((rsvp) => rsvp.status === 'going');
  const maybeRsvps = rsvps.filter((rsvp) => rsvp.status === 'maybe');

  return (
    <section>
      <h2>Who's going</h2>
      {!goingRsvps.length && <p>No one yet. Be the first!</p>}
      <ul>
        {goingRsvps.map((rsvp) => (
          <li key={rsvp.id}>{rsvp.user.username}</li>
        ))}
      </ul>

      {maybeRsvps.length > 0 && (
        <>
          <h3>Maybe</h3>
          <ul>
            {maybeRsvps.map((rsvp) => (
              <li key={rsvp.id}>{rsvp.user.username}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default AttendeeList;