import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetVeilleByIdQuery } from '../../slices/veilleApiSlice';
import Loader from '../../components/shared/Loader';
import { Eye } from 'lucide-react';

const typeColors = {
  'Vidéo': 'bg-blue-500',
  'Site Web': 'bg-green-500',
  'Article': 'bg-red-500',
  'PDF': 'bg-orange-500',
};

const UserVeilleDetailsScreen = () => {
  const { id: veilleId } = useParams();
  const { data: veille, error: errorVeille, isLoading: loadingVeille } = useGetVeilleByIdQuery(veilleId);

  if (loadingVeille) return <Loader />;
  if (errorVeille) return <div>Error: {errorVeille.message}</div>;

  return (
    <div className="min-h-screen px-6 py-2 bg-backgroundColor text-textColor">
      <div className="max-w-9xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className={`absolute top-0 right-0 p-2 ${typeColors[veille.type]} text-white rounded-bl-lg`}>
          {veille.type}
        </div>
        <img src={`http://192.168.178.21:3000/uploads/${veille.photo}`} alt={veille.title} className="w-full h-64 object-cover rounded-t-lg mb-4" />
        <h1 className="text-2xl font-bold mb-4 text-primaryColor text-center">{veille.title}</h1>
        <p className="text-gray-700 mb-4">{veille.description}</p>
        <div className="mb-4">
          <strong>Catégories:</strong> {veille.categories}
        </div>
        <div className="mb-4">
          <strong>Langue:</strong> {veille.lang}
        </div>
        <div className="mb-4">
          <strong>Tags:</strong>
          <ul className="flex flex-wrap gap-2 mt-2">
            {veille.tags.map((tag, index) => (
              <li className='bg-primaryColor px-2 py-1 rounded-full text-white min-w-[4ch] text-center text-xs' key={index}>{tag}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <strong>Source:</strong> {veille.source}
        </div>
        <a href={veille.url} className="text-primaryColor hover:no-underline flex justify-center items-center" target="_blank" rel="noopener noreferrer">
          <Eye className='mr-2' /> Voir
        </a>
      </div>
    </div>
  );
}

export default UserVeilleDetailsScreen;
