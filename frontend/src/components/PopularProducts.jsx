import React from 'react'
import sousVerre from '../assets/images/sous_verre.jpg'
import porteSavon from '../assets/images/porte_savon.jpg'
import jenga from '../assets/images/jenga.jpg'
import peignes from '../assets/images/peignes_gm.jpg'
import bague from '../assets/images/bagues.png'
import cachePot from '../assets/images/cache_pot.jpg'
import { Link } from 'react-router-dom'

const PopularProductsData = [
  {
    id: 4324,
    name: 'Dessous de verres',
    image: sousVerre,
    price: 500,
    countInStock: 0,
  },
  {
    id: 5321,
    name: 'Porte-savon',
    image: porteSavon,
    price: 30,
    countInStock: 5,
  },
  {
    id: 7654,
    name: 'Jenga',
    image: jenga,
    price: 200,
    countInStock: 8,
  },
  {
    id: 8765,
    name: 'Peignes',
    image: peignes,
    price: 100,
    countInStock: 3,
  },

  {
    id: 6543,
    name: 'Cache pot',
    image: cachePot,
    price: 5,
    countInStock: 15,
  },
  {
    id: 6549,
    name: 'Bagues',
    image: bague,
    price: 5,
    countInStock: 15,
  },
]

const PopularProducts = () => {
  return (
    <div
      className="bg-gray-600 px-4 pt-3 pb-4 rounded-lg border border-primaryColor"
      style={{ width: '28rem' }}
    >
      <strong className="text-center font-semibold">
        Meilleurs ventes
      </strong>

      <div className="mt-4 flex flex-col gap-3 ">
        {PopularProductsData.map((product) => (
          <Link to={`/product/${product.id}`} className='flex hover:no-underline'>
            <div className="w-10 h-10 min-w-10 bg-gray-200 rounded-lg">
              <img
                className="w-full h-full object-cover rounded-lg overflow-hidden"
                src={product.image}
                alt={product.name}
              />
            </div>
            <div className='ml-4 flex-1'>
              <p className="text-sm text-textColor">{product.name}</p>
               <span className={`text-sm font-medium ${product.countInStock === 0 ?'text-orange-500' : 'text-green-500'}`}> {product.countInStock ===  0 ? 'Rupture de stock' : product.countInStock + ' En stock'}</span>
            </div>
            <div className='text-sm text-textColor'>
                {product.price} XPF
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PopularProducts
