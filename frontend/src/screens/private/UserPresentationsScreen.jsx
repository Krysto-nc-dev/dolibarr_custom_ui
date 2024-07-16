import React, { useState } from 'react';
import { useGetPresentationsQuery, useAddPresentationMutation } from '../../slices/presentationApiSlice';
import { Link } from 'react-router-dom';
import Modal from '../../components/shared/Modal';
import { CirclePlus } from 'lucide-react'; // Import de l'icône

const UserPresentationsScreen = () => {
  const { data: presentations, error: presentationsError, isLoading: loadingPresentations, refetch: refetchPresentations } = useGetPresentationsQuery();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    
  });

  const [addPresentation] = useAddPresentationMutation();

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



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ajouter la présentation sans la couverture
      const presentationData = {
        title: formData.title,
        description: formData.description,
      };

      const { data: newPresentation } = await addPresentation(presentationData);

      // Si l'ajout de la présentation réussit, vérifiez s'il y a une couverture à télécharger
  
      toggleModal(); // Fermer le modal après une soumission réussie
      refetchPresentations(); // Rafraîchir la liste des présentations pour mettre à jour
      // Réinitialiser le formulaire si nécessaire
      setFormData({
        title: '',
        description: '',
        cover:"",
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la présentation :', error);
      // Gérer l'état d'erreur si nécessaire
    }
  };



  if (loadingPresentations) {
    return <div className="flex justify-center items-center h-screen">Chargement...</div>;
  }

  if (presentationsError) {
    return <div className="text-red-500 text-center mt-4">Erreur : {presentationsError.message}</div>;
  }

  return (
    <div className="user-presentations-screen ">
        <div className='flex items-center justify-between mb-7 p-5'>

      <h1 className="text-3xl font-bold mb-6 text-center">Présentations</h1>
           {/* Bouton pour ajouter une nouvelle présentation */}
           <button onClick={toggleModal} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 flex">
        <CirclePlus className="mr-2" /> Ajouter une présentation
      </button>
        </div>
      <div className="presentation-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {presentations.map((presentation) => (
          <Link to={`/presentation-details/${presentation._id}`} key={presentation._id} className="card bg-white shadow-md rounded-lg overflow-hidden">
              <img src={`http://192.168.178.21:3000/uploads/${presentation.cover}`} alt={presentation.title} className="w-full h-48 object-cover"/>
            {/* {presentation.slides.length > 0 && presentation.slides[0].image && (
            )} */}
            <div className="card-body p-4">
              <h5 className="card-title text-xl font-semibold mb-2">{presentation.title}</h5>
              <p className="card-text mb-2">{presentation.description}</p>
              <p className="card-text"><strong>Nombre de diapositives :</strong> {presentation.slides.length}</p>
            </div>
          </Link>
        ))}
      </div>

 

      {/* Modal pour ajouter une nouvelle présentation */}
      {showModal && (
        <Modal closeModal={toggleModal}>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Ajouter une présentation</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Titre :</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description :</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className=" text-backgroundColor p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  rows="4"
                ></textarea>
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-gray-700">Image de couverture :</label>
                <input
                  type="file"
                  accept="image/*"
                  name="cover"
                  onChange={handleFileChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                 
                />
              </div> */}
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserPresentationsScreen;
