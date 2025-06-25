
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import MusicCard from "@/components/MusicCard";
import { Track } from "@/types/music";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const { data: searchResults, isLoading, error } = useQuery({
    queryKey: ['search', submittedQuery],
    queryFn: async () => {
      if (!submittedQuery) return { data: [] };
      
      console.log('Searching for:', submittedQuery);
      
      try {
        const response = await fetch(
          `https://itunes.apple.com/search?term=${encodeURIComponent(submittedQuery)}&media=music&entity=song&limit=20`
        );
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Search results:', data);
        
        // Transform iTunes API response to match our Track interface
        const transformedData = {
          data: data.results.map((item: any) => ({
            id: item.trackId,
            title: item.trackName,
            duration: Math.floor(item.trackTimeMillis / 1000), // Convert to seconds
            preview: item.previewUrl,
            artist: {
              id: item.artistId,
              name: item.artistName,
            },
            album: {
              id: item.collectionId,
              title: item.collectionName,
              cover_medium: item.artworkUrl100,
              cover_small: item.artworkUrl60,
              cover_big: item.artworkUrl600 || item.artworkUrl100,
            },
          }))
        };
        
        return transformedData;
      } catch (error) {
        console.error('Search error:', error);
        throw error;
      }
    },
    enabled: !!submittedQuery,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSubmittedQuery(searchQuery.trim());
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">
          Search Music
        </h1>
        
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="text"
            placeholder="Search for songs or artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
          />
          <Button 
            type="submit" 
            className="bg-purple-600 hover:bg-purple-700"
            disabled={isLoading}
          >
            <Search className="w-4 h-4" />
          </Button>
        </form>
      </div>

      {isLoading && (
        <div className="text-center text-gray-400">
          <div className="animate-spin w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          Searching...
        </div>
      )}

      {error && (
        <div className="text-center text-red-400 mb-8">
          <p>Error searching for music: {error.message}</p>
          <p className="text-sm mt-2">Please try again with different search terms.</p>
        </div>
      )}

      {searchResults?.data && searchResults.data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.data.map((track: Track) => (
            <MusicCard key={track.id} track={track} />
          ))}
        </div>
      )}

      {searchResults?.data && searchResults.data.length === 0 && submittedQuery && (
        <div className="text-center text-gray-400 mt-12">
          <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No songs found for "{submittedQuery}"</p>
          <p className="text-sm mt-2">Try searching with different keywords</p>
        </div>
      )}

      {!submittedQuery && (
        <div className="text-center text-gray-400 mt-12">
          <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Enter a song or artist name to start searching</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
