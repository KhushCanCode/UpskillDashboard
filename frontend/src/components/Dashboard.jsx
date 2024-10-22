import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Home from './Home/Home';
import UpskillAI from './UpskillAI/UpskillAI';
import Submissions from './Submissions/Submissions';
import Gems from './Gems/Gems';
import Clubs from './Clubs/Clubs';
import Resume from './Resume/Resume';
import Internship from './Internship/Internship';
import Refer from './Refer/Refer';
import Hackathon from './Hackathon/Hackathon';
import Navbar from './Navbar';


function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);


  return (
    <Router>
      <div className='h-[100vh] w-[100vw] bg-darkgreen flex overflow-hidden'>
        
        {/* Sidebar  ------------------------------------------------------*/} 
        <div className={`h-full transition-all duration-300 ${isCollapsed ? 'w-0 sm:w-[12%] md:w-[10%] lg:w-[5%]' : 'w-full md:w-[30%] lg:w-[20%]'}`}>
             <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}  />  
        </div>

        {/* Main Content Area ----------------------------------------------------------------*/}

        <div className={`h-[100vh] transition-all duration-300 ${
          isCollapsed ? 'w-full sm:w-[100%] md:w-[90%] lg:w-[95%]' : 'hidden  md:block md:w-[70%] lg:w-[80%]'
        }`}>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submissions" element={<Submissions />} />
            <Route path="/gems" element={<Gems />} />
            <Route path="/upskillai" element={<UpskillAI  />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/internship" element={<Internship />} />
            <Route path="/refer" element={<Refer />} />
            <Route path="/hackathon" element={<Hackathon />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default Dashboard;
