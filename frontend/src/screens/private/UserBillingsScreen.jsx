import React from 'react';
import { useGetInvoicesQuery } from '../../slices/dolibarr/dolliInvoiceApiSlices';
import Loader from '../../components/shared/Loader';
import { Link } from 'react-router-dom';
import { CircleDollarSign } from 'lucide-react';

const UserBillingsScreen = () => {
  const { data: invoices, isLoading, error } = useGetInvoicesQuery();
  console.log(invoices);
  
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

  // Définition des dates de début et de fin des exercices sociaux
  const currentYear = new Date().getFullYear();
  const startCurrentFiscalYear = new Date(currentYear, 6, 1); // 1er juillet de l'année en cours
  const endCurrentFiscalYear = new Date(currentYear + 1, 5, 30, 23, 59, 59); // 30 juin de l'année prochaine

  const startPreviousFiscalYear = new Date(currentYear - 1, 6, 1); // 1er juillet de l'année précédente
  const endPreviousFiscalYear = new Date(currentYear, 5, 30, 23, 59, 59); // 30 juin de l'année en cours

  // Filtrage des factures pour l'exercice social actuel
  const invoicesCurrentFiscalYear = invoices.filter(invoice => {
    const invoiceDate = new Date(invoice.date * 1000);
    return invoiceDate >= startCurrentFiscalYear && invoiceDate <= endCurrentFiscalYear;
  });

  // Filtrage des factures pour l'exercice social précédent
  const invoicesPreviousFiscalYear = invoices.filter(invoice => {
    const invoiceDate = new Date(invoice.date * 1000);
    return invoiceDate >= startPreviousFiscalYear && invoiceDate <= endPreviousFiscalYear;
  });

  // Calcul du total TTC des factures pour l'exercice social actuel
  const totalTTCCurrentFiscalYear = invoicesCurrentFiscalYear.reduce((acc, invoice) => acc + parseFloat(invoice.total_ttc), 0);

  // Calcul du total TTC des factures pour l'exercice social précédent
  const totalTTCPreviousFiscalYear = invoicesPreviousFiscalYear.reduce((acc, invoice) => acc + parseFloat(invoice.total_ttc), 0);

  // Calcul des paiements en retard pour l'exercice social actuel
  const overdueInvoicesCurrentFiscalYear = invoicesCurrentFiscalYear.filter(invoice => invoice.total_ttc > invoice.sumpayed);
  const totalOverdueAmountCurrentFiscalYear = overdueInvoicesCurrentFiscalYear.reduce((acc, invoice) => acc + (parseFloat(invoice.total_ttc) - parseFloat(invoice.sumpayed)), 0);

  // Calcul des paiements en retard pour l'exercice social précédent
  const overdueInvoicesPreviousFiscalYear = invoicesPreviousFiscalYear.filter(invoice => invoice.total_ttc > invoice.sumpayed);
  const totalOverdueAmountPreviousFiscalYear = overdueInvoicesPreviousFiscalYear.reduce((acc, invoice) => acc + (parseFloat(invoice.total_ttc) - parseFloat(invoice.sumpayed)), 0);

  // Filtrage de toutes les factures en retard
  const overdueInvoices = invoices.filter(invoice => invoice.total_ttc > invoice.sumpayed);
  const totalOverdueAmount = overdueInvoices.reduce((acc, invoice) => acc + (parseFloat(invoice.total_ttc) - parseFloat(invoice.sumpayed)), 0);

  // Formatage du montant TTC en XPF avec séparateur de milliers
  const formatTotalTTC = (amount) => {
    return Number(amount).toLocaleString('fr-FR', {
      style: 'currency',
      currency: 'XPF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="h-screen px-6 bg-backgroundColor text-textColor">
     
     {overdueInvoices.length > 0 ? (
        <div className="mt-4 mb-3 bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-1" role="alert">
          <p className="font-bold">Attention !</p>
          <p>Vous avez des paiements en retard.</p>
        </div>
      ) : (
        <div className="mt-4 mb-3 bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
          <p className="font-bold">Tout est à jour!</p>
          <p>Aucun paiement en retard.</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {/* Card 1 : Total TTC des factures pour l'exercice social actuel */}
        <div className="bg-green-300 rounded-lg p-4 shadow-md flex items-center justify-between">
          <div>
            <p className="text-gray-700 text-lg font-semibold">Total facturation exercice social actuel</p>
            <p className="text-gray-700 font-bold">{formatTotalTTC(totalTTCCurrentFiscalYear)}</p>
          </div>
         
        </div>

        {/* Card 2 : Total TTC des factures pour l'exercice social précédent */}
        <div className="bg-white rounded-lg p-4 shadow-md flex items-center justify-between">
          <div>
            <p className="text-gray-700 text-lg font-semibold">Total facturation exercice social précédent</p>
            <p  className="text-gray-700 font-bold">{formatTotalTTC(totalTTCPreviousFiscalYear)}</p>
          </div>
         
        </div>

        {/* Card 3 : Total des paiements en retard */}
        <div className={`bg-white rounded-lg p-4 shadow-md flex items-center justify-between ${totalOverdueAmountCurrentFiscalYear > 0 ? 'bg-red-100' : 'bg-green-100'}`}>
          <div>
            <p className="text-gray-700 text-lg font-semibold">Paiements en retard</p>
            <p className={`text-sm ${totalOverdueAmountCurrentFiscalYear > 0 ? 'text-red-700 font-bold' : 'text-green-700 font-bold '}`}>
              Exercice actuel : {formatTotalTTC(totalOverdueAmountCurrentFiscalYear)}
            </p>
            <p className={`text-sm ${totalOverdueAmountPreviousFiscalYear > 0 ? 'text-red-700 font-bold' : 'text-green-700'}`}>
              Précédent exercice : {formatTotalTTC(totalOverdueAmountPreviousFiscalYear)}
            </p>
          </div>
          
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-700 border">
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
                <td className={`px-4 py-2 border-b font-bold ${invoice.statut === '2' ? 'text-green-400 hover:text-green-500' : 'text-red-400 hover:text-red-700'}`}>
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
