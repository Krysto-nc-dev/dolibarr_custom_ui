import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetBankAccountLinesQuery, useGetBankAccountsDetailsQuery } from '../../slices/dolibarr/dolliBankAccountApiSlice';
import Loader from '../../components/shared/Loader';

const UserBankAccountDetails = () => {
  const { id: bankAccountId } = useParams();

  const { data: bankAccountDetails, error: bankAccountError, isLoading: bankAccountLoading } = useGetBankAccountsDetailsQuery(bankAccountId);
  const { data: bankAccountLines, error: bankAccountLinesError, isLoading: bankAccountLinesLoading } = useGetBankAccountLinesQuery(bankAccountId);

  if (bankAccountLoading || bankAccountLinesLoading) {
    return <Loader />;
  }

  if (bankAccountError || bankAccountLinesError) {
    return (
      <p className="text-red-500">
        {typeof bankAccountError.data.message === 'string'
          ? bankAccountError.data.message
          : 'Une erreur est survenue'}
      </p>
    );
  }

  const totalBalance = bankAccountLines.reduce((total, line) => total + parseFloat(line.amount), 0);

  console.log(bankAccountDetails, bankAccountLines);

  return (
    <div>
      <h1 className="text-md font-bold mb-4">Solde du compte: <span className={totalBalance < 0 ? 'text-dangerColor' : 'text-successColor'}>{totalBalance.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} XPF</span></h1>
      <h1 className="text-2xl font-bold mb-4">Opérations sur le compte</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-primaryColor">
              <th className="px-4 py-2 border-b">Date</th>
              <th className="px-4 py-2 border-b">Libellé</th>
              <th className="px-4 py-2 border-b">Type d'opération</th>
              <th className="px-4 py-2 border-b">Montant</th>
            </tr>
          </thead>
          <tbody>
            {bankAccountLines && bankAccountLines.map((line) => {
              const amount = parseFloat(line.amount);
              const operationType = amount < 0 ? 'Débit' : 'Crédit';
              const rowClass = amount < 0 ? 'bg-red-200 text-red-700' : 'bg-green-200 text-green-700';
              
              return (
                <tr key={line.id} className={`hover:bg-gray-50 ${rowClass}`}>
                  <td className="px-4 py-2 border-b">{new Date(line.datec).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border-b">{line.label}</td>
                  <td className="px-4 py-2 border-b">{operationType}</td>
                  <td className="px-4 py-2 border-b font-bold">
                    {amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} <span className='text-[10px]'>XPF</span> 
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserBankAccountDetails;
