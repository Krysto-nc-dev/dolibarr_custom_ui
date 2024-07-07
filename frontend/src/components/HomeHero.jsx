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
        <h1 className="text-2xl font-semibold text-center lg:text-4xl lg:text-left">
    Simplifiez la gestion de votre initiative <br /> Precious Plastic
  </h1>
  <p className="max-w-md mx-auto text-lg text-center text-mutedColor lg:text-2xl lg:text-left lg:mt-0 lg:mx-0">
    Améliorez votre expérience avec une interface utilisateur intuitive et personnalisée, conçue spécialement pour les associations et entreprises du mouvement Precious Plastic.
  </p>

          {/* Buttons container */}

          <div className="flex items-center justify-center w-full space-x-4 lg:justify-start">
           <Link to={'/login'} className="p-3 text-sm font-semibold text-white bg-primaryColor  rounded-xl shadow-md border-primaryColor md:text-base hover:bg-secondaryColor hover:no-underline">connection</Link>
            <Link
              to={'/'}
              className="p-3 text-sm font-semibold text-white bg-primaryColor  rounded-xl shadow-md border-primaryColor md:text-base hover:bg-secondaryColor hover:no-underline"
            >
              Commencer
            </Link>
            <Link
              to={'/'}
             className="px-7 py-3 text-sm font-semibold text-white bg-primaryColor  rounded-xl shadow-md border-primaryColor md:text-base hover:bg-secondaryColor hover:no-underline"
            >
              Tarifs
            </Link>
          </div>
        </div>
        <div className="relative mx-auto lg:mx-0 lg:mb-0 lg:w-1/2">

     
           <img src={illustrationHero} alt="" className="relative z-10 lg:top-24 xl:top-0 overflow-x-visible lg:ml-10 lg:mt-8" />
        </div>
      </div>
    </section>
  )
}

export default HomeHero
