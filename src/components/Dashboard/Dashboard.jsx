import { useContext } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';

const Dashboard = ({ games }) => {
  const { user } = useContext(UserContext);

  // the token stores the user's id as a string in "sub"
  const currentUserId = Number(user.sub);

  // only the games this user added
  const myGames = games.filter((game) => game.user.id === currentUserId);

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <h2>Games you've added</h2>
      {!myGames.length && (
        <p>
          You haven't added any games yet. <Link to='/games/new'>Add one</Link>
        </p>
      )}
      <ul>
        {myGames.map((game) => (
          <li key={game.id}>
            <Link to={`/games/${game.id}`}>{game.name}</Link> · {game.reviews.length} reviews
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Dashboard;