import React from 'react';

import { BsFillInfoCircleFill } from 'react-icons/bs'; // Importez l'icône Info de react-icons
import { Link } from 'react-router-dom';
import { useGetCampagnesCollecteQuery } from '../../slices/campagneCollectApiSlice';

const UserCampagneCollects = () => {
  const { data: collectCampagnes, error: errorCampagnes, isLoading: loadingCampagnes } = useGetCampagnesCollecteQuery();

  console.log(collectCampagnes);

  if (loadingCampagnes) {
    return <div className="text-center mt-4">Chargement...</div>;
  }

  if (errorCampagnes) {
    return <div className="text-center mt-4 text-red-500">Erreur : {errorCampagnes.message}</div>;
  }

  if (!collectCampagnes || collectCampagnes.length === 0) {
    return (
      <div className="text-center mt-4">
        Aucune Campagne de Collecte
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Actif':
        return 'bg-green-600 text-white';
      case 'Inactif':
      case 'Annulé':
        return 'bg-red-700 text-white';
      default:
        return 'bg-gray-400 text-black';
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Campagnes de Collecte</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-2">Titre</th>
              <th className="px-4 py-2">Type de collecte</th>
              <th className="px-4 py-2">Tier</th>
              <th className="px-4 py-2">Récurrence</th>
              <th className="px-4 py-2">Fréquence</th>
              <th className="px-4 py-2">Adresse</th>
              <th className="px-4 py-2">Statut</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {collectCampagnes.map((campagne) => (
              <tr key={campagne._id}>
                <td className="border px-4 py-2">{campagne.title}</td>
                <td className="border px-4 py-2">{campagne.collectionType}</td>
                <td className="border px-4 py-2">{campagne.dollibarTierId}</td>
                <td className="border px-4 py-2">{campagne.recurring ? 'Oui' : 'Non'}</td>
                <td className="border px-4 py-2">{campagne.frequency}</td>
                <td className="border px-4 py-2">{campagne.address}</td>
                <td>
                   <span className={`px-4 py-2 ${getStatusColor(campagne.status)} rounded-full text-center`}> {campagne.status} </span> 
                </td>
                <td className="border px-4 py-2">
                <Link to={`/campagne-details/${campagne._id}`} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Voir détails <BsFillInfoCircleFill className="ml-3" />
              </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserCampagneCollects;
