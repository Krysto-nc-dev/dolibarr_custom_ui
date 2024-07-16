import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetPlasticTypeByIdQuery } from '../../slices/plasticTypesSlice'

const UserPlasticTypeDetails = () => {
  const { id: plasticTypeId } = useParams()

  const { data: plasticType, error: plasticTypeError, isLoading: loadingPlasticType } = useGetPlasticTypeByIdQuery(plasticTypeId)

  if (loadingPlasticType) return <p>Chargement...</p>
  if (plasticTypeError) return <p>Erreur lors du chargement</p>

  return (
    <div className="container mx-auto p-4">
      {plasticType && (
        <>
          <div className="flex items-center mb-6 bg-gray-500 p-5 rounded-md">
            <img src={`http://192.168.178.21:3000/uploads/${plasticType.icone}`} alt={plasticType.sigleFr} className="h-20 w-20 mr-4" />
            <h1 className="text-3xl font-bold">{plasticType.scientificNameFr} - {plasticType.sigleFr}</h1>
          </div>
          <p className="text-lg mb-4">{plasticType.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-2 text-center text-secondaryColor">Caractéristiques</h2>
              <p className='flex items-center justify-between'><strong>Densité:</strong> {plasticType.density}</p>
              <div className="border mb-2"></div>
              <p className='flex items-center justify-between'><strong>Résistance chimique:</strong> {plasticType.chemicalResistance}</p>
              <div className="border mb-2"></div>
              <p className='flex items-center justify-between'><strong>Résistance à la chaleur:</strong> {plasticType.heatResistance}</p>
              <div className="border mb-2"></div>
              <p className='flex items-center justify-between'><strong>Rigidité:</strong> {plasticType.rigidity}</p>
              <div className="border mb-2"></div>
              <p className='flex items-center justify-between'><strong>Température d'injection:</strong> {plasticType.injectionTemperature}</p>
              <div className="border mb-2"></div>
              <p className='flex items-center justify-between'><strong>Point de fusion:</strong> {plasticType.meltingPoint}°C</p>
              <div className="border mb-2"></div>
              <p className='flex items-center justify-between'><strong>Toxicité:</strong> {plasticType.toxicity}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-2 text-center text-secondaryColor">Flotabilité</h2>
              <ul className="pl-5">
                <li className='flex items-center justify-between mb-4'>
                  Alcool: 
                  <span className={plasticType.flotability.alcohol ? 'text-green-400' : 'text-red-400'}>
                    {plasticType.flotability.alcohol ? 'Oui' : 'Non'}
                  </span>
                </li>
                <div className="border mb-2"></div>
                <li className='flex items-center justify-between mb-4'>
                  Glycérine: 
                  <span className={plasticType.flotability.glycerine ? 'text-green-400' : 'text-red-400'}>
                    {plasticType.flotability.glycerine ? 'Oui' : 'Non'}
                  </span>
                </li>
                <div className="border mb-2"></div>
                <li className='flex items-center justify-between mb-4'>
                  Huile végétale: 
                  <span className={plasticType.flotability.vegetableOil ? 'text-green-400' : 'text-red-400'}>
                    {plasticType.flotability.vegetableOil ? 'Oui' : 'Non'}
                  </span>
                </li>
                <div className="border mb-2"></div>
                <li className='flex items-center justify-between mb-4'>
                  Eau: 
                  <span className={plasticType.flotability.water ? 'text-green-400' : 'text-red-400'}>
                    {plasticType.flotability.water ? 'Oui' : 'Non'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default UserPlasticTypeDetails
