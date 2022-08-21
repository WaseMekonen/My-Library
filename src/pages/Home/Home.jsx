import { Link } from "react-router-dom";
import "./Home.css";
export default function Home() {
  return (
    <>
      <div className="banner">
      <ul></ul>
        <div className="home-titles">
          <h2>Welcome </h2>
          <h4>Login to discover the secret of library</h4>
        </div>
      </div>
      <div className="buttons-container">
        <div className="login-link">
          <Link to="/Login"> Login </Link>
        </div>
        <div className="register-link">
          <Link to="/Register"> Register </Link>
        </div>
      </div>
    </>
  );
}
