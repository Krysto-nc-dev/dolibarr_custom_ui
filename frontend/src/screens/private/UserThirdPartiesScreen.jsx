import React from 'react';
import { useGetThirdPartiesQuery } from '../../slices/dolibarr/dolliThirdPartyApiSlice';

const UserThirdPartiesScreen = () => {
  const {
    data: tiers,
    isLoading,
    error
  } = useGetThirdPartiesQuery();

  console.log(tiers);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestion des tiers</h1>
      {/* {isLoading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p>Erreur : {error.message}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border-b">Nom</th>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">Adresse</th>
              </tr>
            </thead>
            <tbody>
              {tiers && tiers.map((tier) => (
                <tr key={tier.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{tier.name}</td>
                  <td className="px-4 py-2 border-b">{tier.email}</td>
                  <td className="px-4 py-2 border-b">{tier.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} */}
    </div>
  );
}

export default UserThirdPartiesScreen;
