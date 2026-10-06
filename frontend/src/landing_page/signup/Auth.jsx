import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(true);
  const [inputValue, setInputValue] = useState({
    name: "",
    username: "",
    password: "",
  });

  const handleOnChangeSignUp = () => {
    setSignIn(false);
    setSignUp(true);
  };

  const handleOnChangeSignIn = () => {
    setSignUp(false);
    setSignIn(true);
  };

  const handleOnChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleError = (err) => {
    toast.error(err, {
      position: "bottom-left",
    });
  };
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3000/signup",
        {
          ...inputValue,
        },
        { withCredentials: true },
      );

      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setInputValue({
          name: "",
          username: "",
          password: "",
        });
        setSignUp(false);
        setSignIn(true);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/login",
        {
          ...inputValue,
        },
        { withCredentials: true },
      );
      const { success, message,loginToken } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(()=>{
          localStorage.setItem("tokenn",loginToken);
          navigate("/dashboard");
        },1000)
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      username: "",
      password: "",
    });
  };
  return (
    <div className="signup-form">
      <div className="btn-sign">
        <button
          type="button"
          className={`bt-up ${signIn ? "active" : ""}`}
          onClick={handleOnChangeSignIn}
        >
          SIGN IN
        </button>
        <button
          type="button"
          className={`bt-up ${signUp ? "active" : ""}`}
          onClick={handleOnChangeSignUp}
        >
          SIGN UP
        </button>
      </div>
      <div className="formContainer">
        {signUp ? (
          <form className="input-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={inputValue.name}
              onChange={handleOnChange}
            />
            <input
              type="text"
              name="username"
              placeholder="username"
              value={inputValue.username}
              onChange={handleOnChange}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              value={inputValue.password}
              onChange={handleOnChange}
            />
            <button className="btn" type="submit">
              REGISTER
            </button>
          </form>
        ) : (
          <form className="input-form" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="username"
              name="username"
              value={inputValue.username}
              onChange={handleOnChange}
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              value={inputValue.password}
              onChange={handleOnChange}
            />
            <button className="btn">LOGIN</button>
          </form>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
