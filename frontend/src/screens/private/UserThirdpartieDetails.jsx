import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetThirdPartyDetailsQuery } from '../../slices/dolibarr/dolliThirdPartyApiSlice';
import Loader from '../../components/shared/Loader';

const UserThirdpartieDetails = () => {
  const { id: thirdpartieId } = useParams();
  const { data: thirdparty, error: erroThirdparty, isLoading: loadingThirdparty } = useGetThirdPartyDetailsQuery(thirdpartieId);
  
  if (loadingThirdparty) return <Loader />;
  if (erroThirdparty) return <p>Erreur : {erroThirdparty.message}</p>;
  
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Détails du Tiers</h1>
        <Link to={`/edit-third-party/${thirdparty.id}`} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Modifier
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold">Informations Générales</h2>
          <p><strong>Nom:</strong> {thirdparty.name}</p>
          <p><strong>ID:</strong> {thirdparty.id}</p>
          <p><strong>Statut:</strong> {thirdparty.status}</p>
          <p><strong>Client:</strong> {thirdparty.client}</p>
          <p><strong>Prospect:</strong> {thirdparty.prospect}</p>
          <p><strong>Fournisseur:</strong> {thirdparty.fournisseur}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Contact</h2>
          <p><strong>Email:</strong> {thirdparty.email || 'Aucun'}</p>
          <p><strong>Téléphone:</strong> {thirdparty.phone || 'Aucun'}</p>
          <p><strong>Adresse:</strong> {thirdparty.address}</p>
          <p><strong>Code Postal:</strong> {thirdparty.zip}</p>
          <p><strong>Ville:</strong> {thirdparty.town || 'Aucun'}</p>
          <p><strong>Pays:</strong> {thirdparty.country_code}</p>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Informations Supplémentaires</h2>
        <p><strong>URL:</strong> <a href={thirdparty.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{thirdparty.url}</a></p>
        <p><strong>Code Client:</strong> {thirdparty.code_client}</p>
        <p><strong>Code Fournisseur:</strong> {thirdparty.code_fournisseur || 'N/A'}</p>
        <p><strong>SIRET:</strong> {thirdparty.siret || 'N/A'}</p>
        <p><strong>TVA Intra:</strong> {thirdparty.tva_intra || 'N/A'}</p>
      </div>
    </div>
  );
};

export default UserThirdpartieDetails;
