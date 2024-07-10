import { AlignJustify, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DASHBOARD_SIDEBAR_LINKS } from '../utils/Navigation';
import logo from '../../assets/logo.png';

const Sidebar = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar open/close

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <aside className={`bg-gray-700 p-3 text-textColor h-full absolute top-0 left-0 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-55' : 'w-15'}`}>
    
      <div className="flex items-center justify-between gap-2 px-1 mt-2">
        {/* Menu icon to toggle sidebar */}
        <button onClick={toggleSidebar} className="text-secondaryColor focus:outline-none">
          {isSidebarOpen ? (
            <X className="text-red-600" size="25" />
          ) : (
            <AlignJustify size="25" />
          )}
        </button>
        
      </div>
      {!isSidebarOpen && (
        <div className="mt-8">
          {DASHBOARD_SIDEBAR_LINKS.map((link) => (
            <Link
              to={link.href}
              key={link.key}
              className={`flex items-center text-center gap-2 mb-1  px-1 py-1 rounded-lg text-[20px] ${
                location.pathname === link.href
                  ? 'bg-lightColor text-white'
                  : 'text-primaryColor font-bold'
              } hover:bg-secondaryColor hover:text-backgroundColor`}
            >
              <span className='ml-1'>

              {link.icon}
              </span>
            </Link>
          ))}
        </div>
      )}
      {isSidebarOpen && (
        <div className="flex-1 mt-8">
          {DASHBOARD_SIDEBAR_LINKS.map((link) => (
            <Link
              to={link.href}
              key={link.key}
              className={`flex items-center gap-2 mb-1 px-1 py-1 rounded-lg text-[10px] ${
                location.pathname === link.href
                  ? 'bg-lightColor text-white'
                  : 'text-primaryColor font-bold'
              } hover:bg-secondaryColor hover:text-backgroundColor`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
