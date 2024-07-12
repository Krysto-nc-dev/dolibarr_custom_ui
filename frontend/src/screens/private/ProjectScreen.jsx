import React, { useState } from 'react';
import { useGetProjectsQuery } from '../../slices/projectApiSlice';
import { BsFillInfoCircleFill } from 'react-icons/bs'; // Importez l'icône Info de react-icons
import { Link } from 'react-router-dom';

const ProjectScreen = () => {
  const { data: projects, error: errorProjects, isLoading: loadingProjects } = useGetProjectsQuery();
  const [selectedStatus, setSelectedStatus] = useState('Tous'); // État du filtre initialisé à 'Tous'

  if (loadingProjects) {
    return <div className="text-center mt-4">Chargement en cours...</div>;
  }

  if (errorProjects) {
    return <div className="text-center mt-4 text-red-500">Erreur : {errorProjects.message}</div>;
  }

  // Filtrer les projets en fonction du statut sélectionné
  const filteredProjects = projects.filter(project => {
    if (selectedStatus === 'Tous') {
      return true; // Afficher tous les projets si 'Tous' est sélectionné
    } else {
      return project.status === selectedStatus; // Sinon, filtrer par statut sélectionné
    }
  });

  return (
    <div className="mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Liste des Projets</h1>

      {/* Menu déroulant pour filtrer par statut */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-textColor mb-1">Filtrer par statut :</label>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="block w-full bg-gray-500 border border-gray-500 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="Tous">Tous</option>
          <option value="En cours">En cours</option>
          <option value="Terminé">Terminé</option>
          <option value="En attente">En attente</option>
          <option value="Proposition">Proposition</option>
          <option value="Annulé">Annulé</option>
        </select>
      </div>

      {/* Liste des projets filtrés */}
      {filteredProjects.length === 0 ? (
        <p className="text-center text-red-500">Aucun projet trouvé pour ce statut.</p>
      ) : (
        filteredProjects.map((project) => (
          <div key={project._id} className="bg-gray-700 rounded-lg shadow-md p-6 mb-4 text-sm">
            <div className="flex justify-between items-center mb-4">
              <span className={getStatusColorClass(project.status) + " px-3 py-1 text-sm font-semibold rounded-full"}>
                {project.status}
              </span>
              <Link to={`/projects/${project._id}`} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Voir détails <BsFillInfoCircleFill className="ml-1" />
              </Link>
            </div>
            <h2 className="text-xl font-bold mb-2 text-secondaryColor">{project.title}</h2>
            <p className="text-textColor mb-4">{project.description}</p>
            <div className="flex flex-wrap mb-4">
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-2">
                <strong>Type:</strong> {project.projectType}
              </div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-2">
                <strong>Date de début:</strong> {new Date(project.startDate).toLocaleDateString()}
              </div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-2">
                <strong>Date de fin:</strong> {new Date(project.endDate).toLocaleDateString()}
              </div>
            </div>
            <div className="flex flex-wrap mb-4">
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-2">
                <strong>Budget:</strong> {project.budget} €
              </div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-2">
                <strong>Catégorie:</strong> {project.category}
              </div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-2">
                <strong>Membres de l'équipe:</strong> {project.teamMembers.length}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

// Fonction utilitaire pour définir la classe de couleur en fonction du statut du projet
const getStatusColorClass = (status) => {
  switch (status) {
    case 'En cours':
      return 'bg-green-500 text-white';
    case 'Terminé':
      return 'bg-blue-500 text-white';
    case 'En attente':
      return 'bg-yellow-500 text-white';
    case 'Proposition':
      return 'bg-orange-500 text-white';
    case 'Annulé':
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

export default ProjectScreen;
