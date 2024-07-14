import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../components/shared/Modal';
import { useCreateCashierMutation, useGetCashiersQuery } from '../../slices/cashierApiSlice';
import Loader from '../../components/shared/Loader';
import { EyeIcon } from 'lucide-react';
import { useGetThirdPartiesQuery, useGetThirdPartyDetailsQuery } from '../../slices/dolibarr/dolliThirdPartyApiSlice';
import { toast } from 'react-toastify';

const UserCashierScreen = () => {
    const navigate = useNavigate();
    const { data: cashiers, error: cashiersError, isLoading: loadingCashier, refetch: refetchCashiers } = useGetCashiersQuery();
    const { data: thirdParties, error: errorThirdParties, isLoading: loadingThirdParties } = useGetThirdPartiesQuery({ mode: "1" });
    const [addCashier] = useCreateCashierMutation();

    console.log(cashiers);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        date: '',
        tierId: '',
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
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    
    //     console.log(formData); // Vérifier le contenu de formData
    
    //     try {
    //         // Assurez-vous que formData contient bien date et tierId
    //         const newCashier = await addCashier(formData).unwrap();
    //         navigate(`/cashier-details/${newCashier._id}`);
    //         closeModal(); // Fermer le modal après soumission réussie
    //         refetchCashiers(); // Rafraîchir la liste des caisses pour mettre à jour
    //         // Optionnel : Réinitialiser les données du formulaire après une soumission réussie
    //         setFormData({
    //             date: '',
    //             tierId: '',
    //         });
    //     } catch (error) {
    //         toast.error("Une erreur est survenue lors de la création de la caisse.");
    //         console.error('Failed to create cashier:', error);
    //         // Gérer l'état d'erreur si nécessaire
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Vérifie que formData contient bien date et tierId
        if (!formData.date || !formData.tierId) {
            toast.error("Veuillez sélectionner une date et un tiers valides.");
            return;
        }
    
        try {
            const response = await addCashier(formData);
            
            // Assurez-vous que la réponse contient bien les données du nouveau caissier
            if (response && response.data && response.data._id) {
                
                toggleModal(); // Fermer le modal après une soumission réussie
                refetchCashiers(); // Rafraîchir la liste des caisses pour mettre à jour
                // Réinitialiser les données du formulaire après une soumission réussie
                setFormData({
                    date: '',
                    tierId: '',
                });
                toast.success("La caisse est créer avec succée")
            } else {
                toast.error("Une erreur est survenue lors de la création de la caisse. Les données du caissier ne sont pas disponibles.");
            }
        } catch (error) {
            toast.error("Une erreur est survenue lors de la création de la caisse.");
            console.error('Failed to create cashier:', error);
            // Gérer l'état d'erreur si nécessaire
        }
    };
    
    

    // Fonction pour obtenir la classe CSS en fonction du statut du caissier
    const getStatusColor = (status) => {
        return status === 'Ouvert' ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
    };

    if (loadingCashier || loadingThirdParties) {
        return <Loader />;
    }

    if (cashiersError || errorThirdParties) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-red-500 text-xl font-semibold">Error: {cashiersError?.message || errorThirdParties?.message}</div>
            </div>
        );
    }

    return (
        <div className="mx-auto p-4">
            <div className='flex justify-between items-center mb-4'>
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
                                    <td className="py-3 px-4">{new Date(cashier.date).toLocaleDateString()}</td>
                                    <td className="py-3 px-4">{cashier.totalDaySales} XPF</td>
                                    <td className="py-3 px-4">
                                        {cashier.tierId ? (
                                            <TierName tierId={cashier.tierId} />
                                        ) : (
                                            "N/A"
                                        )}
                                    </td>
                                    <td className="py-3 px-2 text-center">
                                        <span className={`flex items-center justify-center px-10 py-1 rounded-full font-bold ${getStatusColor(cashier.status)}`}>
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
                                <td className="py-3 px-4" colSpan="5">Aucune caisse trouvée</td>
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
                                    <label className="block text-sm font-medium text-gray-700">Date:</label>
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
                                    <label className="block text-sm font-medium text-gray-700">Tiers:</label>
                                    <select
                                        name="tierId"
                                        value={formData.tierId}
                                        onChange={handleChange}
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    >
                                        <option value="">Sélectionnez un tiers</option>
                                        {thirdParties && thirdParties.map((tier) => (
                                            <option key={tier.id} value={tier.id}>{tier.name}</option>
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
    const { data: tier, error: tierError, isLoading: loadingTier } = useGetThirdPartyDetailsQuery(tierId);

    if (loadingTier) {
        return <Loader />;
    }

    if (tierError) {
        return <span>Error: {tierError.message}</span>;
    }

    return <span>{tier.name}</span>;
};

export default UserCashierScreen;
