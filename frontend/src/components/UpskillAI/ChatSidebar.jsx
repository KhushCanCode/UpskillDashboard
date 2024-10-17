import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import checkChatSession from "../../utils/chatSession";
import { DataProvider } from "../../App";
import { api } from "../../utils/chatApi";
import axios from "axios";

function ChatSidebar({handleHistoryClick }) {
  const { token, setToken, userData, refreshChats, changeId, chatId } =
    useContext(DataProvider);
  const nav = useNavigate();
  checkChatSession();
  const [data, setData] = useState([]);
  const [searchInput, setSearchIn] = useState("");
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  const handleChatClick = () => {
    if (window.innerWidth <= 768) { // Adjust 768px for small device breakpoint
      handleHistoryClick();
    }
  };

  const handleNewChat = async () => {
    try {
      const response = await axios.post(
        `${api}create/newPrompt`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        changeId(response.data.chatId);
        refreshChats();
        setSelectedChatId(response.data.chatId); 
        
      }
    } catch (error) {
      console.error(
        "Error creating chat:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}create/getChats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        setData([]);
        console.error(
          "Error fetching chats:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchData();
  }, [token, refreshChats, chatId]);

  const deleteChat = async (chatId) => {
    try {
      await axios.delete(`${api}create/delChats/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      refreshChats();
    } catch (error) {
      console.error(
        "Error deleting chat:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const filteredChats =
    searchInput.trim() === ""
      ? data
      : data.filter((item) =>
          item.chats[0]?.user.toLowerCase().includes(searchInput.toLowerCase())
        );

  return (
    <div className='h-[100vh] relative bg-darkgreen py-5 lg:py-10 px-5 transition-all duration-300'>

        {/* History & Chat Buttons */}
        <div className='absolute top-4 right-4  w-[90%] flex items-center z-10 gap-2 p-1 md:hidden'>
          <div className='w-5 lg:w-7 cursor-pointer' onClick={handleHistoryClick}>
            <img src="/assets/history.svg" alt="history" />
          </div>
        </div>

        {/* New Chat Button */}
        <div className='bg-[#454645] border border-gray-500 text-white flex items-center cursor-pointer justify-center gap-1 p-2 rounded-lg mt-10 md:mt-0 hover:bg-[#606160]'
            onClick={() => { handleNewChat(); handleChatClick(); }}

        >
            <p>New Chat</p>
            <img src="/assets/circleplus.svg" alt="" />
        </div>

        {/* History List*/}
        <div className="chats mt-5 md:mt-10 h-[80%]  p-2 chatsCont overflow-y-auto">
        {data.length > 0 ? (
                  [...data].reverse().map(
                    (
                      item,
                      i 
                    ) => (
                      <div
                        key={i}
                        onClick={() => {
                          changeId(item.chatId);
                          setSelectedChatId(item.chatId);
                          handleChatClick();
                          
                        }}
                        className={`w-full max-w-[400px] hover:bg-stone rounded-lg p-2 mb-2  flex items-center justify-between cursor-pointer ${
                          selectedChatId === item.chatId
                            ? "bg-stone"
                            : " bg-transparent"
                        }`}
                      >
    
                        <p className="truncate text-txtcolor">
                          {item.chats[0] ? item.chats[0].user : ""}
                        </p>
                        <img
                          width={"15px"}
                          src="/logo/trash.svg"
                          alt="Delete"
                          className="hover:scale-110 duration-200 transition-all"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering onClick of parent div
                            deleteChat(item.chatId);
                            
                          }}
                        />
                      </div>
                    )
                  )
                ) : (
                  <p className="text-txtcolor text-center ">No History Available</p>
                )}
            

            
        </div>

        {/* Help Icon */}
        <div className={`absolute bottom-4 lg:bottom-8 right-4  lg:right-5 bg-lightgreen w-fit p-2 rounded-md border border-gray-500`}>
          <img src="/assets/question.svg" alt="Help" />
        </div>

    </div>
  );
}

export default ChatSidebar;
