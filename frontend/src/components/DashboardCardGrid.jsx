import { BadgeSwissFranc, Handshake, PieChart, UsersRound } from 'lucide-react'
import React from 'react'

const DashboardCardGrid = () => {
  return (
    <section className='flex gap-4 w-full' >
      <BoxWrapper>
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-yellow-500'>
        <BadgeSwissFranc className='text-2xl text-white' />
        </div>
        <div className='pl-4'>
            <span className='text-sm text-textColor font-light'>Total des ventes</span>
            <div className='flex items-center'>
                <strong className='text-xl text-textColor font-semibold'> 689 098 XPF</strong>
                <span className='text-sm text-green-500 pl-2'>+ 5987</span>
            </div>
        </div>
       
      </BoxWrapper>
      <BoxWrapper>
        <div className='rounded-full h-12 w-12 flex items-center justify-center  bg-green-600'>
        <PieChart className='text-2xl text-white' />
        </div>
        <div className='pl-4'>
            <span className='text-sm text-textColor font-light'>Total des ventes</span>
            <div className='flex items-center'>
                <strong className='text-xl text-textColor font-semibold'> 689 098 XPF</strong>
                <span className='text-sm text-green-500 pl-2'>+ 5987</span>
            </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className='rounded-full h-12 w-12 flex items-center justify-center  bg-violet-500'>

      <UsersRound className='text-2xl text-white' />
        </div>
        <div className='pl-4'>
            <span className='text-sm text-textColor font-light'>Total des ventes</span>
            <div className='flex items-center'>
                <strong className='text-xl text-textColor font-semibold'> 689 098 XPF</strong>
                <span className='text-sm text-green-500 pl-2'>+ 5987</span>
            </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-orange-500'>
        <Handshake className='text-2xl text-white' />
        </div>
        <div className='pl-4'>
            <span className='text-sm text-textColor font-light'>Total des ventes</span>
            <div className='flex items-center'>
                <strong className='text-xl text-textColor font-semibold'> 689 098 XPF</strong>
                <span className='text-sm text-green-500 pl-2'>+ 5987</span>
            </div>
        </div>
      </BoxWrapper>
    
    </section>
  )
}



export default DashboardCardGrid


function BoxWrapper({ children }) {
  return (
    <div className=' bg-gray-50 rounded-md p-4 flex-1 border border-primaryColor flex items-center shadow-lg'>
      {children}
    </div>
  )
}