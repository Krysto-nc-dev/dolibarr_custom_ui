import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetThirdPartyDetailsQuery } from '../../slices/dolibarr/dolliThirdPartyApiSlice';
import { useGetContactsQuery } from '../../slices/dolibarr/dolliContactApiSlice';
import Loader from '../../components/shared/Loader';

const UserThirdpartieDetails = () => {
  const { id: thirdpartieId } = useParams();
  const { data: thirdparty, error: erroThirdparty, isLoading: loadingThirdparty } = useGetThirdPartyDetailsQuery(thirdpartieId);
  const { data: contacts, error: errorContact, isLoading: loadingContacts } = useGetContactsQuery();

  const getTierTypeLabel = (tier) => {
    if (tier.client === "1") return "Client";
    if (tier.client === "2") return "Prospect";
    if (tier.fournisseur === "1") return "Fournisseur";
    return "Inconnu";
  };

  const getTierTypeClass = (tier) => {
    if (tier.client === "1") return "bg-blue-200 text-blue-800 px-2 py-1 rounded-full font-semibold";
    if (tier.client === "2") return "bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full font-semibold";
    if (tier.fournisseur === "1") return "bg-green-200 text-green-800 px-2 py-1 rounded-full font-semibold";
    return "bg-red-200 text-gray-800 px-2 py-1 rounded-full font-semibold";
  };

  if (loadingThirdparty || loadingContacts) return <Loader />;
  if (erroThirdparty) return <p>Erreur : {erroThirdparty.message}</p>;
  if (errorContact) return <p>Erreur : {errorContact.message}</p>;

  const filteredContacts = contacts.filter(contact => contact.socid === thirdpartieId);

  return (
    <div className="p-6 max-w-9xl mx-auto bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Détails du Tiers : <span className='text-primaryColor'> {thirdparty.name} </span> </h1>
        <Link to={`/edit-third-party/${thirdparty.id}`} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Modifier
        </Link>
      </div>
      <div className={`mb-4 inline-block ${getTierTypeClass(thirdparty)}`}>
        {getTierTypeLabel(thirdparty)}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-primaryColor">Contact</h2>
          <p><strong>Email:</strong> {thirdparty.email || 'Aucun'}</p>
          <p><strong>Téléphone:</strong> {thirdparty.phone || 'Aucun'}</p>
          <p><strong>Adresse:</strong> {thirdparty.address}</p>
          <p><strong>Code Postal:</strong> {thirdparty.zip}</p>
          <p><strong>Ville:</strong> {thirdparty.town || 'Aucun'}</p>
          <p><strong>Pays:</strong> {thirdparty.country_code}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-primaryColor">Informations Supplémentaires</h2>
          <p><strong>URL:</strong> <a href={thirdparty.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{thirdparty.url}</a></p>
          <p><strong>Code Client:</strong> {thirdparty.code_client}</p>
          <p><strong>Code Fournisseur:</strong> {thirdparty.code_fournisseur || 'Aucun'}</p>
          <p><strong>SIRET:</strong> {thirdparty.siret || 'Aucun'}</p>
          <p><strong>TVA Intra:</strong> {thirdparty.tva_intra || 'Aucun'}</p>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2 text-primaryColor">Contacts Liés a ce tier</h2>
        {filteredContacts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-primaryColor text-textColor">
                  <th className="px-4 py-2 border-b">genre</th>
                  <th className="px-4 py-2 border-b">Nom</th>
                  <th className="px-4 py-2 border-b">Email</th>
                  <th className="px-4 py-2 border-b">Téléphone pro</th>
                  <th className="px-4 py-2 border-b">Téléphone perso</th>
                  <th className="px-4 py-2 border-b">Téléphone mobile</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map(contact => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{contact.civility_code}</td>
                    <td className="px-4 py-2 border-b">{contact.firstname + " " + contact.lastname}</td>
                    <td className="px-4 py-2 border-b"><a href={`mailto:${contact.email}`} className="text-blue-500 underline">{contact.email}</a></td>
                    <td className="px-4 py-2 border-b">{contact.phone_pro}</td>
                    <td className="px-4 py-2 border-b">{contact.phone_perso}</td>
                    <td className="px-4 py-2 border-b">{contact.phone_mobile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className='text-dangerColor font-bold'>Aucun contact trouvé pour ce tier.</p>
        )}
      </div>
    </div>
  );
};

export default UserThirdpartieDetails;
