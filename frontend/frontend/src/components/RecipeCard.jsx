import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <img
        src={recipe.imageUrl || "https://via.placeholder.com/400x250"}
        alt={recipe.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase px-2 py-1 bg-orange-100 text-orange-600 rounded">
            {recipe.category}
          </span>
          <span className="text-gray-500 text-sm">{recipe.cookingTime} mins</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{recipe.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{recipe.instructions}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">By {recipe.creatorName}</span>
          <Link
            to={`/recipes/${recipe.id}`}
            className="text-orange-600 font-bold hover:text-orange-700 text-sm"
          >
            View Recipe →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
