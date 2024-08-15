import React, { useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import axios from "axios";
import { API_END_POINT_USER } from "@/utils/db";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/config/userSlice";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_END_POINT_USER}/users/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        // console.log(response.data.message);
        dispatch(setAuthUser(response.data.user))
        navigate("/");
        toast.success(response.data.message);
        setInput({
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      // console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
      setInput({
        username: "",
        email: "",
        password: "",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center h-screen justify-center">
      <form
        className="shadow-lg flex flex-col gap-5 p-8"
        onSubmit={loginHandler}
      >
        <div className="my-4">
          <h1 className="text-center font-bold text-xl">LOGO</h1>
          <p className="text-sm text-center">
            Login to see photos & videos from your friends
          </p>
        </div>

        <div>
          <span className="font-medium">Email</span>
          <Input
            type="email"
            name="email"
            className="focus-visible:ring-transparent my-2"
            onChange={changeEventHandler}
            value={input.email}
          />
        </div>
        <div>
          <span className="font-medium">Password</span>
          <Input
            type="password"
            name="password"
            className="focus-visible:ring-transparent my-2"
            onChange={changeEventHandler}
            value={input.password}
          />
        </div>
        {loading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit">Login</Button>
        )}
        <span className="text-center">
          Already have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
