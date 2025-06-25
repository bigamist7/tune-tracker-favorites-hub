
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Heart, Music } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-8">
          <Music className="w-20 h-20 mx-auto mb-6 text-purple-400" />
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Favorite Music Catalog
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover, search, and save your favorite songs. Build your personal music collection with ease.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/search">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
              <Search className="w-5 h-5 mr-2" />
              Start Searching
            </Button>
          </Link>
          
          <Link to="/favorites">
            <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-6 text-lg rounded-xl transition-all duration-300 transform hover:scale-105">
              <Heart className="w-5 h-5 mr-2" />
              My Favorites
            </Button>
          </Link>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <Search className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Search Music</h3>
            <p className="text-gray-400">Find songs by title or artist using our powerful search engine powered by Deezer API.</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <Heart className="w-8 h-8 text-pink-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Save Favorites</h3>
            <p className="text-gray-400">Build your personal collection by adding songs to your favorites list.</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <Music className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Discover Music</h3>
            <p className="text-gray-400">Explore new artists, albums, and tracks to expand your musical horizons.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
