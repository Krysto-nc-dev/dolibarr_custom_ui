import React from 'react'
import { useParams } from 'react-router-dom'

const UserPropalDetails = () => {
  const { id: propalId } = useParams()

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-primaryColor">Détails du Devis</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-primaryColor mb-2">Propal avec l'ID : {propalId}</h2>
      </div>
    </div>
  )
}

export default UserPropalDetails
