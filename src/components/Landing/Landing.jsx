import { Link } from 'react-router';

const Landing = () => {
  return (
    <main>
      <h1>Huddle</h1>
      <p>Find something to do in Bahrain this week. Post an event, RSVP, and chat with everyone going.</p>
      <p>
        <Link to="/sign-up">Sign up</Link> or <Link to="/sign-in">sign in</Link> to join in.
      </p>
    </main>
  );
};

export default Landing;