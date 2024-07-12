import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetCollecteByIdQuery } from '../../slices/collecteApiSlice';
import Loader from '../../components/shared/Loader';
import Barcode from 'react-barcode';
import { useGetThirdPartyDetailsQuery } from '../../slices/dolibarr/dolliThirdPartyApiSlice';

const UserCollecteDetailsScreen = () => {
  const { id: collecteId } = useParams();
  const { data: collecte, error: errorCollecte, isLoading: loadingCollecte } = useGetCollecteByIdQuery(collecteId);

  const { data: tier, error: errorTier, isLoading: loadingTier } = useGetThirdPartyDetailsQuery(collecte?.dollibarTierId);

  if (loadingCollecte || loadingTier) {
    return <Loader />;
  }

  if (errorCollecte) {
    return <div className="text-center mt-4 text-red-500">Erreur : {errorCollecte.message}</div>;
  }

  if (errorTier) {
    return <div className="text-center mt-4 text-red-500">Erreur : {errorTier.message}</div>;
  }

  if (!collecte) {
    return <div className="text-center mt-4">Collecte non trouvée</div>;
  }

  return (
    <div className="p-4 min-h-screen text-textColor">
      <h1 className="text-3xl font-bold text-center text-primaryColor">Détails de la Collecte</h1>
      <div className="p-6 rounded-lg">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-primaryColor mb-2">{collecte.title}</h2>
            <p className="text-lg mb-2"><strong>Détails :</strong> {collecte.description}</p>
            <p className="text-lg mb-2"><strong>Type de collecte :</strong> {collecte.collectionType}</p>
            <p className="text-lg mb-2"><strong>Contrat :</strong> {collecte.contract}</p>
            <p className="text-lg mb-2"><strong>Tiers :</strong>  <Link to={`/user-third-party-details/${collecte.dollibarTierId}`} className='hover:text-secondaryColor'>{tier ? tier.name : 'Non défini'}</Link></p>
            <p className="text-lg mb-2"><strong>Récurrence :</strong> {collecte.recurring ? 'Oui' : 'Non'}</p>
            {collecte.recurring && (
              <>
                <p className="text-lg mb-2"><strong>Fréquence :</strong> {collecte.frequency}</p>
                <p className="text-lg mb-2"><strong>Date de début :</strong> {new Date(collecte.startDate).toLocaleDateString()}</p>
                <p className="text-lg mb-2"><strong>Date de fin :</strong> {new Date(collecte.endDate).toLocaleDateString()}</p>
              </>
            )}
            <p className="text-lg mb-2"><strong>Adresse :</strong> {collecte.address}</p>
            <p className="text-lg mb-2"><strong>Date de création :</strong> {new Date(collecte.createdAt).toLocaleDateString()}</p>
            <p className="text-lg mb-2"><strong>Dernière modification :</strong> {new Date(collecte.updatedAt).toLocaleDateString()}</p>
          </div>
          <div className="flex flex-col items-center">
            <span className={`text-lg font-semibold py-1 px-4 rounded ${getStatusColorClass(collecte.status)}`}>{collecte.status}</span>
            {collecte.barcode && (
              <div className="mt-4">
                <Barcode value={collecte.barcode} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Fonction utilitaire pour obtenir la classe CSS en fonction du statut
const getStatusColorClass = (status) => {
  switch (status) {
    case 'En attente':
      return 'bg-yellow-400 text-yellow-800';
    case 'En cours':
      return 'bg-green-400 text-green-800';
    case 'Terminée':
    case 'Annulée':
      return 'bg-red-400 text-red-800';
    default:
      return 'bg-gray-400 text-gray-800';
  }
};

export default UserCollecteDetailsScreen;
