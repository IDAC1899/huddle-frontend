import { Link } from 'react-router';

const Landing = () => {
  return (
    <main>
      <h1>Game Reviews</h1>
      <p>Add the games you play, rate them out of 10 and see what everyone else thinks.</p>
      <p>
        <Link to='/sign-up'>Sign up</Link> or <Link to='/sign-in'>sign in</Link> to get started.
      </p>
    </main>
  );
};

export default Landing;