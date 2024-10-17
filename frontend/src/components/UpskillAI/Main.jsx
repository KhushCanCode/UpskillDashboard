import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UpskillAI from "./UpskillAI";
import ChatInput from "./ChatInput";
import Working from "./Working";
import { DataProvider } from "../../App";
import Model from "./Model";

function Main({handleHistoryClick}) {
  const [inputData, setInputData] = useState({ text: null, image: null });
  const [replyText, setReplyText] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [prev, setPrev] = useState(null);
  const [type, setType] = useState(true);
  const { chatId, token, setToken } = useContext(DataProvider);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!token && !storedToken) {
      navigate("/chatlogin");
    } else if (!token && storedToken) {
      setToken(storedToken);
    }
  }, [token, navigate, setToken]);

  const handleSend = ({ text, image }) => {
    if (!text && !image) return;  // Prevent sending if no data is provided
  
    const newInputData = { text, image };
    if (JSON.stringify(newInputData) === JSON.stringify(prev)) {
      setIsReplying(false);
      setReplyText(false);
      return;
    }

    // Set the new input data
    setInputData(newInputData);
    setPrev(newInputData);
    setIsReplying(true);
    setReplyText(true);
  };
  
  const setTyping = (text) => {
    setType(text);
  };

  const handleReply = (text) => {
    setReplyText(text);
    setIsReplying(false);
  };

  useEffect(() => {
    if (isReplying) {
      // Add any additional logic for when isReplying changes
    }
  }, [isReplying]);

  return (
    <div className="h-[100vh] w-[100%] bg-lightgreen pt-4 md:px-4 md:pt-0  flex flex-col items-center">

      {/* History & Chat Buttons */}
      <div className=' w-full relative left-12 md:left-0 flex items-center z-10 gap-2 p-1 md:p-4'>
        <div className='w-5 lg:w-7 cursor-pointer' onClick={handleHistoryClick}>
          <img src="/assets/history.svg" alt="history" />
        </div>
        <Model/>
      </div>

      {(inputData.text || inputData.image || chatId) ? (
        <Working 
          prompt={inputData.text} 
          image={inputData.image}
          Typing={type} 
          handleReply={handleReply} 
          playing={replyText} 
        />
      ) : (
        <UpskillAI />
      )}
      
      <ChatInput
        Send={handleSend}
        handleReply={handleReply}
        playing={isReplying}
        setTyping={setTyping}
      />
    </div>
  );
}

export default Main;