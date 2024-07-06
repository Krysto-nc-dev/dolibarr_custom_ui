import { Factory } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DASHBOARD_SIDEBAR_LINKS } from '../utils/Navigation';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="bg-primaryColor p-4 flex flex-col w-64 text-textColor h-full">
      <div className="flex items-center gap-2 px-2 py-4">
        <Factory className="text-secondaryColor" size="32" />
        <span className="text-secondaryColor text-lg font-bold">MY CRM</span>
      </div>
      <div className="flex-1 mt-4">
        {DASHBOARD_SIDEBAR_LINKS.map((link) => (
          <Link
            to={link.href}
            key={link.key}
            className={`flex items-center gap-2 mb-2 px-4 py-2 rounded-lg text-xs ${
              location.pathname === link.href ? 'bg-accentColor text-white' : 'text-textColor'
            } hover:bg-accentColor hover:text-white`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
    
    </aside>
  );
};

export default Sidebar;
