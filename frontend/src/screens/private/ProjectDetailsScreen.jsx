import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProjectByIdQuery } from '../../slices/projectApiSlice';
import { FiDownload } from 'react-icons/fi';

const ProjectDetailsScreen = () => {
  const { id: projectId } = useParams();
  const {
    data: project,
    error: errorProject,
    isLoading: isLoadingProject,
  } = useGetProjectByIdQuery(projectId);

  if (isLoadingProject) {
    return <div className="text-center mt-4">Chargement en cours...</div>;
  }

  if (errorProject) {
    return (
      <div className="text-center mt-4 text-red-500">
        Erreur : {errorProject.message}
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center mt-4">
        Aucun projet trouvé avec l'ID : {projectId}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-xl font-bold text-center mb-8">{project.title}</h1>
      <div className="bg-gray-700 rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-bold mb-2">Détails du Projet</h2>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="flex flex-wrap mb-4">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-2">
            <strong>Statut :</strong>{' '}
            <span
              className={
                getStatusColorClass(project.status) +
                ' px-3 py-1 text-sm font-semibold rounded-full'
              }
            >
              {project.status}
            </span>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-2">
            <strong>Type :</strong> {project.projectType}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-2">
            <strong>Date de début :</strong>{' '}
            {new Date(project.startDate).toLocaleDateString()}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-2">
            <strong>Date de fin :</strong>{' '}
            {new Date(project.endDate).toLocaleDateString()}
          </div>
        </div>
        <div className="flex flex-wrap mb-4">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-2">
            <strong>Budget :</strong> {project.budget} €
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-2">
            <strong>Catégorie :</strong> {project.category}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-2">
            <strong>Membres de l'équipe :</strong>{' '}
            {project.teamMembers.length}
          </div>
        </div>
        <div className="mb-4">
          <strong>Documents :</strong>
          <ul className="list-disc ml-4">
            {project.documents.map((document, index) => (
              <li key={index}>
                {document}
                <a
                  href={`http://localhost:5000/uploads/${encodeURIComponent(document)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="ml-2 inline-flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Télécharger <FiDownload className="ml-1" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <h2 className="text-xl font-bold mb-2">Stages</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4">Numéro du Stage</th>
                <th className="py-2 px-4">Titre</th>
                <th className="py-2 px-4">Description</th>
                <th className="py-2 px-4">Date de Début</th>
                <th className="py-2 px-4">Date de Fin</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {project.stages.map((stage) => (
                <tr key={stage.stageNumber}>
                  <td className="py-2 px-4">{stage.stageNumber}</td>
                  <td className="py-2 px-4">{stage.title}</td>
                  <td className="py-2 px-4">{stage.description}</td>
                  <td className="py-2 px-4">
                    {new Date(stage.startDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">
                    {new Date(stage.endDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

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

export default ProjectDetailsScreen;
