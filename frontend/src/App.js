import React from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css' // Assurez-vous que ce chemin est correct
import ScrollToTop from './components/utils/ScrollToTop'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import { Outlet } from 'react-router-dom'

const App = () => {
  const { userInfo } = useSelector((state) => state.auth)

  return (
    <div className="overflow-x-hidden">
      <ToastContainer />
      <ScrollToTop />
      {!userInfo ? (
        <>
          <Header />
          <main>
            <Outlet />
          </main>
        </>
      ) : (
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <Dashboard>
              <Outlet />
            </Dashboard>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
