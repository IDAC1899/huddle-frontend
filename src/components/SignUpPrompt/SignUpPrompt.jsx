import { Link } from 'react-router';

const SignUpPrompt = ({ handleClose }) => {
  return (
    // clicking the dark background closes the popup
    <div className="prompt-backdrop" onClick={handleClose}>
      {/* clicks inside the box shouldn't close it */}
      <div className="prompt" onClick={(evt) => evt.stopPropagation()}>
        <h2>Sign Up to Join In</h2>
        <p>Create a free account to RSVP, comment and like other people's comments.</p>
        <div className="prompt-links">
          <Link to="/sign-up" className="btn btn-red">Create an Account</Link>
          <Link to="/sign-in" className="btn btn-outline">Sign In</Link>
        </div>
        <button className="prompt-close" onClick={handleClose}>Not now</button>
      </div>
    </div>
  );
};

export default SignUpPrompt;