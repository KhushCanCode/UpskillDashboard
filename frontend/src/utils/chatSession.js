import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "./chatApi";
import { DataProvider } from "../App";
import axios from "axios";

const checkChatSession = ()=>{
    const navigate = useNavigate()
    const {token,setToken} = useContext(DataProvider)

    useEffect(() => {
        const verify = async () => {
          try {
            const resp = await axios.get(`${api}auth/verify-user`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          
          
            navigate("/main");
          } catch (error) {
            navigate("/chatlogin");
          
           
          }
        };
   
        verify();
      }, [token]);
}

export default checkChatSession;