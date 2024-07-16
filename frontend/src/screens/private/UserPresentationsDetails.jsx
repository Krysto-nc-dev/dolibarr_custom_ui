import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetPresentationByIdQuery } from '../../slices/presentationApiSlice'
import {  PlayCircle, PlusIcon } from 'lucide-react'

const UserPresentationsDetails = () => {
  const { id: presentationId } = useParams()
  const { data: presentation, error: presentationError, isLoading: loadingPresentation } = useGetPresentationByIdQuery(presentationId)

  if (loadingPresentation) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (presentationError) {
    return <div className="text-red-500 text-center mt-4">Error: {presentationError.message}</div>
  }

  return (
    <div className="container mx-auto p-4">
      <div className="cover w-full h-64 overflow-hidden rounded-lg mb-6">
        <img
          src={`http://192.168.178.21:3000/uploads/${presentation.cover}`}
          alt={presentation.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className='flex items-center justify-between'>
         <div>

      <h1 className="text-3xl font-bold mb-2">{presentation.title}</h1>
      <p className="text-sm mb-4">{presentation.description}</p>
         </div>
         <div className='flex items-center gap-3 '>
            <button className='flex items-center gap-2 bg-green-500 px-5 py-1 rounded-md'>
                <PlusIcon/> Nouvelle slide
            </button>
            <Link to={`/presentation-slide/${presentation._id}`} className='flex items-center gap-2 bg-green-500 px-5 py-1 rounded-md text-textColor'>
                <PlayCircle/> Demarrer
            </Link>
         </div>
      </div>

      <div className="slides grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {presentation.slides.map((slide, index) => (
          <div key={slide._id} className="slide-card relative bg-white shadow-md rounded-lg overflow-hidden">
            <div className="absolute top-2 right-2 bg-primaryColor text-white rounded-full w-8 h-8 flex items-center justify-center z-50 border border-gray-800">
              {index + 1}
            </div>
            {slide.image && (
              <div className="slide-image h-60 overflow-hidden border-b-8 border-primaryColor">
                <img src={`http://192.168.178.21:3000/uploads/${slide.image}`} alt={slide.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
              </div>
            )}
            <div className="slide-content p-4">
              <h5 className="text-xl font-semibold mb-2 text-primaryColor">{slide.title}</h5>
              {slide.subtitle && <h6 className="text-sm font-medium  text-gray-800 mb-2">{slide.subtitle}</h6>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserPresentationsDetails
