import React from 'react'
import { Link } from 'react-router-dom'
import illustrationHero from '../assets/images/illustration-hero.svg'

const HomeHero = () => {
  return (
    <section>
      {/* container for image and content */}

      <div className="container flex flex-col-reverse mx-auto p-6  lg:flex-row lg:mb-0">
        {/* Content */}
        <div className="flex flex-col space-y-10 lg:mt-16 lg:w:1/2">
          <h1 className="text-3xl font-semibold text-center lg:text-6xl lg:text-left">
            Simplifiez votre gestion Dolibarr
          </h1>
          <p className="max-w-md mx-auto text-lg text-center text-gray-400 lg:text-2xl lg:text-left lg:mt-0 lg:mx-0">
            Améliorez votre expérience Dolibarr avec une interface utilisateur
            intuitive et personnalisée.
          </p>

          {/* Buttons container */}

          <div className="flex items-center justify-center w-full space-x-4 lg:justify-start">
            <Link
              to={'/'}
              className="p-4 text-sm font-semibold text-white bg-softBlue border-2 rounded shadow-md border-softBlue md:text-base hover:bg-white hover:text-softBlue"
            >
              Commencer
            </Link>
            <Link
              to={'/'}
              className="p-4 text-sm font-semibold text-black bg-gray-300 border-2 rounded shadow-md border-gray-300 md:text-base hover:bg-white hover:text-gray-600"
            >
              Tarifs
            </Link>
          </div>
        </div>
        <div className="relative mx-auto lg:mx-0 lg:mb-0 lg:w-1/2">

        <div className="bg-hero"></div>
           <img src={illustrationHero} alt="" className="relative z-10 lg:top-24 xl:top-0 overflow-x-visible" />
        </div>
      </div>
    </section>
  )
}

export default HomeHero
