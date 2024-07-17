import React, { useState } from 'react'
import {
  useGetPresentationsQuery,
  useAddPresentationMutation,
  useDeletePresentationMutation,
} from '../../slices/presentationApiSlice'
import { Link } from 'react-router-dom'
import Modal from '../../components/shared/Modal'
import { CirclePlus, Edit2Icon, Loader, Trash } from 'lucide-react' // Import de l'icône
import { toast } from 'react-toastify'

const UserPresentationsScreen = () => {
  const {
    data: presentations,
    error: presentationsError,
    isLoading: loadingPresentations,
    refetch: refetchPresentations,
  } = useGetPresentationsQuery()

  const [
    addPresentation,
    { isLoading: loadingCreate },
  ] = useAddPresentationMutation()
  const [deletePresentation] = useDeletePresentationMutation(); // Utilisation de useDeleteEmailMutation
 
  const handleDelete = async (presentationId) => {
    try {
      await deletePresentation(presentationId).unwrap(); // Utilisation de la mutation pour supprimer la présentation
      toast.success("Présentation supprimée avec succès.");
      refetchPresentations(); // Rafraîchir la liste des présentations après la suppression
    } catch (error) {
      console.error('Erreur lors de la suppression de la présentation:', error);
      toast.error("Une erreur est survenue lors de la suppression de la présentation.");
      // Handle error state if needed
    }
  };

  const createProductHandler = async (e) => {
    if (
      window.confirm('Voulez-vous vraiment ajouter une nouvelle présentation ?')
    ) {
      try {
        await addPresentation()

        refetchPresentations()
        toast.success('Présentation créée avec succès')
      } catch (error) {
        console.error("Erreur lors de l'ajout de la présentation :", error)
      }
    }
    // e.preventDefault()
  }

  if (loadingPresentations) {
    return (
      <div className="flex justify-center items-center h-screen">
        Chargement...
      </div>
    )
  }
  
  if (presentationsError) {
    return (
      <div className="text-red-500 text-center mt-4">
        Erreur : {presentationsError.message}
      </div>
    )
  }
  
  // {loadingCreate && <Loader/>}
  return (
    <div className="user-presentations-screen ">
      <div className="flex items-center justify-between mb-7 p-5">
        <h1 className="text-3xl font-bold mb-6 text-center">Présentations</h1>
        {/* Bouton pour ajouter une nouvelle présentation */}
        <button
          onClick={createProductHandler}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 flex items-center"
        >
          {loadingCreate ? (
            <Loader className="mr-2 animate-spin" /> // Ajout de la classe animate-spin pour l'animation
          ) : (
            <CirclePlus className="mr-2" />
          )}
          {loadingCreate ? "Chargement..." : "Ajouter une présentation"}
        </button>
      </div>
      <div className="presentation-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {presentations.map((presentation) => (
          <div
            key={presentation._id}
            className="card bg-white shadow-md rounded-lg overflow-hidden"
          >
            <Link to={`/presentation-details/${presentation._id}`}>
              <img
                src={`http://192.168.178.21:3000/uploads/${presentation.cover}`}
                alt={presentation.title}
                className="w-full h-48 object-cover"
              />
            </Link>
            <div className="card-body p-4 ">
              <h5 className="card-title text-xl font-semibold mb-2 h-20">
                {presentation.title}
              </h5>
              <p className="card-text mb-2 h-20">{presentation.description}</p>
              <p className="card-text">
                <strong>Nombre de diapositives :</strong>{' '}
                {presentation.slides.length}
              </p>
              <div className='flex justify-center items-center gap-20 my-6'>
                <Link to={`/presentation-edit/${presentation._id}`} className='bg-orange-500 py-2 px-4 rounded-md '><Edit2Icon className='text-gray-900'/></Link>
                <button onClick={() => handleDelete(presentation._id)} className='bg-red-500 py-2 px-4 rounded-md '><Trash className='text-gray-900'/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserPresentationsScreen
