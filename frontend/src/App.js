import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css' // Assurez-vous que ce chemin est correct
import ScrollToTop from './components/utils/ScrollToTop'

import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <ScrollToTop />
      <div className="bg-backgroundColor">
        <div>
          <Outlet />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
