/* eslint-disable react/no-unescaped-entities */
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-full-page">
      <div className="container-inner-box">
        <span className="logo">Chat Application</span>
        <span className="slogan">Login</span>
        <form onSubmit={handleSubmit}>
          <input placeholder="Email" type="email"></input>
          <input placeholder="Password" type="password"></input>
          <button>Login</button>
        </form>
        <p>
          Don't have an Account ? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
