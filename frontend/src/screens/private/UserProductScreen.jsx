import React, { useState } from 'react';
import { useGetProductsQuery } from '../../slices/dolibarr/dolliProductApiSlice';
import { ShoppingCart, Briefcase, List, CheckCircle, XCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Loader from '../../components/shared/Loader';

const UserProductScreen = () => {
  const [mode, setMode] = useState(0); // 0: all, 1: products, 2: services
  const [statusBuy, setStatusBuy] = useState(''); // '' for all, '1' for en ventes, '0' for hors ventes

  const { data, isLoading, error } = useGetProductsQuery(mode);

  const filteredData = statusBuy
    ? data?.filter(product => product.status_buy === statusBuy)
    : data;

  const resetFilters = () => {
    setMode(0);
    setStatusBuy('');
  };

  return (
    <div className="h-screen flex flex-col p-4 space-y-4">
      

      <section className='mb-4'>
        <h2 className="text-md font-semibold mb-2">Filtres appliqués</h2>
        <div className="flex items-center gap-3 w-full">
          {mode === 0 && statusBuy === '' ? (
            <p className="text-sm">Aucun filtre appliqué</p>
          ) : (
            <>
              <p className="text-sm">
                {mode === 1 ? 'Type: Produits' : mode === 2 ? 'Type: Services' : 'Type: Tous'}
                {', '}
                {statusBuy === '1' ? 'En ventes' : statusBuy === '0' ? 'Hors ventes' : 'Tout afficher'}
              </p>
              <button
                onClick={resetFilters}
                className="p-2 rounded-lg text-white text-xs flex items-center gap-2 bg-red-500 hover:bg-red-600 transition-colors"
              >
                <X size={16} />
                Réinitialiser
              </button>
            </>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <section>
          <h2 className="text-md font-semibold mb-2">Filtres par type</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setMode(1)}
              className={`p-2 rounded-lg text-white text-xs flex items-center gap-2 ${mode === 1 ? 'bg-yellow-500' : 'bg-blue-500'} hover:bg-yellow-600 transition-colors`}
            >
              <ShoppingCart size={16} />
              Produits
            </button>
            <button
              onClick={() => setMode(2)}
              className={`p-2 rounded-lg text-white text-xs flex items-center gap-2 ${mode === 2 ? 'bg-yellow-500' : 'bg-blue-500'} hover:bg-yellow-600 transition-colors`}
            >
              <Briefcase size={16} />
              Services
            </button>
            <button
              onClick={() => setMode(0)}
              className={`p-2 rounded-lg text-white text-xs flex items-center gap-2 ${mode === 0 ? 'bg-yellow-500' : 'bg-blue-500'} hover:bg-yellow-600 transition-colors`}
            >
              <List size={16} />
              Tous
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-md font-semibold mb-2">Filtres par vente</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setStatusBuy('1')}
              className={`p-2 rounded-lg text-white text-xs flex items-center gap-2 ${statusBuy === '1' ? 'bg-green-500' : 'bg-red-500'} hover:bg-green-600 transition-colors`}
            >
              <CheckCircle size={16} />
              En ventes
            </button>
            <button
              onClick={() => setStatusBuy('0')}
              className={`p-2 rounded-lg text-white text-xs flex items-center gap-2 ${statusBuy === '0' ? 'bg-green-500' : 'bg-red-500'} hover:bg-green-600 transition-colors`}
            >
              <XCircle size={16} />
              Hors ventes
            </button>
            <button
              onClick={() => setStatusBuy('')}
              className={`p-2 rounded-lg text-white text-xs flex items-center gap-2 ${statusBuy === '' ? 'bg-yellow-500' : 'bg-blue-500'} hover:bg-yellow-600 transition-colors`}
            >
              <List size={16} />
              Tout afficher
            </button>
          </div>
        </section>
        
        <section>
          <h2 className="text-md font-semibold mb-2">Nombre de produits</h2>
          <div className="flex items-center gap-3 w-full">
            <p className="text-sm bg-primaryColor text-white px-5 rounded-lg py-2">
              {filteredData ? `${filteredData.length} produits` : 'Aucun produit'}
            </p>
          </div>
        </section>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500">
          {typeof error.data.message === 'string'
            ? error.data.message
            : 'Une erreur est survenue'}
        </p>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b">Référence</th>
                <th className="px-4 py-2 border-b">Nom</th>
                <th className="px-4 py-2 border-b">Prix</th>
                <th className="px-4 py-2 border-b">En stock</th>
                <th className="px-4 py-2 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">
                    <Link to={`/user-product-details/${product.id}`}>
                    {product.ref}
                    </Link>
                    </td>
                  <td className="px-4 py-2 border-b">{product.label}</td>
                  <td className="px-4 py-2 border-b">
                    {Math.round(product.price ?? 0)} XPF
                  </td>
                  <td className="px-4 py-2 border-b">
                    {product.stock_reel != null && (typeof product.stock_reel === 'number' || typeof product.stock_reel === 'string')
                      ? parseFloat(product.stock_reel) === 0
                        ? <span className="text-red-500">Rupture de stock</span>
                        : <span className="text-green-500">{parseFloat(product.stock_reel).toFixed(0)}</span>
                      : <span className="text-red-500">Rupture de stock</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserProductScreen;
