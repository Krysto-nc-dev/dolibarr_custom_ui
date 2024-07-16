import React, { useState } from 'react'
import { useGetRecipesQuery } from '../../slices/recipeApiSlice'
import { Link } from 'react-router-dom'
import { Palette } from 'lucide-react'

const UserRecipesScreen = () => {
  const { data: recipes, error, isLoading } = useGetRecipesQuery()
  const [selectedProductionType, setSelectedProductionType] = useState('')

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  const getProductionTypeBgColor = (type) => {
    switch (type) {
      case 'injection':
        return 'bg-blue-500'
      case 'extrusion':
        return 'bg-green-500'
      case 'compression':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const filteredRecipes = selectedProductionType
    ? recipes.filter(
        (recipe) => recipe.productionType === selectedProductionType,
      )
    : recipes

  return (
    <div className="min-h-screen p-6 bg-backgroundColor text-textColor">
      <h1 className="text-xl font-bold mb-6 text-primaryColor text-center">
        Recettes de couleurs
      </h1>
      <Link className='flex justify-center items-center gap-2' to={"/color-calculators"}>Color calculator <Palette/></Link>

      <div className="mb-4">
        <label
          htmlFor="productionType"
          className="block text-sm font-medium text-textColor"
        >
          Filtrer par type de production
        </label>
        <select
          id="productionType"
          name="productionType"
          value={selectedProductionType}
          onChange={(e) => setSelectedProductionType(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-700 bg-gray-700 focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm rounded-md"
        >
          <option value="">Tous</option>
          <option value="injection">Injection</option>
          <option value="extrusion">Extrusion</option>
          <option value="compression">Compression</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <Link
            to={`/recipe-details/${recipe._id}`}
            key={recipe.title}
            className="card rounded-lg shadow-md overflow-hidden relative"
          >
            <img
              src={`http://192.168.178.21:3000/uploads/${recipe.images[0]}`}
              alt={recipe.title}
              className="w-full h-64 object-cover"
            />
            <div
              className={`absolute top-0 right-0 mt-4 mr-4 py-1 px-3 rounded-full text-white ${getProductionTypeBgColor(
                recipe.productionType,
              )}`}
            >
              {recipe.productionType}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-md font-bold">{recipe.title}</h2>

                <p className="rounded-full text-white bg-primaryColor py-1 px-3 ">
                 {recipe.source}
                </p>
              </div>
              <p className="mb-2">{recipe.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default UserRecipesScreen
