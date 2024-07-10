import React from 'react';
import { useGetInvoicesQuery } from '../../slices/dolibarr/dolliInvoiceApiSlices';
import Loader from '../../components/shared/Loader';
import { Link } from 'react-router-dom';

const UserBillingsScreen = () => {
  const { data: invoices, isLoading, error } = useGetInvoicesQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="text-red-500">
        {typeof error.data.message === 'string' ? error.data.message : 'Une erreur est survenue'}
      </p>
    );
  }

  return (
    <div className="h-screen p-6 bg-backgroundColor text-textColor">
      <h1 className="text-3xl font-bold mb-6 text-primaryColor text-center">Factures</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-700 border ">
          <thead className="bg-primaryColor">
            <tr>
              <th className="px-4 py-2 border-b">Référence</th>
              <th className="px-4 py-2 border-b">Date</th>
              <th className="px-4 py-2 border-b">Date limite de règlement</th>
              <th className="px-4 py-2 border-b">Total TTC</th>
              <th className="px-4 py-2 border-b">Statut</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-500">
                <td className="px-4 py-2 border-b">
                  <Link to={`/user-invoice-details/${invoice.id}`}>
                    {invoice.ref}
                  </Link>
                </td>
                <td className="px-4 py-2 border-b">{new Date(invoice.date * 1000).toLocaleDateString()}</td>
                <td className="px-4 py-2 border-b">{new Date(invoice.date_lim_reglement * 1000).toLocaleDateString()}</td>
                <td className="px-4 py-2 border-b">{parseFloat(invoice.total_ttc).toLocaleString()} XPF</td>
                <td className={`px-4 py-2 border-b  font-bold ${invoice.statut === '2' ? 'text-green-400 hover:text-green-500 ' : ' text-red-400 hover:text-red-700'}`}>
                  {invoice.statut === '2' ? 'Payée' : 'Non payée'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserBillingsScreen;
