import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = () => {
  return (
    <div className="flex flex-row bg-neutral h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header className="fixed w-full top-0 z-10" />
        <div className=" p-4 overflow-auto ">
          <Outlet />
        </div>
      </div>
      {/* <footer>Footer</footer> */}
    </div>
  );
};

export default DashboardLayout;
