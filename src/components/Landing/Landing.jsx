import { Link } from 'react-router';

// the areas shown down the red side of the landing page
const AREAS = ['Manama', 'Muharraq', 'Riffa', 'Seef', 'Juffair', 'Amwaj'];

const Landing = () => {
  return (
    <main className="landing">
      <section className="landing-text">
        <h1>Something's on in Bahrain this week.</h1>
        <p>Post an event, RSVP, and chat with everyone going.</p>
        <div className="landing-links">
          <Link to="/sign-up" className="btn btn-red">Create an account</Link>
          <Link to="/sign-in" className="btn btn-outline">Sign in</Link>
        </div>
        <Link to="/events" className="text-link">Or just browse what's on</Link>
      </section>

      {/* the red side of the flag, listing areas like a poster */}
      <section className="landing-flag" aria-hidden="true">
        {AREAS.map((area) => (
          <span key={area}>{area}</span>
        ))}
      </section>
    </main>
  );
};

export default Landing;