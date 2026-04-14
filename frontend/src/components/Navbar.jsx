import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-orange-500 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-2xl font-black tracking-tight text-gray-900">
              Food<span className="text-orange-500">Blog</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-orange-500 font-semibold transition-colors duration-200">Home</Link>
            {user ? (
              <>
                <Link to="/add-recipe" className="text-gray-600 hover:text-orange-500 font-semibold transition-colors duration-200">Add Recipe</Link>
                <Link to="/dashboard" className="text-gray-600 hover:text-orange-500 font-semibold transition-colors duration-200">Dashboard</Link>
                {user.role === 'ADMIN' && (
                  <Link to="/admin" className="text-gray-600 hover:text-orange-500 font-semibold transition-colors duration-200">Admin</Link>
                )}
                <div className="h-6 w-px bg-gray-200 mx-2"></div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full capitalize">
                    👋 {user.name}
                  </span>
                  <button
                    onClick={logout}
                    className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-200 transition-all duration-300 transform active:scale-95"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-orange-500 font-bold px-4 py-2 transition-colors">Login</Link>
                <Link
                  to="/register"
                  className="bg-orange-500 text-white px-8 py-3 rounded-2xl font-bold hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-100 transition-all duration-300 transform active:scale-95"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-6 animate-fadeIn">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-600 hover:text-orange-500 font-semibold p-2">Home</Link>
              {user ? (
                <>
                  <Link to="/add-recipe" className="text-gray-600 hover:text-orange-500 font-semibold p-2">Add Recipe</Link>
                  <Link to="/dashboard" className="text-gray-600 hover:text-orange-500 font-semibold p-2">Dashboard</Link>
                  <button onClick={logout} className="w-full text-left text-orange-600 font-bold p-2 border-t border-gray-100">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-600 hover:text-orange-500 font-semibold p-2">Login</Link>
                  <Link to="/register" className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold text-center">Join Now</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
