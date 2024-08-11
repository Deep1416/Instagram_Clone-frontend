import React, { useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "../ui/input";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const registerHandler = async() =>{
    e.preventDefault();
    try {
        
    } catch (error) {
        
    }
  }

  return (
    <div className="flex items-center w-screen h-screen justify-center">
      <form className="shadow-lg flex flex-col gap-5 p-8" onSubmit={registerHandler}>
        <div className="my-4">
          <h1 className="text-center font-bold text-xl">LOGO</h1>
          <p className="text-sm text-center">
            Signup to see photos & videos from your friends
          </p>
        </div>
        <div>
          <span className="font-medium">Username</span>
          <Input
            type="text"
            name="username"
            className="focus-visible:ring-transparent my-2"
            onChange={changeEventHandler}
          />
        </div>
        <div>
          <span className="font-medium">Email</span>
          <Input
            type="email"
            name="email"
            className="focus-visible:ring-transparent my-2"
            onChange={changeEventHandler}
          />
        </div>
        <div>
          <span className="font-medium">Password</span>
          <Input
            type="password"
            name="password"
            className="focus-visible:ring-transparent my-2"
            onChange={changeEventHandler}
          />
        </div>
        {loading ? (
          <Button>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit">Signup</Button>
        )}
        {/* <span className='text-center'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span> */}
      </form>
    </div>
  );
};

export default Register;
