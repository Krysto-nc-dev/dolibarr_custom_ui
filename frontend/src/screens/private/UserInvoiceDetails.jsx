import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetInvoiceDetailsQuery, useGetInvoiceLinesQuery, useGetInvoicePaimentQuery } from '../../slices/dolibarr/dolliInvoiceApiSlices';
import { useGetDocumentsQuery } from '../../slices/dolibarr/dolliDocumentApiSlice';
import Loader from '../../components/shared/Loader';
import { DOLIBAR_URL } from '../../constants';
import { DOLIBARR_API_KEY } from '../../slices/constants';

const UserInvoiceDetails = () => {
  const { id: invoiceId } = useParams();
  const { data: invoice, isLoading: loadingInvoice, error: errorInvoice } = useGetInvoiceDetailsQuery(invoiceId);
  const { data: invoiceLines, isLoading: loadingInvoiceLines, error: errorInvoiceLines } = useGetInvoiceLinesQuery(invoiceId);
  const { data: invoicePayments, isLoading: loadingInvoicePayments, error: errorInvoicePayments } = useGetInvoicePaimentQuery(invoiceId);
  const { data: documents, isLoading: loadingDocuments, error: errorDocuments } = useGetDocumentsQuery({
    modulepart: 'invoice',
    id: invoiceId,
  });

  const handleDownload = async (modulepart, file) => {
    const url = `${DOLIBAR_URL}/documents/download?modulepart=${modulepart}&original_file=${encodeURIComponent(file)}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'DOLAPIKEY': DOLIBARR_API_KEY,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const linkSource = `data:${data['content-type']};base64,${data.content}`;
      const downloadLink = document.createElement('a');
      downloadLink.href = linkSource;
      downloadLink.download = data.level1name + "/" + data.name;
      downloadLink.click();
    } catch (error) {
      console.error('Failed to download document:', error);
    }
  };

  if (loadingInvoice || loadingDocuments || loadingInvoiceLines || loadingInvoicePayments) {
    return <Loader />;
  }

  if (errorInvoice || errorDocuments || errorInvoiceLines || errorInvoicePayments) {
    return (
      <p className="text-red-500">
        {typeof (errorInvoice || errorDocuments || errorInvoiceLines || errorInvoicePayments).data.message === 'string'
          ? (errorInvoice || errorDocuments || errorInvoiceLines || errorInvoicePayments).data.message
          : 'Une erreur est survenue'}
      </p>
    );
  }

  const formatSize = (size) => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    while (size >= 1024 && i < units.length - 1) {
      size /= 1024;
      i++;
    }
    return `${Math.round(size * 10) / 10} ${units[i]}`;
  };

  const totalPayments = invoicePayments.reduce((total, payment) => total + parseFloat(payment.amount), 0);
  const remainingAmount = parseFloat(invoice.total_ttc) - totalPayments;

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-xl font-bold">Facture avec l'id : {invoiceId}</h1>
        
          <p className='m-2'>
            <strong>Total TTC:</strong>
            <span className='text-white font-bold bg-secondaryColor py-1 px-3 rounded-full ml-3'>
              {Number(invoice.total_ttc).toLocaleString()} XPF
            </span>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Détails de la facture</h2>
          <p><strong>Référence:</strong> {invoice.ref}</p>
          <p><strong>Date de création:</strong> {new Date(invoice.date_creation * 1000).toLocaleDateString()}</p>
          <p><strong>Date de validation:</strong> {new Date(invoice.date_validation * 1000).toLocaleDateString()}</p>
          <p><strong>Statut:</strong> {invoice.statut === "1" ? 'Brouillon' : invoice.statut === "2" ? 'Validée' : 'Clôturée'}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Informations supplémentaires</h2>
          <p><strong>Mode de règlement:</strong> {invoice.mode_reglement_code}</p>
          <p><strong>Condition de règlement:</strong> {invoice.cond_reglement_doc}</p>
        </div>
      </div>

      {/* Section des documents */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Documents</h2>
        <table className="min-w-full bg-white">
          <thead className="bg-primaryColor">
            <tr>
              <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Nom</th>
              <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Taille</th>
              <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Date</th>
              <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {documents && documents.length > 0 ? (
              documents.map((document) => (
                <tr key={document.name}>
                  <td className="py-2 px-4 border-b border-gray-200">{document.name}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{formatSize(document.size)}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{new Date(document.date * 1000).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <button
                      onClick={() => handleDownload('invoice', `${document.level1name}/${document.name}`)}
                      className="text-primaryColor underline"
                    >
                      Télécharger
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className='text-dangerColor font-bold text-center py-2'>Aucun document disponible.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Section des lignes de facture */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Lignes de Facture</h2>
        <table className="min-w-full bg-white">
          <thead className="bg-primaryColor">
            <tr>
              <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Produit</th>
              <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Ref</th>
              <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Quantité</th>
              <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Prix Unitaire</th>
              <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Total HT</th>
            </tr>
          </thead>
          <tbody>
            {invoiceLines && invoiceLines.length > 0 ? (
              invoiceLines.map((line) => (
                <tr key={line.id}>
                  <td className="py-2 px-4 border-b border-gray-200">{line.product_label}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{line.ref}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{line.qty}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{Number(line.subprice).toLocaleString()} XPF</td>
                  <td className="py-2 px-4 border-b border-gray-200">{Number(line.total_ht).toLocaleString()} XPF</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className='text-dangerColor font-bold text-center py-2'>Aucune ligne de facture disponible.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Section des paiements */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Règlements</h2>
        <div className="mt-4">
          <p className='text-lg font-semibold flex justify-between max-w-4xl mx-auto my-4 bg-red-100 px-7 py-1 rounded-full'>
            Reste à payer: <span className={remainingAmount > 0 ? 'text-red-500' : 'text-green-500'}>{remainingAmount.toLocaleString()} XPF</span>
          </p>
        </div>
        <table className="min-w-full bg-white">
          <thead className="bg-primaryColor">
            <tr>
              <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Date</th>
              <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Montant</th>
              <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Type</th>
              <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Référence</th>
            </tr>
          </thead>
          <tbody>
            {invoicePayments && invoicePayments.length > 0 ? (
              invoicePayments.map((payment) => (
                <tr key={payment.ref}>
                  <td className="py-2 px-4 border-b border-gray-200">{new Date(payment.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{Number(payment.amount).toLocaleString()} XPF</td>
                  <td className="py-2 px-4 border-b border-gray-200">{payment.type}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{payment.ref}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className='text-dangerColor font-bold text-center py-2'>Aucun règlement effectué.</td>
              </tr>
            )}
          </tbody>
        </table>
       
      </div>
    </div>
  );
};

export default UserInvoiceDetails;
