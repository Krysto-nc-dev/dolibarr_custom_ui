import React from 'react';
import { useAccountBalance } from './AccountBalanceProvider';

const AccountBalanceDisplay = () => {
  const balance = useAccountBalance();

  return (
    <div>
      <h1 className={`text-xl font-bold ${balance < 0 ? 'text-dangerColor' : 'text-successColor'}`}>
        {balance.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}  <span className='text-[10px]'> XPF</span>
      </h1>
    </div>
  );
};

export default AccountBalanceDisplay;
