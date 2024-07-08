import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetRecipesByIdQuery } from '../../slices/recipeApiSlice'
import { useGetPlasticColorsQuery } from '../../slices/plasticColorSlice'

const RecipeDetails = () => {
  const { id: recipeId } = useParams()

  const { data: recipe, error: errorRecipe, isLoading: loadingRecipe } = useGetRecipesByIdQuery(recipeId)
  const { data: colors, error: errorColors, isLoading: loadingColors } = useGetPlasticColorsQuery()

  if (loadingRecipe || loadingColors) {
    return <div className="flex justify-center items-center h-screen"><span className="text-lg">Chargement...</span></div>
  }

  if (errorRecipe || errorColors) {
    return <div className="flex justify-center items-center h-screen"><span className="text-lg">Erreur de chargement des détails de la recette ou des couleurs.</span></div>
  }

  const getColorName = (colorId) => {
    const color = colors.find(color => color._id === colorId)
    return color ? color.name : 'Nom de couleur introuvable'
  }

  const weightSteps = [0.5, 1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100] // weights in kilograms

  return (
    <div className="p-6 max-w-8xl mx-auto bg-white rounded-lg shadow-md relative">
      {recipe ? (
        <div>
          <div className="absolute top-0 right-0 mt-4 mr-4 bg-blue-500 text-white py-1 px-3 rounded-full">
            {recipe.productionType}
          </div>
         
          <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
          <p className="text-lg mb-4">{recipe.description}</p>
          
          <div className="flex flex-wrap -mx-2 mb-4">
            {recipe.images.map((image, index) => (
              <div key={index} className="w-1/3 px-2 mb-4">
                <img src={image} alt={`Image de la recette ${index + 1}`} className="w-full h-32 object-cover rounded-md shadow-sm" />
              </div>
            ))}
          </div>

          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Couleurs</h2>
            <div className="flex flex-wrap -mx-2">
              {recipe.colors.map((color, index) => (
                <div key={index} className="w-1/3 px-2 mb-4">
                  <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                    <p className="text-lg font-semibold">{getColorName(color.colorId)}</p>
                    <p>Pourcentage: {color.percentage}%</p>
                    <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
                      <div className="bg-blue-500 h-4" style={{ width: `${color.percentage}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Grammage des Couleurs</h2>
            <table className="min-w-full bg-gray-200 border-collapse">
              <thead>
                <tr className="border-b-0">
                  <th className="py-2 px-4 bg-primaryColor text-white rounded-tl-lg">Poids Total (kg)</th>
                  {recipe.colors.map((color, index) => (
                    <th key={index} className="py-2 px-4 bg-primaryColor text-white">{getColorName(color.colorId)}</th>
                  ))}
                  <th className="py-2 px-4 bg-primaryColor text-white rounded-tr-lg"></th>
                </tr>
              </thead>
              <tbody>
                {weightSteps.map((weight) => (
                  <tr key={weight}>
                    <td className="py-2 px-4 border-b">{weight} kg</td>
                    {recipe.colors.map((color, index) => (
                      <td key={index} className="py-2 px-4 border-b">
                        {(weight * color.percentage / 100).toFixed(2)} kg
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center text-lg">Aucune recette trouvée.</div>
      )}
    </div>
  )
}

export default RecipeDetails
