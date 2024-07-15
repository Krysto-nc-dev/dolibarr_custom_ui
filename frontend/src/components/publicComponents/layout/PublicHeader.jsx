import React from 'react'
import { Link } from 'react-router-dom'

const PublicHeader = () => {
  return (
    <header className='p-4'>
        <nav className='flex gap-4'>

        <Link to={'/'}>home</Link>
        <Link to={'/krysto-shop'}>Nos produits</Link>
        <Link to={'/initiations'}>initiations</Link>
        <Link to={'/krysto-dev'}>Devellopement</Link>
        <Link to={'/contacts'}>Blog</Link>
        <Link to={'/contacts'}>Nous contacter</Link>
        <Link to={'/a-propos'}>A propos</Link>
        </nav>
    </header>
  )
}

export default PublicHeader