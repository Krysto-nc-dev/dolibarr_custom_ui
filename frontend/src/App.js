import React from 'react'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ScrollToTop from './components/utils/ScrollToTop'

import { Outlet } from 'react-router-dom'
import Header from './components/Header'

const App = () => {
  return (
    <div className="overflow-x-hidden">
      <ToastContainer />
      <ScrollToTop />
      <Header />
      <>
        <main>
          <Outlet />
        </main>
      </>
    </div>
  )
}

export default App
