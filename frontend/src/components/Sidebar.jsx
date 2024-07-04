import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Menu,
  X,
  Box,
  Home,
  Users,
  ShoppingCart,
  FileText,
  DollarSign,
  CreditCard,
  Book,
  Calendar,
  Ticket,
} from 'lucide-react'
import logo from '../assets/images/logo-bookmark.svg'
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex h-screen">
      {/* Burger menu */}
      <div className="fixed top-0 left-0 z-50 md:hidden">
        <button onClick={toggleSidebar} className="text-softBlue p-2">
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-grayishBlue text-veryDarkBlue h-full p-4 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-200 ease-in-out md:relative md:translate-x-0 md:w-64`}
      >
        <img className="mb-6 mt-10" src={logo} alt="" />

        <nav>
          <ul>
            <li className="mb-4">
              <Link
                to="/"
                className="text-sm hover:text-gray-300 flex items-center"
              >
                <Home className="mr-2" />
                Dashboard
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/user-products"
                className="text-sm hover:text-gray-300 flex items-center"
              >
                <Users className="mr-2" />
                Tiers
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/products"
                className="text-sm hover:text-gray-300 flex items-center"
              >
                <Box className="mr-2" />
                Produits & Services
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/commerce"
                className="text-sm hover:text-gray-300 flex items-center"
              >
                <ShoppingCart className="mr-2" />
                Commerce
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/billing"
                className="text-sm hover:text-gray-300 flex items-center"
              >
                <DollarSign className="mr-2" />
                Facturation & Paiement
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/banks"
                className="text-sm hover:text-gray-300 flex items-center"
              >
                <CreditCard className="mr-2" />
                Banques & Caisses
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/accounting"
                className="text-sm hover:text-gray-300 flex items-center"
              >
                <Book className="mr-2" />
                Comptabilité
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/calendar"
                className="text-sm hover:text-gray-300 flex items-center"
              >
                <Calendar className="mr-2" />
                Agenda
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/tickets"
                className="text-sm hover:text-gray-300 flex items-center"
              >
                <Ticket className="mr-2" />
                Tickets
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/tickets"
                className="text-sm hover:text-gray-300 flex items-center"
              >
                <Ticket className="mr-2" />
                Paramétres
              </Link>
            </li>
            {/* Ajoutez d'autres éléments de menu ici */}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 md:ml-64">{/* Contenu principal ici */}</div>
    </div>
  )
}

export default Sidebar
