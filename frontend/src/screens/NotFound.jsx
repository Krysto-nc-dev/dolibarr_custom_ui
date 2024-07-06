import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <AlertTriangle className="text-red-600 mb-4" size={100} />
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-red-600 mb-4">OUPS !!!!! </h1>
        <p className="text-gray-700 mb-6">Désolée, la page que vous demandez n'est pas trouvée.</p>
        <Link to="/" className="text-white bg-primaryColor hover:bg-secondaryColor font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
