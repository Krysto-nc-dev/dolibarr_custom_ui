import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../components/shared/Modal';
import {
  useCreateCashierMutation,
  useGetCashiersQuery,
} from '../../slices/cashierApiSlice';
import Loader from '../../components/shared/Loader';
import { EyeIcon } from 'lucide-react';
import {
  useGetThirdPartiesQuery,
  useGetThirdPartyDetailsQuery,
} from '../../slices/dolibarr/dolliThirdPartyApiSlice';
import { toast } from 'react-toastify';

const UserCashierScreen = () => {
  const navigate = useNavigate();
  const {
    data: cashiers,
    error: cashiersError,
    isLoading: loadingCashier,
    refetch: refetchCashiers,
  } = useGetCashiersQuery();
  const {
    data: thirdParties,
    error: errorThirdParties,
    isLoading: loadingThirdParties,
  } = useGetThirdPartiesQuery({ mode: '1' });
  const [addCashier] = useCreateCashierMutation();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    tierId: '',
    placePrice: '', // Assurez-vous que cela est correct pour votre application
  });

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log('Name:', name, 'Value:', value);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convertir placePrice en nombre flottant
    const parsedPlacePrice = parseFloat(formData.placePrice);

    // Vérifier les champs requis
    if (!formData.date || !formData.tierId || isNaN(parsedPlacePrice)) {
      toast.error('Veuillez remplir tous les champs correctement.');
      return;
    }

    try {
      const response = await addCashier({
        ...formData,
        placePrice: parsedPlacePrice, // Assurez-vous d'envoyer le nombre flottant à l'API
      });

      if (response && response.data && response.data._id) {
        toggleModal();
        refetchCashiers();
        setFormData({
          date: '',
          tierId: '',
          placePrice: '', // Réinitialiser à une chaîne vide pour le prochain ajout
        });
        toast.success('La caisse est créée avec succès.');
      } else {
        toast.error(
          'Une erreur est survenue lors de la création de la caisse. Veuillez réessayer.',
        );
      }
    } catch (error) {
      toast.error('Une erreur est survenue lors de la création de la caisse.');
      console.error('Failed to create cashier:', error);
    }
  };

  const getStatusColor = (status) => {
    return status === 'Ouvert'
      ? 'bg-green-500 text-white'
      : 'bg-red-500 text-white';
  };

  if (loadingCashier || loadingThirdParties) {
    return <Loader />;
  }

  if (cashiersError || errorThirdParties) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl font-semibold">
          Error: {cashiersError?.message || errorThirdParties?.message}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Historique des caisses</h1>
        <div>
          <button
            onClick={openModal}
            className="inline-block bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Nouvelle Caisse
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-700 border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-primaryColor text-gray-700">
            <tr>
              <th className="py-3 px-4 text-center">Date</th>
              <th className="py-3 px-4 text-center">Total des ventes</th>
              <th className="py-3 px-4 text-center">Tiers</th>
              <th className="py-3 px-4 text-center">Statut</th>
              <th className="py-3 px-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {cashiers && cashiers.length > 0 ? (
              cashiers.map((cashier) => (
                <tr key={cashier._id}>
                  <td className="py-3 px-4">
                    {new Date(cashier.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">{cashier.totalDaySales} XPF</td>
                  <td className="py-3 px-4">
                    {cashier.tierId ? (
                      <TierName tierId={cashier.tierId} />
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span
                      className={`flex items-center justify-center px-10 py-1 rounded-full font-bold ${getStatusColor(
                        cashier.status,
                      )}`}
                    >
                      {cashier.status === 'Ouvert' ? 'Ouvert' : 'Fermé'}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <Link
                      to={`/cashier-details/${cashier._id}`}
                      className="inline-flex items-center space-x-1 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
                    >
                      <EyeIcon className="w-5 h-5" />
                      <span>Voir les détails</span>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-3 px-4" colSpan="5">
                  Aucune caisse trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Modal closeModal={closeModal}>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Nouvelle Caisse</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-4">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Date:
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Prix de la place
                  </label>
                  <input
                    type="number"
                    name="placePrice"
                    value={formData.placePrice}
                    onChange={handleChange}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Tiers:
                  </label>
                  <select
                    name="tierId"
                    value={formData.tierId}
                    onChange={handleChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  >
                    <option value="">Sélectionnez un tiers</option>
                    {thirdParties &&
                      thirdParties.map((tier) => (
                        <option key={tier.id} value={tier.id}>
                          {tier.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primaryColor hover:bg-primaryColor-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Valider
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

const TierName = ({ tierId }) => {
  const {
    data: tier,
    error: tierError,
    isLoading: loadingTier,
  } = useGetThirdPartyDetailsQuery(tierId);

  if (loadingTier) {
    return <Loader />;
  }

  if (tierError) {
    return <span>Error: {tierError.message}</span>;
  }

  return <span>{tier.name}</span>;
};

export default UserCashierScreen;
