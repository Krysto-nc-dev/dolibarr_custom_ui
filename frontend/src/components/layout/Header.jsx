import { Bell, CircleUser, LogOut, MessageCircle, MessageCircleQuestion, PowerOffIcon, Search, Settings } from "lucide-react";
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { logout } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/userApiSlice";

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logoutApiCall] = useLogoutMutation()

    const logoutHandler = async () => {
        try {
          await logoutApiCall().unwrap()
          dispatch(logout())
          console.log('logout')
          navigate('/')
        } catch (err) {
          console.error(err)
        }
      }
  return (
    <header className="h-20 pl-20 pr-10 flex justify-between items-center bg-gray-700 ">
      <div className="relative">
        <Search fontSize={20} className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3" />
        <input 
          type="text" 
          placeholder="Recherche..." 
          className="text-sm focus:outline-none active:outline-none h-7 w-[24rem] border border-gray-700 rounded-lg px-4 pl-11"
        />
      </div>
      <div className="flex items-center gap-2 mr-2">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button className="p-1.5 rounded-sm inline-flex items-center text-primaryColor hover:text-opacity-100 focus:outline-none active:bg-gray-100">
                <Bell fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-48">
                  <div className="bg-primaryColor rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    Notifications
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button className="p-1.5 rounded-sm inline-flex items-center text-primaryColor  hover:text-opacity-100 focus:outline-none active:bg-gray-100">
                <MessageCircle fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-48">
                  <div className="bg-primaryColor rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                   <Link to="/messages">Messages</Link>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button className="p-1.5 rounded-full inline-flex items-center text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100">
                <div className="w-8 h-8 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://randomuser.me/api/portraits/women/44.jpg')" }}></div>
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-48">
                  <div className="bg-primaryColor rounded-sm shadow-md ring-1 ring-black ring-opacity-5 text-sm">
                    <Link to="/profile" className=" px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center hover:no-underline"> <CircleUser  className='mr-2'/>  Mon profile</Link>
                    <Link to="/settings" className="px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center hover:no-underline"><Settings className="mr-2"/> Paramètres</Link>
                    <Link to="/support" className="px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center hover:no-underline"><MessageCircleQuestion className="mr-2"/> Aide & supports</Link>
                    <Link onClick={logoutHandler} className=" px-4 py-2 text-red-700 hover:bg-gray-100 flex items-center hover:no-underline "> <LogOut className="mr-2"/> Déconnexion</Link>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </header>
  );
}

export default Header;
