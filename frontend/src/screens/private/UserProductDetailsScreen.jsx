import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductDetailsQuery } from '../../slices/dolibarr/dolliProductApiSlice';
import { useGetStockmovementsQuery } from '../../slices/dolibarr/dolliStockmovementApiSlice';
import Loader from '../../components/shared/Loader';
import Barcode from 'react-barcode';
import { useGetDocumentsQuery } from '../../slices/dolibarr/dolliDocumentApiSlice';
import { DOLIBAR_URL } from '../../constants';
import { DOLIBARR_API_KEY } from '../../slices/constants';

const UserProductDetailsScreen = () => {
  const { id: productId } = useParams();
  const { data: product, isLoading: loadingProduct, error: errorProduct } = useGetProductDetailsQuery(productId);
  const { data: stockmovements, isLoading: loadingStock, error: errorStock } = useGetStockmovementsQuery();
  const { data: documents, isLoading: loadingDocuments, error: errorDocuments } = useGetDocumentsQuery({
    modulepart: 'product',
    id: productId,
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
      downloadLink.download = data.filename;
      downloadLink.click();
    } catch (error) {
      console.error('Failed to download document:', error);
    }
  };

  if (loadingProduct || loadingStock || loadingDocuments) {
    return <Loader />;
  }

  if (errorProduct || errorStock || errorDocuments) {
    return (
      <p className="text-red-500">
        {typeof (errorProduct || errorStock || errorDocuments).data.message === 'string'
          ? (errorProduct || errorStock || errorDocuments).data.message
          : 'Une erreur est survenue'}
      </p>
    );
  }

  const stockValue = product.stock_reel * parseFloat(product.price);
  const filteredStockMovements = stockmovements.filter((movement) => movement.product_id === productId);

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
          <h1 className="text-xl font-bold">{product.label}</h1>
          <p className='m-2'>
            <strong>Valeur du stock:</strong>
            <span className='text-white font-bold bg-secondaryColor py-1 px-3 rounded-full'>
              {stockValue.toLocaleString()} XPF
            </span>
          </p>
        </div>
        <Barcode value={product.barcode} />
      </div>
      <div className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: product.description }} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Détails du produit</h2>
          <p><strong>Référence:</strong> {product.ref}</p>
          <p><strong>Code-barres:</strong> {product.barcode}</p>
          <p><strong>Prix:</strong> {Number(product.price).toLocaleString()} XPF</p>
          <p><strong>Prix minimum:</strong> {Number(product.price_min).toLocaleString()} XPF</p>
          <p><strong>Prix TTC:</strong> {Number(product.price_ttc).toLocaleString()} XPF</p>
          <p><strong>En stock:</strong> {product.stock_reel}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Informations supplémentaires</h2>
          <p>
            <strong>En vente:</strong>
            <span className={product.status_buy === "0" ? 'text-green-700' : 'text-red-700'}>
              {product.status_buy === "0" ? ' Oui' : ' Non'}
            </span>
          </p>
          <p><strong>Statut:</strong> {product.status === "1" ? 'Actif' : 'Inactif'}</p>
          <p><strong>Type:</strong> {product.type === "1" ? 'Service' : 'Produit'}</p>
          <p><strong>Date de création:</strong> {new Date(product.date_creation).toLocaleDateString()}</p>
          <p><strong>Date de modification:</strong> {new Date(product.date_modification).toLocaleDateString()}</p>
          <p><strong>Pays:</strong> {product.country_code}</p>
        </div>
      </div>

      {/* Section des documents */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Documents</h2>
        <table className="min-w-full bg-white">
          <thead className="bg-primaryColor">
            <tr>
              <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Image</th>
              <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Nom</th>
              <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Taille</th>
              <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Date</th>
              <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {documents && documents.ecmfiles_infos && documents.ecmfiles_infos.length > 0 ? (
              documents.ecmfiles_infos.map((docInfo) => {
                const document = documents[parseInt(docInfo.position) - 1];
                if (!document) {
                  return null;
                }
                return (
                  <tr key={document.name}>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <img
                        src={`https://crm.krysto.nc/documents/produit/${document.level1name}/${encodeURIComponent(document.name)}`}
                        alt={document.name}
                        className="max-h-16"
                      />
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">{document.name}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{formatSize(document.size)}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{new Date(document.date * 1000).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <button
                        onClick={() => handleDownload('product', `${document.level1name}/${document.name}`)}
                        className="text-primaryColor underline"
                      >
                        Télécharger
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className='text-dangerColor font-bold text-center py-2'>Aucun document disponible.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Section des mouvements de stock */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Mouvements de Stock</h2>
        <table className="min-w-full bg-white">
          <thead className="bg-primaryColor">
            <tr>
              <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Date</th>
              <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Quantité</th>
              <th className="py-2 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredStockMovements.map((movement) => (
              <tr
                key={movement.id}
                className={movement.type === "0" ? 'bg-green-200' : 'bg-red-200'}
              >
                <td className="py-2 px-4 border-b border-gray-200">{new Date(movement.datem * 1000).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b border-gray-200">{Number(movement.qty).toLocaleString()}</td>
                <td className="py-2 px-4 border-b border-gray-200">{movement.type === "0" ? 'Entrée' : 'Sortie'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProductDetailsScreen;
