import React, { useState } from 'react';
import { useGetProductsQuery } from '../../slices/dolibarr/dolliProductApiSlice';
import { AlertCircle } from 'lucide-react';
const UserPlasticStocks = () => {
  const [selectedPlasticType, setSelectedPlasticType] = useState('');
  const { data: pailletes, error: errorPaillettes, isLoading: loadingPailletes } = useGetProductsQuery({
    mode: 1,
    variant_filter: 3,
    category: 38
  });

  if (loadingPailletes) return <div>Loading...</div>;
  if (errorPaillettes) return <div>Error loading products</div>;

  const plasticTypes = {
    '1': 'PET',
    '2': 'HDPE',
    '3': 'PVC',
    '4': 'LDPE',
    '5': 'PP',
    '6': 'PS',
    '7': 'Autres'
  };

  const filteredPailletes = selectedPlasticType
    ? pailletes.filter(paillette => paillette.array_options?.options_type_plastique === selectedPlasticType)
    : pailletes;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Stock de paillettes plastique</h1>
      <div className="mb-4">
        <label htmlFor="plasticType" className="block text-sm font-bold mb-2">Filtrer par type de plastique:</label>
        <select
          id="plasticType"
          value={selectedPlasticType}
          onChange={e => setSelectedPlasticType(e.target.value)}
          className="block appearance-none w-full bg-gray-700 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Tous</option>
          {Object.entries(plasticTypes).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>
      {filteredPailletes.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-red-400 text-2xl mt-40">
          <AlertCircle className="mb-2" size={40} />
          <span>Aucune référence trouvée</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPailletes.map(paillette => (
            <div key={paillette.id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{paillette.label}</h2>
              <p className="text-gray-600 mb-2"><strong>Référence:</strong> {paillette.ref}</p>
              <p className="text-gray-600 mb-2">
                <strong>Description:</strong>
                <span  dangerouslySetInnerHTML={{ __html: paillette.description }} />
              </p>
              <p className="text-gray-600 mb-2"><strong>Poids unitaire:</strong> {paillette.weight} kg</p>
              <p className="text-gray-600 mb-2"><strong>En stock:</strong> {paillette.stock_reel ?? 0}</p>
              <p className="text-gray-600 mb-2"><strong>Prix:</strong> {paillette.price_ttc} F</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserPlasticStocks;
