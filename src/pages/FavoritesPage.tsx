
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import MusicCard from "@/components/MusicCard";
import { Track } from "@/types/music";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Track[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Listen for storage changes to update favorites in real-time
  useEffect(() => {
    const handleStorageChange = () => {
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      } else {
        setFavorites([]);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // Also listen for custom event for same-tab updates
    window.addEventListener('favoritesUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favoritesUpdated', handleStorageChange);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            My Favorites
          </h1>
          <p className="text-gray-400">
            {favorites.length} song{favorites.length !== 1 ? 's' : ''} in your collection
          </p>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((track) => (
              <MusicCard key={track.id} track={track} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-12">
            <Heart className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-xl mb-2">No favorites yet</p>
            <p>Start searching for music and add songs to your favorites!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
