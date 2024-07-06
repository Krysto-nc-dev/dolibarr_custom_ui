import React from 'react'
import { Link } from 'react-router-dom'
import DashboardCardGrid from '../../components/DashboardCardGrid'
import TransactionChart from '../../components/TransactionChart'
import BuyerProfileChart from '../../components/BuyerProfileChart'
import RecentOrders from '../../components/RecentOrders'
import PopularProducts from '../../components/PopularProducts'

const UserDashboardScreen = () => {
  
  return <div className='flex gap-4 flex-col'>
    <DashboardCardGrid/>
    <div className='flex flex-row gap-4 w-full'>

    <TransactionChart/>
    <BuyerProfileChart/>
    </div>
    <div className="flex flex-row gap-4 w-full">
      <RecentOrders/>
      <PopularProducts/>
    </div>
  </div>
}

export default UserDashboardScreen
