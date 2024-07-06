import React from 'react';
import { useGetWarehousesQuery } from '../../slices/dolibarr/dolliWarehouseApiSlice';
import Loader from '../../components/shared/Loader';
import { Link } from 'react-router-dom';

const UserWarehousesScreen = () => {
  const {
    data: warehouses,
    isLoading,
    error
  } = useGetWarehousesQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="text-red-500">
        {typeof error.data.message === 'string'
          ? error.data.message
          : 'Une erreur est survenue'}
      </p>
    );
  }

  return (
    <div className="h-screen p-6 bg-backgroundColor text-textColor">
      <h1 className="text-3xl font-bold mb-6 text-primaryColor text-center">Entrepôts ({warehouses.length})</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {warehouses.map((warehouse) => (
          <Link to={`/user-warehouse-details/${warehouse.id}`} key={warehouse.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2 text-secondaryColor">{warehouse.label}</h2>
            <p className="text-gray-600"><strong>Lieu:</strong> {warehouse.lieu}</p>
            <p className="text-gray-600"><strong>Description:</strong> {warehouse.description}</p>
            <p className="text-gray-600"><strong>Adresse:</strong> {warehouse.address}</p>
            <p className="text-gray-600"><strong>Ville:</strong> {warehouse.town}</p>
            <p className="text-gray-600"><strong>Code Postal:</strong> {warehouse.zip}</p>
            <p className="text-gray-600"><strong>Téléphone:</strong> {warehouse.phone}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserWarehousesScreen;
