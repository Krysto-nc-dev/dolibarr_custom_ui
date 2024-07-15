import React from 'react'
import PublicHeader from './PublicHeader'
import { Outlet } from 'react-router-dom'
import PublicFooter from './PublicFooter'

const PublicLayout = () => {
  return (


    <>
      <PublicHeader/>
      <div className='p-4 min-h-[100vh]'>
        <Outlet />
      </div>
      <PublicFooter/>
    </>
 
  )
}

export default PublicLayout