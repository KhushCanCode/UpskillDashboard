import React, { useContext, useState } from "react";
import { DataProvider } from "../../App";

function UpskillAI({ handleHistoryClick }) {
  const {token, setToken} = useContext(DataProvider)
  if (token) {
    localStorage.setItem("token", token);

  }
  return (
    <div className="h-[100vh] w-[100%] relative bg-lightgreen pt-4 md:px-4">

      

      {/* Upskill AI text */}
      <div className='w-full h-[85%] flex justify-center items-center'>
        <h3 className='text-4xl lg:text-5xl font-semibold text-txtcolor'>Upskill AI</h3>
      </div>

     
    </div>
  );
}

export default UpskillAI;
