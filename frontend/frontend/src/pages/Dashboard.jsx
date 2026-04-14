import { useState, useEffect } from 'react';
import api from '../services/api';
import RecipeCard from '../components/RecipeCard';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/users/profile');
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="text-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div></div>;

  return (
    <div className="space-y-12">
      <div className="bg-white rounded-3xl p-8 shadow-lg flex items-center space-x-6">
        <div className="h-24 w-24 bg-orange-100 rounded-full flex items-center justify-center text-4xl text-orange-600 font-bold">
          {profile.name[0]}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{profile.name}</h1>
          <p className="text-gray-500">{profile.email} • <span className="capitalize">{profile.role.toLowerCase()}</span></p>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Recipes</h2>
        {profile.createdRecipes?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profile.createdRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">You haven't created any recipes yet.</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Favorite Recipes</h2>
        {profile.favoriteRecipes?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profile.favoriteRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No favorite recipes yet.</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
