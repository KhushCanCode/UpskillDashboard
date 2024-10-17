import { Link, useLocation } from 'react-router-dom'; 

const navItems = [
  { src: '/assets/home.svg', label: 'Home', to: '/' },
  { src: '/assets/submissions.svg', label: 'Submissions', to: '/submissions' },
  { src: '/assets/gems.svg', label: 'Gems', to: '/gems' },
  { src: '/assets/chat.svg', label: 'Upskill AI', to: '/chatlogin', hasOnClick: true },
];

const connectItems = [
  { src: '/assets/clubs.svg', label: 'Clubs', to: '/clubs' },
  { src: '/assets/resume.svg', label: 'Resume', to: '/resume' },
  { src: '/assets/internship.svg', label: 'Internship', to: '/internship' },
];

const exploreItems = [
  { src: '/assets/refer.svg', label: 'Refer & Earn', to: '/refer' },
  { src: '/assets/hackathon.svg', label: 'Hackathon', to: '/hackathon' },
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
          className={`group nav-link ${isCollapsed ? 'justify-center' : ''} ${isActive ? 'bg-lightgreen' : '' }`}
          onClick={handleLinkClick}
        >
          <div>
            <img src={item.src} alt={item.label} className={`transition-opacity duration-300 ${
                isActive
                  ? 'opacity-100' 
                  : 'opacity-50 group-hover:opacity-100'}`}
            />
          </div>

          <h3
            className={`text-base lg:text-lg ${isActive ? 'text-white' : 'text-txtcolor group-hover:text-white'} ${isCollapsed ? 'hidden' : ''}`}
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
        className={`h-[100vh] relative bg-darkgreen py-5 lg:py-10 px-5 transition-all duration-300 ${
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
            <h3 className={`text-white text-lg font-semibold ${isCollapsed ? 'hidden' : ''}`}>
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
        <div className="mt-3 lg:mt-5 flex flex-col gap-2">
          {renderNavItems(navItems)}

          {/* Connect & Build */}
          <div className="flex items-center">
            <p className={`text-gray-500 text-sm w-[80%] ${isCollapsed ? 'hidden' : ''}`}>Connect & Build</p>
            <div className="h-px w-full bg-gray-500"></div>
          </div>

          {renderNavItems(connectItems)}

          {/* Explore */}
          <div className="flex items-center mt-3">
            <p className={`text-gray-500 text-sm w-[80%] ${isCollapsed ? 'hidden' : ''}`}>Explore</p>
            <div className="h-px w-full bg-gray-500"></div>
          </div>

          {renderNavItems(exploreItems)}
        </div>

        {/* Help Icon */}
        <div
          className={`absolute bottom-4 lg:bottom-8 right-4  lg:right-5 bg-lightgreen w-fit p-2 rounded-md border border-gray-500`}
        >
          <img src="/assets/question.svg" alt="Help" />
        </div>
      </div>

      {/* Collapse Button */}
      {isCollapsed && (
        <div className="fixed top-5 left-5 sm:hidden z-50 cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>
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
