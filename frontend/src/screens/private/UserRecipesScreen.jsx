import React from 'react';
import { useGetRecipesQuery } from '../../slices/recipeApiSlice';
import { Link } from 'react-router-dom';

const UserRecipesScreen = () => {
  const { data: recipes, error, isLoading } = useGetRecipesQuery();
  console.log(recipes);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const getProductionTypeBgColor = (type) => {
    switch (type) {
      case 'injection':
        return 'bg-blue-500';
      case 'extrusion':
        return 'bg-green-500';
      case 'compression':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen p-6 bg-backgroundColor text-textColor">
      <h1 className="text-xl font-bold mb-6 text-primaryColor text-center">Recettes de couleurs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe.title} className="bg-white rounded-lg shadow-md overflow-hidden relative">
            <img
              src={recipe.images[0]} // Afficher la première image de la recette
              alt={recipe.title}
              className="w-full h-40 object-cover"
            />
            <div className={`absolute top-0 right-0 mt-4 mr-4 py-1 px-3 rounded-full text-white ${getProductionTypeBgColor(recipe.productionType)}`}>
              {recipe.productionType}
            </div>
            <div className="p-4">
              <h2 className="text-md font-bold mb-2 text-secondaryColor">
                <Link to={`/recipe-details/${recipe._id}`}>
                  {recipe.title}
                </Link>
              </h2>
              <p className="text-gray-700 mb-2">{recipe.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserRecipesScreen;
