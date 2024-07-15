import React from 'react'
import HomeHero from '../components/HomeHero'

const HomeScreen = () => {
  return (
    <div className='mt-20'>
      {/* <HomeHero/> */}
      <div className="w-[50%]">
        <h1 className="text-6xl">
          Le <span className="text-primaryColor">Changement</span> commence
          localement.
        </h1>
        <p className='mt-3'>
          Krysto est une entreprise de recyclage qui s'engage à réduire les
          déchets plastiques en les transformant en objets utiles et design.
        </p>

        <div className='mt-10 flex items-center gap-9'>
          <button className='btn btn-primary'>En savoir plus</button>
          <button className='btn btn-primary'>Découvrir</button>
        </div>
      </div>
    </div>
  )
}

export default HomeScreen
