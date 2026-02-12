import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {

  return (
    <main className='landing-container'>
      <div className='landing-content'>
        <h1>Hello!</h1>
        <h1>How are you feeling today?</h1>
        <p>Track your daily mood, one memory at a time.</p>
      </div>
      

      <div className='action-buttons'>
        <Link to ="/sign-in" className="new-mood-btn">Get Started 😊😭😖😆</Link>
      </div>
    </main>

  );

};


export default Landing;

