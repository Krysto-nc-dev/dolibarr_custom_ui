import {  Banknote, Handshake, PieChart, UsersRound } from 'lucide-react'
import React from 'react'
import { AccountBalanceProvider } from './utils/AccountBalanceProvider';
import AccountBalanceDisplay from './utils/AccountBalanceDisplay';
import ValReelStock from './utils/ValReelStock';
import TotalStockWeight from './utils/TotalStockWeight';
import TotalSales from './utils/TotalSales';

const DashboardCardGrid = () => {

    const accountId = 1;
  return (
    <section className='flex gap-4 w-full' >
      <BoxWrapper >
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-yellow-500'>
        <Banknote className='text-2xl text-white' />
        </div>
        <div className='pl-4'>
            <span className='text-sm text-textColor font-light'>Argent en banque</span>
            <div className='flex items-center'>
                <strong className='text-xl text-textColor font-semibold'> 
                    <AccountBalanceProvider accountId={accountId} >
                        <AccountBalanceDisplay />
                    </AccountBalanceProvider>
                </strong>
               
            </div>
        </div>
       
      </BoxWrapper>
      <BoxWrapper>
        <div className='rounded-full h-12 w-12 flex items-center justify-center  bg-green-600'>
        <PieChart className='text-2xl text-white' />
        </div>
        <div className='pl-4'>
            <span className='text-sm text-textColor font-light'>Valeur du Stock</span>
            <div className='flex items-center'>
         <ValReelStock/>
              
            </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className='rounded-full h-12 w-12 flex items-center justify-center  bg-violet-500'>

      <UsersRound className='text-2xl text-white' />
        </div>
        <div className='pl-4'>
            <span className='text-sm text-textColor font-light'>Poids total du stock</span>
            <div className='flex items-center'>
              <TotalStockWeight/>
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
            <TotalSales/>
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