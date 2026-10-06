import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <>
      <div className="landingPageContainer">
        <nav>
          <div className="nav-head">
            <h2>Apna Video Call</h2>
          </div>

          <div className="nav-links">
            <Link to="/guest">Join as Guest</Link>
            <Link to="/signup">Register</Link>
            <div role="button">
              <Link to="/login">Login</Link>
            </div>
          </div>
        </nav>

        <div className="landingMainContainer">

          <div>

            <h1>
              <span style={{ color: "#FF9839" }}>Connect </span>with your loved ones
            </h1>
            <h3>Cover a distance by Apna Video Call</h3>
            <div role="button">
              <Link to="signup">Get Started</Link>
            </div>
            
          </div>
          
          <div>

            <img className="phone-img" src="/media/mobile.png" alt="img" />

          </div>

        </div>
      </div>
    </>
  );
}
