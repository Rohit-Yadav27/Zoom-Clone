import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";
import server from "../../../environment";

export default function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${server}/verify`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status) {
          navigate("/dashboard");
        }
      });
  }, []);
  return (
    <>
      <Signup />
    </>
  );
}
