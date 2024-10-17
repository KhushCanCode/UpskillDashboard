import React, { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../utils/chatApi";
import { DataProvider } from "../../App";

function ChatSignup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {token,setToken} = useContext(DataProvider)
  // checkSession()
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    console.log("working")
    setErrorMessage(""); // Reset error message on new submission

    try {
      const response = await axios.post(`${api}auth/signup`, {
        username,
        email,
        pass: password,
      });
      
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token)
      navigate("/chatlogin"); 
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        setErrorMessage(error.response.data);
      } else {
        // Some other error occurred
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="h-[100vh] w-[100%] bg-lightgreen  pt-4 md:pl-4 md:pt-3 flex justify-center items-center">

      <div className=" w-[85%] md:w-[50%] lg:w-[30%] top-[20%] rounded-xl bg-stone border border-gray-600 ">
        <div className=" rounded-xl"></div>

        <form className="relative text-txtcolor p-3 lg:p-8 font-inter" onSubmit={handleSignup}>
          <h1 className="text-2xl lg:text-3xl text-white font-semibold">Sign Up</h1>
          <p className="font-normal  text-xs md:text-sm">
            Join our UpskillGPT today!
          </p>

         

          <div className="my-5 md:my-8">
            <p className="font-medium text-sm text-white">Name</p>
            <div className="w-full border-b flex items-center pb-2 justify-between">
              <input
                className="bg-transparent text-xs lg:text-sm my-2 outline-none w-full"
                placeholder="Enter Your Name"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <img className="w-4" src="/logo/account.svg" alt="account icon"  />
            </div>
          </div>

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
                className="bg-transparent text-xs lg:text-sm my-2 outline-none w-full"
                placeholder="Enter your Password"
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <img
                 src={passwordVisible?"/logo/pass.svg":"/logo/arrowc.svg"}
                alt="Toggle Password Visibility"
                className="cursor-pointer w-4"
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>

          {errorMessage && <p className="text-yellow-200 mt-2  text-sm">! {errorMessage}</p>}
          <div className="border border-gray-500 bg-lightgreen hover:bg-darkgreen rounded-2xl w-full p-1 my-5 lg:my-6">
            <button type="submit" className=" p-2 rounded-xl  w-full text-white font-semibold ">
            Sign Up
            </button>
          </div>

          <p className="text-xs lg:text-sm w-full flex text-gray-100 items-center">
            Already have an account?
            <span
              onClick={() => navigate("/chatlogin")}
              className=" font-bold ml-1 hover:underline cursor-pointer flex items-center"
            >
              Login
              
            </span>
            <i className="fa-solid fa-arrow-right -rotate-45  "></i>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ChatSignup;