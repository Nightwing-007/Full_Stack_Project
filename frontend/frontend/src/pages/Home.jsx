import { useState, useEffect } from 'react';
import api from '../services/api';
import RecipeCard from '../components/RecipeCard';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    try {
      const response = await api.get(`/recipes?search=${search}`);
      setRecipes(response.data.content);
    } catch (error) {
      console.error('Error fetching recipes', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchRecipes();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-orange-600 rounded-3xl p-10 mb-10 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Discover Delicious Recipes</h1>
        <p className="text-lg opacity-90 mb-8">Join our community and share your favorite culinary creations.</p>
        <div className="max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search recipes or categories..."
            className="w-full px-6 py-4 rounded-xl text-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Recipe Grid */}
      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {search ? `Search results for "${search}"` : 'Latest Recipes'}
          </h2>
          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">No recipes found. Try a different search!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
