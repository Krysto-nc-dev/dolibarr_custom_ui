import React from 'react'
import { useGetPlasticColorsQuery } from '../../slices/plasticColorSlice'
import Loader from '../../components/shared/Loader'

const PlasticColorsScreen = () => {
  const { data: plasticColors, error, isLoading } = useGetPlasticColorsQuery()

  if (isLoading) return <Loader />
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6 text-primaryColor text-center">
        Couleurs de plastique
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plasticColors.map((color) => (
          <div key={color._id} className="card border border-gray-200 rounded-md shadow-md">
            <div className="bg-white">
              <img
                src={`http://192.168.178.21:3000/uploads/${color.photo}`}
                alt={color.name}
                className="w-full h-48 object-cover rounded-t-md"
              />
            </div>
            <div className="p-4">
              <h2 className="text-md font-bold mb-2">{color.name}</h2>
            </div>
           
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlasticColorsScreen
