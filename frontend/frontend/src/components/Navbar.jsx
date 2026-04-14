import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-orange-600">
          Food<span className="text-gray-800">Blog</span>
        </Link>

        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-orange-600 font-medium">Home</Link>
          {user ? (
            <>
              <Link to="/add-recipe" className="text-gray-600 hover:text-orange-600 font-medium">Add Recipe</Link>
              <Link to="/dashboard" className="text-gray-600 hover:text-orange-600 font-medium">Dashboard</Link>
              {user.role === 'ADMIN' && (
                <Link to="/admin" className="text-gray-600 hover:text-orange-600 font-medium">Admin</Link>
              )}
              <div className="flex items-center space-x-4">
                <span className="text-gray-800 font-semibold">Hi, {user.name}</span>
                <button
                  onClick={logout}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition duration-200"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-orange-600 font-medium">Login</Link>
              <Link
                to="/register"
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
