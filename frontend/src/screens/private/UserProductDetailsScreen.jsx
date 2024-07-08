import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductDetailsQuery } from '../../slices/dolibarr/dolliProductApiSlice';
import { useGetStockmovementsQuery } from '../../slices/dolibarr/dolliStockmovementApiSlice';
import Loader from '../../components/shared/Loader';
import Barcode from 'react-barcode';

const UserProductDetailsScreen = () => {
  const { id: productId } = useParams();
  const { data: product, isLoading: loadingProduct, error: errorProduct } = useGetProductDetailsQuery(productId);
  const { data: stockmovements, isLoading: loadingStock, error: errorStock } = useGetStockmovementsQuery();

  if (loadingProduct || loadingStock) {
    return <Loader />;
  }

  if (errorProduct || errorStock) {
    return (
      <p className="text-red-500">
        {typeof (errorProduct || errorStock).data.message === 'string'
          ? (errorProduct || errorStock).data.message
          : 'Une erreur est survenue'}
      </p>
    );
  }

  const stockValue = product.stock_reel * parseFloat(product.price);
  const filteredStockMovements = stockmovements.filter((movement) => movement.product_id === productId);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-xl font-bold">{product.label}</h1>
          <p className='m-2'><strong>Valeur du stock:</strong> <span className='text-white font-bold bg-secondaryColor py-1 px-3 rounded-full'>{stockValue.toLocaleString()} XPF </span></p>
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
