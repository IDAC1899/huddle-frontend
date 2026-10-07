import { useContext } from 'react';
import { Route, Routes } from 'react-router';

// Components
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';
import EventList from './components/EventList/EventList';
import EventDetails from './components/EventDetails/EventDetails';
import EventForm from './components/EventForm/EventForm';

// Context
import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />

        {/* anyone can browse events */}
        <Route path='/events' element={<EventList />} />
        <Route path='/events/:eventId' element={<EventDetails />} />

        {
          user ? (
            <>
              {/* only signed in users can create and edit events */}
              <Route path='/events/new' element={<EventForm />} />
              <Route path='/events/:eventId/edit' element={<EventForm />} />
            </>
          ) : (
            <>
              <Route path='/sign-up' element={<SignUpForm />} />
              <Route path='/sign-in' element={<SignInForm />} />
            </>
          )
        }
      </Routes>
    </>
  );
};

export default App;