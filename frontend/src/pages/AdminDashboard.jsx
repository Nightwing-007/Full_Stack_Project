import { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllRecipes = async () => {
    try {
      const response = await api.get('/recipes?size=100');
      setRecipes(response.data.content);
    } catch (error) {
      toast.error('Failed to fetch recipes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await api.delete(`/recipes/${id}`);
        toast.success('Recipe deleted');
        setRecipes(recipes.filter(r => r.id !== id));
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  if (loading) return <div className="text-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div></div>;

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
      <h2 className="text-xl font-bold text-gray-700 mb-4">Manage All Recipes</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="py-4 px-4 font-bold text-gray-600 uppercase text-xs">Title</th>
              <th className="py-4 px-4 font-bold text-gray-600 uppercase text-xs">Category</th>
              <th className="py-4 px-4 font-bold text-gray-600 uppercase text-xs">Creator</th>
              <th className="py-4 px-4 font-bold text-gray-600 uppercase text-xs text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map(recipe => (
              <tr key={recipe.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-4 px-4 text-gray-800 font-medium">{recipe.title}</td>
                <td className="py-4 px-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">{recipe.category}</span>
                </td>
                <td className="py-4 px-4 text-gray-600 text-sm">{recipe.creatorName}</td>
                <td className="py-4 px-4 text-right">
                  <button
                    onClick={() => handleDelete(recipe.id)}
                    className="text-red-500 hover:text-red-700 font-bold text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
