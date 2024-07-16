import React from 'react'
import { useGetPresentationsQuery } from '../../slices/presentationApiSlice'
import { Link } from 'react-router-dom'

const UserPresentationsScreen = () => {
  const { data: presentations, error: presentationsError, isLoading: loadingPresentations } = useGetPresentationsQuery()

  if (loadingPresentations) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (presentationsError) {
    return <div className="text-red-500 text-center mt-4">Error: {presentationsError.message}</div>
  }

  return (
    <div className="user-presentations-screen p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Presentations</h1>
      <div className="presentation-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {presentations.map((presentation) => (
          <Link to={`/presentation-details/${presentation._id}`} key={presentation._id} className="card bg-white shadow-md rounded-lg overflow-hidden">
            {presentation.slides.length > 0 && presentation.slides[0].image && (
              <img src={`http://192.168.178.21:3000/uploads/${presentation.cover}`} alt={presentation.title} className="w-full h-48 object-cover"/>
            )}
            <div className="card-body p-4">
              <h5 className="card-title text-xl font-semibold mb-2">{presentation.title}</h5>
              <p className="card-text mb-2">{presentation.description}</p>
              <p className="card-text"><strong>Nombres de slides:</strong> {presentation.slides.length}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default UserPresentationsScreen
