import React from 'react';
import { useGetBankAccountsQuery } from '../../slices/dolibarr/dolliBankAccountApiSlice';
import Loader from '../../components/shared/Loader';
import { Link } from 'react-router-dom';

const UserBanksScreen = () => {
  const { data, isLoading, error } = useGetBankAccountsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="text-red-500">
        {typeof error.data.message === 'string'
          ? error.data.message
          : 'Une erreur est survenue'}
      </p>
    );
  }

  return (
    <div className="h-screen flex flex-col p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {data.map((account) => (
          <Link 
            to={`/bank-account-details/${account.id}`} 
            key={account.id} 
            className="group  hover:no-underline card p-4"
          >
            <h2 className="text-xl font-bold mb-2 text-secondaryColor">{account.label}</h2>
            <p className='text-textColor'><strong>Banque:</strong> {account.bank}</p>
            <p className='text-textColor'><strong>Numéro de compte:</strong> {account.number}</p>
            <p className='text-textColor'><strong>Solde:</strong> {parseFloat(account.solde).toFixed(2)} {account.currency_code}</p>
            <p className='text-textColor'><strong>Propriétaire:</strong> {account.proprio}</p>
            <p className='text-textColor'><strong>Adresse du propriétaire:</strong> {account.owner_address}</p>
            <div className="bg-gray-500 p-4 rounded-lg mt-4  transition">
              <h3 className="text-lg font-semibold mb-2 text-secondaryColor">RIB</h3>
              <p><strong>Code banque:</strong> {account.code_banque}</p>
              <p><strong>Code guichet:</strong> {account.code_guichet}</p>
              <p><strong>Numéro de compte:</strong> {account.number}</p>
              <p><strong>Clé RIB:</strong> {account.cle_rib}</p>
              <p><strong>IBAN:</strong> {account.iban}</p>
              <p><strong>BIC:</strong> {account.bic}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserBanksScreen;
