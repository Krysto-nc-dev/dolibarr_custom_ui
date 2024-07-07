import React from 'react';
import { Link } from 'react-router-dom';

const UserPlasticsScreen = () => {
  return (
    <div className="h-screen flex flex-col bg-backgroundColor text-textColor">
      <div className="flex gap-3 justify-center py-4 bg-white shadow-md">
        <Link
          to="/plastic-colors"
          className="inline-block px-6 py-3 text-white bg-primaryColor rounded-lg shadow-md hover:bg-primaryColor-dark focus:outline-none focus:ring-2 focus:ring-primaryColor focus:ring-opacity-75 transition"
        >
          Couleurs plastique
        </Link>
        <Link
          to="/plastic-types"
          className="inline-block px-6 py-3 text-white bg-secondaryColor rounded-lg shadow-md hover:bg-secondaryColor-dark focus:outline-none focus:ring-2 focus:ring-secondaryColor focus:ring-opacity-75 transition"
        >
          Types de plastique
        </Link>
      </div>
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold text-center">Informations génèrale sur les plastiques</h2>
      </div>
    </div>
  );
};

export default UserPlasticsScreen;
