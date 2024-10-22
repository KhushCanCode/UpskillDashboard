import { Link, useLocation } from 'react-router-dom'; 
import { useState } from 'react';

const navItems = [
  { src: '/assets/home.svg', hoverSrc: '/assets/gradient/grhome.svg', label: 'Home', to: '/' },
  { src: '/assets/submissions.svg', hoverSrc: '/assets/gradient/grsubmissions.svg', label: 'Submissions', to: '/submissions' },
  { src: '/assets/gems.svg',hoverSrc: '/assets/gradient/grgems.svg', label: 'Gems', to: '/gems' },
  { src: '/assets/chat.svg',hoverSrc: '/assets/gradient/grchat.svg', label: 'Upskill AI', to: '/upskillai', hasOnClick: true },
];

const connectItems = [
  { src: '/assets/clubs.svg', hoverSrc: '/assets/gradient/grclubs.svg', label: 'Clubs', to: '/clubs' },
  { src: '/assets/resume.svg', hoverSrc: '/assets/gradient/grresume.svg', label: 'Resume', to: '/resume' },
  { src: '/assets/internship.svg', hoverSrc: '/assets/gradient/grinternship.svg', label: 'Internship', to: '/internship' },
];

const exploreItems = [
  { src: '/assets/refer.svg', hoverSrc: '/assets/gradient/grrefer.svg', label: 'Refer & Earn', to: '/refer' },
  { src: '/assets/hackathon.svg', hoverSrc:'/assets/gradient/grhackathon.svg', label: 'Hackathon', to: '/hackathon' },
];

function Sidebar({isCollapsed, setIsCollapsed}) {
  const location = useLocation();

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) { // Adjust 768px for small device breakpoint
      setIsCollapsed(true);
    }
  };

  // Rendering Navigation Links--------------------------------------------------------------------
  const renderNavItems = (items) =>
    items.map((item) => {
      const isActive = location.pathname === item.to; 
      return (
        <Link
          to={item.to}
          key={item.label}
          className={`group nav-link transition duration-300 hover:opacity-100  ${isActive ? 'bg-gradient-to-r from-[#49D0430D] to-[#FFB9120D] ' : 'opacity-50'} ${isCollapsed ? 'justify-center' : ''}`}
          onClick={handleLinkClick}
          
        >
            <div >
              <img
                src={isActive ? item.hoverSrc : item.src}
                alt={item.label}
                className={`transition duration-300 `}
                
                
              />
            </div>

            <h3
              className={`text-base transition duration-300 ${isActive ? 'gradient-text' : 'text-txtcolor hover:text-white'} ${
                isCollapsed ? 'hidden' : ''
              }`}
            >
              {item.label}
            </h3>
        </Link>
      );
    });


// Sidebar------------------------------------------------------------------------------------
  return (
    <div className='z-50'>
      <div
        className={`h-[100vh] relative  bg-neutral-1200 border-r border-neutral-700  py-5 md:py-6 px-3 lg:px-5 transition-all duration-300 ${
          isCollapsed
            ? '  flex-col items-center hidden sm:flex'
            : ''
        }`}
      >
        {/* Logo + Name + Collapse ------------------------------------------------- */}
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-2">
            <div>
              <img src="/logo/logo.svg" alt="Logo" className={`${isCollapsed ? 'hidden' : ''}`} />
            </div>
            <h3 className={`text-white text-base lg:text-lg font-semibold tracking-widest font-['Montserrat'] ${isCollapsed ? 'hidden' : ''}`}>
              UpskillMafia
            </h3>
          </div>

          {/* Collapse Icon */}
          <div className="cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>
            <img
              src="/assets/collapse.svg"
              alt="collapse"
              className={`transition-transform duration-300  z-20 ${isCollapsed ? 'rotate-180' : ''}`}
            />
          </div>
        </div>

        {/* Navigation Menu-----------------------------------------------------------------------*/}
        <div className="mt-5  flex flex-col gap-1 lg:gap-2">
          {renderNavItems(navItems)}

          {/* Connect & Build */}
          <div className={`flex items-center ${isCollapsed ? 'my-2' : ''}`}>
            <p className={`text-neutral-500 text-sm w-[80%] ${isCollapsed ? 'hidden' : ''}`}>Connect & Build</p>
            <div className="h-px w-full bg-neutral-500"></div>
          </div>

          {renderNavItems(connectItems)}

          {/* Explore */}
          <div className={`flex items-center ${isCollapsed ? 'my-2' : ''}`}>
            <p className={`text-neutral-500 text-sm w-[80%] ${isCollapsed ? 'hidden' : ''}`}>Explore</p>
            <div className="h-px w-full bg-neutral-500"></div>
          </div>

          {renderNavItems(exploreItems)}
        </div>

        {/* Help Icon */}
       
        <div
          className={` bottom-8 md:bottom-4 lg:bottom-8 right-4  lg:right-5 bg-lightgreen w-fit p-2 rounded-md border border-gray-500 transition duration-300 hover:bg-[#505050] hover:cursor-pointer
            ${isCollapsed ? 'static transform translate-y-20 lg:translate-y-32' : 'absolute'}
            `}
        >
          <img src="/assets/question.svg" alt="Help" />
        </div>
       
       
      </div>

      {/* Collapse Button for mobile */}
      {isCollapsed && (
        <div className="fixed top-5 left-3 sm:hidden z-50 cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>
          <img
            src="/assets/collapse.svg"
            alt="collapse"
            className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </div>
      )}
    </div>
  );
}

export default Sidebar;
