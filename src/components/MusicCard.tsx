
import { useState, useEffect } from "react";
import { Heart, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Track } from "@/types/music";
import { cn } from "@/lib/utils";
import AudioPlayer from "./AudioPlayer";

interface MusicCardProps {
  track: Track;
}

const MusicCard = ({ track }: MusicCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.some((fav: Track) => fav.id === track.id));
  }, [track.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter((fav: Track) => fav.id !== track.id);
    } else {
      newFavorites = [...favorites, track];
    }

    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
    
    // Dispatch custom event to update other components
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
      <div className="relative mb-4">
        {track.album?.cover_medium ? (
          <img
            src={track.album.cover_medium}
            alt={track.album.title}
            className="w-full aspect-square object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300"
          />
        ) : (
          <div className="w-full aspect-square bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
            <Music className="w-12 h-12 text-white" />
          </div>
        )}
        
        <Button
          onClick={toggleFavorite}
          className={cn(
            "absolute top-2 right-2 w-10 h-10 rounded-full p-0 transition-all duration-200",
            isFavorite
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-black/50 hover:bg-black/70 text-white"
          )}
        >
          <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
        </Button>
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-white text-lg leading-tight line-clamp-2">
            {track.title}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-1">
            {track.artist?.name}
          </p>
          {track.album?.title && (
            <p className="text-gray-500 text-xs line-clamp-1">
              {track.album.title}
            </p>
          )}
        </div>

        {track.preview && (
          <AudioPlayer
            src={track.preview}
            title={track.title}
            artist={track.artist?.name || ''}
          />
        )}

        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>{formatDuration(track.duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default MusicCard;
