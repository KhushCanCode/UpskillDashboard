import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/chatApi";
import { DataProvider } from "../../App";
import checkChatSession from "../../utils/chatSession";


function ChatLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("singhrajtilak64@gmail.com");
  const [password, setPassword] = useState("rajsingh123@");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const{token,setToken} = useContext(DataProvider)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await axios.post(`${api}auth/login`, {
        email,
        pass: password,
      });
      setMessage(response.data.message);
     
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token)
      navigate("/main");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  checkChatSession()

  return (
    <div className="h-[100vh] w-[100%] bg-lightgreen  pt-4 md:pl-4 md:pt-3 flex justify-center items-center">
    
      <div className="  w-[85%] md:w-[50%] lg:w-[30%] top-[20%] rounded-xl bg-stone border border-gray-600 ">
        <div className=" rounded-xl"></div>
        <form
          className="relative text-txtcolor p-3 lg:p-8 font-inter"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl lg:text-3xl text-white  font-semibold">Login</h1>
          <p className="font-normal text-xs md:text-sm">
            Welcome back! Please log in to access your account.
          </p>

          <div className="my-5 md:my-8">
            <p className="font-medium text-sm text-white">Email</p>
            <div className="w-full border-b flex items-center pb-2 justify-between">
              <input
                className="bg-transparent text-xs lg:text-sm my-2 outline-none w-full"
                placeholder="Enter Your Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <img className="w-4" src="/logo/email.svg" alt="email icon" />
            </div>
          </div>

          <div className="my-5 md:my-8">
            <p className="font-medium text-sm text-white">Password</p>
            <div className="w-full border-b flex items-center pb-2 justify-between">
              <input
                className="bg-transparent text-xs lg:text-sm my-2  outline-none w-full"
                placeholder="Enter your Password"
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <img
                src={passwordVisible ? "/logo/pass.svg" : "/logo/arrowc.svg"}
                alt="Toggle Password Visibility"
                className="cursor-pointer w-4"
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>
          {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
          {message && (
            <p style={{ color: "green", fontSize: "12px" }}>{message}</p>
          )}
          <div className="border border-gray-500 bg-lightgreen hover:bg-darkgreen rounded-2xl w-full p-1 my-5 lg:my-6">
            <button
              type="submit"
              className=" p-2 rounded-xl  w-full text-white font-semibold "
            >
              Login
            </button>
          </div>

          <p className="text-xs lg:text-sm w-full flex items-center">
            Don’t have an account?
            <span
              onClick={() => navigate("/chatsignup")}
              className=" font-bold ml-1 underline cursor-pointer flex items-center"
            >
              Sign Up
            </span>
            <i className="fa-solid fa-arrow-right -rotate-45  "></i>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ChatLogin;
