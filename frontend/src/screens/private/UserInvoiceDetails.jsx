import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetInvoiceDetailsQuery } from '../../slices/dolibarr/dolliInvoiceApiSlices';
import { useGetDocumentsQuery } from '../../slices/dolibarr/dolliDocumentApiSlice';
import Loader from '../../components/shared/Loader';
import { DOLIBAR_URL } from '../../constants';
import { DOLIBARR_API_KEY } from '../../slices/constants';

const UserInvoiceDetails = () => {
  const { id: invoiceId } = useParams();
  const { data: invoice, isLoading: loadingInvoice, error: errorInvoice } = useGetInvoiceDetailsQuery(invoiceId);
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

  if (loadingInvoice || loadingDocuments) {
    return <Loader />;
  }

  if (errorInvoice || errorDocuments) {
    return (
      <p className="text-red-500">
        {typeof (errorInvoice || errorDocuments).data.message === 'string'
          ? (errorInvoice || errorDocuments).data.message
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

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-xl font-bold">Facture avec l'id : {invoiceId}</h1>
          <p className='m-2'>
            <strong>Total HT:</strong>
            <span className='text-white font-bold bg-secondaryColor py-1 px-3 rounded-full'>
              {Number(invoice.total_ht).toLocaleString()} XPF
            </span>
          </p>
          <p className='m-2'>
            <strong>Total TTC:</strong>
            <span className='text-white font-bold bg-secondaryColor py-1 px-3 rounded-full'>
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
          <p><strong>Projet:</strong> {invoice.fk_project}</p>
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
    </div>
  );
};

export default UserInvoiceDetails;
