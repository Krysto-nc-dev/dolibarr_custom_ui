import React from 'react'
import image from '../assets/images/bouchon_hand.jpeg'
const ContactScreen = () => {
  return (
    <div className='p-4'>
          

            <section className='flex items-center justify-between bg-gray-700 rounded-md mt-5'>
          

            <div className='flex-1 p-6 '>

            <h1 className='text-textColor text-2xl mb-5'>
              Nous contacter
            </h1>
            <form action="">
              <div className="mb-4">
                <label className="block text-sm font-medium text-textColor mb-1">
                  Votre nom
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
                  placeholder="Votre nom"
                  />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-textColor mb-1">
                  Votre email
                </label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
                  placeholder="Votre email"
                  />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-textColor mb-1">
                  Votre message
                </label>
                <textarea
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
                  rows="4"
                  placeholder="Votre message"
                  ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-full py-2 bg-primaryColor text-white rounded-lg hover:bg-primaryColor-dark transition-colors"
                  >
                  Envoyer
                </button>
              </div>
            </form>
                  </div >
                  <div className='w-[50%]' >
                    <img className='rounded-r-md' src={image} alt="" />
                  </div>
                    </section>
    </div>
  )
}

export default ContactScreen