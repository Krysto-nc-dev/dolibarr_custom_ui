import { Code, Contact, Gem, HomeIcon, Newspaper, PhoneForwarded, RecycleIcon, ShoppingBag, ShoppingBasket } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const PublicHeader = () => {
  return (
    <header className='p-4 py-6 bg-gray-900'>
        <nav className='flex gap-4 text-sm'>

        <Link className='flex items-center text-white hover:text-secondaryColor hover:font-bold' to={'/'}> <HomeIcon className='w-[20px] mr-1'/> Accueil</Link>
        <Link className='flex items-center text-white hover:text-secondaryColor hover:font-bold transition hover:-translate-y-0.5 duration-150' to={'/krysto-shop'}>
        <ShoppingBasket className='w-[20px] mr-2'/>
        Nos produits</Link>
        <Link className='flex items-center text-white hover:text-secondaryColor hover:font-bold transition hover:-translate-y-0.5 duration-150' to={'/initiations'}>
        <RecycleIcon className='w-[20px] mr-2'/>
        Initiations</Link>
        <Link className='flex items-center text-white hover:text-secondaryColor hover:font-bold transition hover:-translate-y-0.5 duration-150' to={'/krysto-dev'}>
        <Code className='w-[20px] mr-2'/>
        Développement</Link>
        <Link className='flex items-center text-white hover:text-secondaryColor hover:font-bold transition hover:-translate-y-0.5 duration-150' to={'/blog'}>
        <Newspaper className='w-[20px] mr-2'/>
        Blog</Link>
        <Link className='flex items-center text-white hover:text-secondaryColor hover:font-bold transition hover:-translate-y-0.5 duration-150' to={'/contacts'}>
        <PhoneForwarded className='w-[20px] mr-2'/>
        Nous contacter</Link>
        <Link className='flex items-center text-white hover:text-secondaryColor hover:font-bold transition hover:-translate-y-0.5 duration-150' to={'/a-propos'}>
        <Gem className='w-[20px] mr-2'/>
        A propos</Link>
        </nav>
    </header>
  )
}

export default PublicHeader