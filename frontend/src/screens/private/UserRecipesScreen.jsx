import React from 'react';
import { useGetRecipesQuery } from '../../slices/recipeApiSlice';

const UserRecipesScreen = () => {
  const { data: recipes, error, isLoading } = useGetRecipesQuery();
 console.log(recipes);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen p-6 bg-backgroundColor text-textColor">
      <h1 className="text-xl font-bold mb-6 text-primaryColor text-center">Recettes de couleurs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe.title} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={recipe.images[0]} // Afficher la première image de la recette
              alt={recipe.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-md font-bold mb-2 text-secondaryColor">{recipe.title}</h2>
              <p className="text-gray-700 mb-2">{recipe.description}</p>
              <div className="mb-2">
                <h3 className="font-semibold text-gray-800">Couleurs:</h3>
                <ul className="list-disc list-inside">
                  {recipe.colors.map((color, index) => (
                    <li key={index}>{color.colorId}: <strong>{color.percentage}%</strong></li>
                  ))}
                </ul>
              </div>
              <p className="text-gray-700 flex flex-items justify-between"><strong>Type de production:</strong> {recipe.productionType}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserRecipesScreen;
