import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-[60vh]">
    <h1 className="text-4xl font-bold text-purple-500 mb-4">404</h1>
    <p className="text-xl text-gray-300">Page not found</p>
    <Link 
      to="/" 
      className="mt-6 px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition"
    >
      Return to Home
    </Link>
  </div>
);

export default NotFound;