import { Link } from "react-router-dom";

const Landing = () => {

  return (

    <main className="landing-container">



      <h1>Hello, you are on the landing page for visitors.</h1>

      <p><h2>

        Sign up now, or sign in to see your super secret dashboard!

      </h2></p>

      {}

      <div className="landing-links">

        <Link to="/">Home</Link>

        <Link to="/sign-in">Sign In</Link>

        <Link to="/sign-up">Sign Up</Link>

      </div>

    </main>

  );

};


export default Landing;

