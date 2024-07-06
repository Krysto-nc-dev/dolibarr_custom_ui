import React, { createContext, useContext } from 'react';

import { Loader } from 'lucide-react';
import { useGetBankAccountLinesQuery } from '../../slices/dolibarr/dolliBankAccountApiSlice';


const AccountBalanceContext = createContext();

export const AccountBalanceProvider = ({ accountId, children }) => {
  const { data: bankAccountLines, error, isLoading } = useGetBankAccountLinesQuery(accountId);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-red-500">Erreur lors de la récupération des lignes de compte.</p>;
  }

  const balance = bankAccountLines.reduce((total, line) => total + parseFloat(line.amount), 0);

  return (
    <AccountBalanceContext.Provider value={balance}>
      {children}
    </AccountBalanceContext.Provider>
  );
};

export const useAccountBalance = () => {
  return useContext(AccountBalanceContext);
};
