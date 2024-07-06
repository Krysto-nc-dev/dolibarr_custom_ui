import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductDetailsQuery } from '../../slices/dolibarr/dolliProductApiSlice';
import Loader from '../../components/shared/Loader';
import Barcode from 'react-barcode';

const UserProductDetailsScreen = () => {
  const { id: productId } = useParams();
  const { data, isLoading, error } = useGetProductDetailsQuery(productId);

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

  const stockValue = data.stock_reel * parseFloat(data.price);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-xl font-bold">{data.label}</h1>
        <Barcode value={data.barcode} />
      </div>
      <div className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: data.description }} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Détails du produit</h2>
          <p><strong>Référence:</strong> {data.ref}</p>
          <p><strong>Code-barres:</strong> {data.barcode}</p>
          <p><strong>Prix:</strong> {parseFloat(data.price).toFixed(0)} XPF</p>
          <p><strong>Prix minimum:</strong> {parseFloat(data.price_min).toFixed(0)} XPF</p>
          <p><strong>Prix TTC:</strong> {parseFloat(data.price_ttc).toFixed(0)} XPF</p>
          <p><strong>En stock:</strong> {data.stock_reel}</p>
          <p><strong>Valeur du stock:</strong> {stockValue.toFixed(0)} XPF</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Informations supplémentaires</h2>
          <p>
            <strong>En vente:</strong> 
            <span className={data.status_buy === "0" ? 'text-green-700' : 'text-red-700'}>
              {data.status_buy === "0" ? ' Oui' : ' Non'}
            </span>
          </p>
          <p><strong>Statut:</strong> {data.status === "1" ? 'Actif' : 'Inactif'}</p>
          <p><strong>Type:</strong> {data.type === "1" ? 'Service' : 'Produit'}</p>
          <p><strong>Date de création:</strong> {new Date(data.date_creation).toLocaleDateString()}</p>
          <p><strong>Date de modification:</strong> {new Date(data.date_modification).toLocaleDateString()}</p>
          <p><strong>Pays:</strong> {data.country_code}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProductDetailsScreen;
