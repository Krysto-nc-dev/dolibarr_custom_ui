import React from 'react';
import { useGetPlasticColorsQuery } from '../../slices/plasticColorSlice';
import Loader from '../../components/shared/Loader';

const PlasticColorsScreen = () => {
  const { data: plasticColors, error, isLoading } = useGetPlasticColorsQuery();

  if (isLoading) return <Loader/>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-6 bg-backgroundColor text-textColor">
      <h1 className="text-xl font-bold mb-6 text-primaryColor text-center">Couleurs de plastique</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plasticColors.map((color) => (
          <div key={color._id} className="bg-white p-4 rounded-lg shadow-lg">
            <div className="mb-4">
              <h2 className="text-md font-bold text-primaryColor">{color.name}</h2>
            </div>
         
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlasticColorsScreen;
