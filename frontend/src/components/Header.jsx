import { Link } from 'react-router-dom'
import logo from '../assets/images/logo-bookmark.svg'

const Header = () => {
  return (
    <nav className='container relative mx-auto p-6'>

        {/* Flex container for nav items */}
        <div className='flex items-center justify-between space-x-20'>

            {/* Logo */}
          <div className="z-30">
            <img src={logo} alt="Logo Dolibarr custom UI" className="logo" />
          </div>

          <div className=" hidden items-center space-x-10 uppercase md:flex">
            <Link to={'/'} className='tracking-widest hover:text-softRed'>
            Fonctionnalités
            </Link>
            <Link to={'/'} className='tracking-widest hover:text-softRed'>
            faq
            </Link>
            <Link to={'/'} className='tracking-widest  hover:text-softRed'>
            Contacts
            </Link>
            <Link to={'/login'} className='px-9 py-2 text-white bg-softRed border-2 border-softRed rounded-lg shadow-md hover:text-softRed  hover:bg-white'>
             login
            </Link>
          </div>

        </div>

    </nav>
  )
}

export default Header