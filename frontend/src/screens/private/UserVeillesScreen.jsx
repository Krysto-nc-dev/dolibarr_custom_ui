import React from 'react';
import { useGetVeillesQuery } from '../../slices/veilleApiSlice';
import { Eye } from 'lucide-react';

const UserVeillesScreen = () => {
  const { data: veilles, error, isLoading } = useGetVeillesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen p-6 bg-backgroundColor text-textColor">
      <h1 className="text-xl font-bold mb-6 text-primaryColor text-center">Veilles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {veilles.map((veille) => (
          <div key={veille.title} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <h2 className="text-md font-bold mb-2 text-secondaryColor">{veille.title}</h2>
              <p className="text-gray-700 mb-2">{veille.description}</p>
              <p className="text-gray-700 mb-2"><strong>Type:</strong> {veille.type}</p>
              <p className="text-gray-700 mb-2"><strong>Catégories:</strong> {veille.categories}</p>
              <p className="text-gray-700 mb-2"><strong>Langue:</strong> {veille.lang}</p>
              <div className="mb-2">
                <h3 className="font-semibold text-gray-800">Tags:</h3>
                <ul className="list-inside">
                  {veille.tags.map((tag, index) => (
                    <li className='bg-primaryColor m-2 text-center rounded-full text-white' key={index}>{tag}</li>
                  ))}
                </ul>
              </div>
              <p className="text-gray-700 mb-2"><strong>Source:</strong> {veille.source}</p>
              <a href={veille.url} className="text-primaryColor hover:no-underline flex justify-center items-center" target="_blank" rel="noopener noreferrer">
               <Eye className='mr-2'/> Voir 
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserVeillesScreen;
