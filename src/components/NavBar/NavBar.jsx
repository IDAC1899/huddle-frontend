import { useContext } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import { removeToken } from '../../lib/helpers/jwt-helpers';

const NavBar = () => {

  const { user, setUser } = useContext(UserContext)

  const handleSignOut = () => {
    removeToken()
    setUser(null)
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Huddle</Link>
      <ul>
        <li><Link to="/events">Events</Link></li>
        { user
          ?
          <>
            <li className="nav-user">Hello {user.username}</li>
            <li><Link to="/" onClick={handleSignOut}>Sign Out</Link></li>
            <li><Link to="/events/new" className="btn btn-red">New Event</Link></li>
          </>
          :
          <>
            <li><Link to="/sign-in">Sign In</Link></li>
            <li><Link to="/sign-up" className="btn btn-red">Sign Up</Link></li>
          </>
        }
      </ul>
    </nav>
  );
};

export default NavBar;