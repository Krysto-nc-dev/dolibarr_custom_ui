import React, { useState, useEffect } from 'react';
import { useGetThirdPartiesQuery } from '../../slices/dolibarr/dolliThirdPartyApiSlice';
import { Link } from 'react-router-dom';
import Loader from '../../components/shared/Loader';

const UserThirdPartiesScreen = () => {
  const [filter, setFilter] = useState('all'); // all, client, prospect, fournisseur
  const { data: tiers, isLoading, error } = useGetThirdPartiesQuery();
  const [filteredTiers, setFilteredTiers] = useState([]);

  useEffect(() => {
    if (tiers) {
      const filtered = tiers.filter((tier) => {
        if (filter === 'client') return tier.client === "1";
        if (filter === 'prospect') return tier.client === "2";
        if (filter === 'fournisseur') return tier.fournisseur === "1";
        return true;
      });
      setFilteredTiers(filtered);
    }
  }, [tiers, filter]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const getTierType = (tier) => {
    if (tier.client === "1") return "Client";
    if (tier.client === "2") return "Prospect";
    if (tier.fournisseur === "1") return "Fournisseur";
    return "Autre";
  };

  const getTierTypeClass = (tier) => {
    if (tier.client === "1") return "bg-blue-200 text-blue-800 px-2 py-1 rounded-full font-semibold";
    if (tier.client === "2") return "bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full font-semibold";
    if (tier.fournisseur === "1") return "bg-green-200 text-green-800 px-2 py-1 rounded-full font-semibold";
    return "bg-red-200 text-gray-800 px-2 py-1 rounded-full font-semibold";
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tiers ({filteredTiers.length})</h1>
      <div className="mb-4">
        <label htmlFor="filter" className="mr-4 ml-1">Filter par:</label>
        <select id="filter" value={filter} onChange={handleFilterChange} className="p-1 text-sm  bg-gray-700 rounded">
          <option value="all">Tous</option>
          <option value="client">Client</option>
          <option value="prospect">Prospect</option>
          <option value="fournisseur">Fournisseur</option>
        </select>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>Erreur : {error.message}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-primaryColor text-textColor">
                <th className="px-4 py-2 border-b">Nom</th>
                <th className="px-4 py-2 border-b">Type</th>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">Adresse</th>
              </tr>
            </thead>
            <tbody>
              {filteredTiers.map((tier) => (
                <tr key={tier.id} className="hover:bg-gray-500 bg-gray-700">
                  <td className="px-4 py-2 border-b">
                    <Link to={`/user-third-party-details/${tier.id}`}>
                      {tier.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <span className={getTierTypeClass(tier)}>
                      {getTierType(tier)}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b">{tier.email}</td>
                  <td className="px-4 py-2 border-b">{tier.address}</td>
               
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserThirdPartiesScreen;
