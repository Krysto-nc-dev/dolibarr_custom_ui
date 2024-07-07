import { Factory, Gem } from 'lucide-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { DASHBOARD_SIDEBAR_LINKS } from '../utils/Navigation'
import appIcon from '../../assets/images/icon.png'

const Sidebar = () => {
  const location = useLocation()

  return (
    <aside className="bg-primaryColor p-3 flex flex-col w-64 text-textColor h-full">
      <div className="flex items-center gap-2 px-1 mb-6">
        {/* <Gem className="text-secondaryColor" size="25" /> */}
    
          <img src={appIcon} alt="" className="w-6 h-6" />
     

        <span className="text-secondaryColor text-lg font-bold">
          MY Precious CRM
        </span>
      </div>
      <div className="flex-1 mt-1">
        {DASHBOARD_SIDEBAR_LINKS.map((link) => (
          <Link
            to={link.href}
            key={link.key}
            className={`flex items-center gap-2 mb-1 px-1 py-1 rounded-lg text-[10px] ${
              location.pathname === link.href
                ? 'bg-accentColor text-white'
                : 'text-textColor'
            } hover:bg-accentColor hover:text-white`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
