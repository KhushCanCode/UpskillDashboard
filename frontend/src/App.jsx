import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Dashboard from './components/Dashboard'
import { api } from "./utils/chatApi";

export const DataProvider = createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userData, setUserData] = useState([]);
  const [chats, setChats] = useState([]); // State to hold chat data
  const [chatId, setChatId] = useState(null);
  const [gpt,setModel] = useState(true)

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${api}auth/user-data`, {
        headers: { Authorization: `Bearer ${token}` }, // Send the token in the Authorization header
      });
      setUserData(response.data); // Store user data
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Function to fetch chat data
  const fetchChatsData = async () => {
    if (token) {
      try {
        const response = await axios.get(`${api}create/getChats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChats(response.data);
      } catch (error) {
        setChats([]);

        console.error(
          "Error fetching chats:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  // Function to refresh chats
  const refreshChats = async () => {
    await fetchChatsData(); // Reload chat data
  };


  

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        await fetchUserData();
        await fetchChatsData();
      }
      fetchData();
    }
  }, [token]);
  

  const changeId = (value)=>{
        setChatId(value)
       
  }

  return (
    <DataProvider.Provider
      value={{
        token,
        setToken,
        userData,
        setUserData,
        chats,
        refreshChats,
        chatId,
        changeId,
        gpt,
        setModel

      }}
    >
      <Dashboard />
    </DataProvider.Provider>
  );
}

export default App;
