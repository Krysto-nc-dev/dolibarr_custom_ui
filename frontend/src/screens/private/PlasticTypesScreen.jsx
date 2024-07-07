import React from 'react';
import { useGetPlasticTypesQuery } from '../../slices/plasticTypesSlice';

const PlasticTypesScreen = () => {
  const { data: plasticTypes, error, isLoading } = useGetPlasticTypesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen p-6 bg-backgroundColor text-textColor">
      <h1 className="text-3xl font-bold mb-6 text-primaryColor text-center">Types de plastique</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plasticTypes.map((type) => (
          <div key={type._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2 text-secondaryColor">{type.sigleFr} - {type.scientificNameFr}</h2>
              <img
                src={`path/to/images/${type.icone}`} // Adjust the path accordingly
                alt={type.sigleFr}
                className="w-full h-40 object-cover mb-4"
              />
              <p className="text-gray-700 mb-2">{type.description}</p>
              <p className="text-gray-700 mb-2"><strong>Température d'injection:</strong> {type.injectionTemperature}</p>
              <p className="text-gray-700 mb-2"><strong>Densité:</strong> {type.density}</p>
              <p className="text-gray-700 mb-2"><strong>Point de fusion:</strong> {type.meltingPoint}°C</p>
              <p className="text-gray-700 mb-2"><strong>Résistance à la chaleur:</strong> {type.heatResistance}</p>
              <p className="text-gray-700 mb-2"><strong>Résistance chimique:</strong> {type.chemicalResistance}</p>
              <p className="text-gray-700 mb-2"><strong>Rigueur:</strong> {type.rigidity}</p>
              <p className="text-gray-700 mb-2"><strong>Toxicité:</strong> {type.toxicity}</p>
              <p className="text-gray-700 mb-2"><strong>Impact environnemental:</strong> {type.environmentalImpact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlasticTypesScreen;
