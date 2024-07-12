import React from 'react';
import { useGetCollectesQuery } from '../../slices/collecteApiSlice';
import { BsFillInfoCircleFill } from 'react-icons/bs'; // Importez l'icône Info de react-icons
import { Link } from 'react-router-dom';
const UserCollectsScreen = () => {
  const { data: collectes, error: errorCollectes, isLoading: loadingCollectes } = useGetCollectesQuery();

  console.log(collectes);

  if (loadingCollectes) {
    return <div className="text-center mt-4">Chargement...</div>;
  }

  if (errorCollectes) {
    return <div className="text-center mt-4 text-red-500">Erreur : {errorCollectes.message}</div>;
  }

  if (!collectes || collectes.length === 0) {
    return (
      <div className="text-center mt-4">
        Aucune Collectes
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'En attente':
        return 'bg-yellow-700 ';
      case 'En cours':
        return 'bg-green-600 text-white';
      case 'Terminée':
      case 'Annulée':
        return 'bg-red-700 text-white';
      default:
        return 'bg-gray-400 text-black';
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Collectes de plastiques</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-2">Titre</th>
              <th className="px-4 py-2">Type de collecte</th>
              <th className="px-4 py-2">Récurrence</th>
              <th className="px-4 py-2">Fréquence</th>
              <th className="px-4 py-2">Adresse</th>
              <th className="px-4 py-2">Statut</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {collectes.map((collecte) => (
              <tr key={collecte._id}>
                <td className="border px-4 py-2">{collecte.title}</td>
                <td className="border px-4 py-2">{collecte.collectionType}</td>
                <td className="border px-4 py-2">{collecte.recurring ? 'Oui' : 'Non'}</td>
                <td className="border px-4 py-2">{collecte.frequency}</td>
                <td className="border px-4 py-2">{collecte.address}</td>
                <td >
                   <span className={`px-4 py-2 ${getStatusColor(collecte.status)} rounded-full text-center`}> {collecte.status} </span> 
                </td>
                <td className="border px-4 py-2">
                <Link to={`/collecte-details/${collecte._id}`} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
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

export default UserCollectsScreen;
