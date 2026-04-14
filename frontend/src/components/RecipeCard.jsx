import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-orange-100 transition-all duration-500 hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={recipe.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800"}
          alt={recipe.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Category Badge */}
        <div className="absolute top-5 left-5">
          <span className="backdrop-blur-md bg-white/90 text-gray-900 text-xs font-black uppercase px-4 py-2 rounded-xl shadow-sm">
            {recipe.category}
          </span>
        </div>
        
        {/* Quick Info */}
        <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
          <span className="flex items-center text-white text-sm font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {recipe.cookingTime} min
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-2xl font-black text-gray-900 mb-3 line-clamp-1 group-hover:text-orange-500 transition-colors">
          {recipe.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-6 font-medium">
          {recipe.instructions}
        </p>
        
        <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">
              {recipe.creatorName?.charAt(0) || 'U'}
            </div>
            <span className="text-xs font-bold text-gray-400">By {recipe.creatorName}</span>
          </div>
          
          <Link
            to={`/recipes/${recipe.id}`}
            className="flex items-center text-gray-900 font-black text-sm group/btn"
          >
            View
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
