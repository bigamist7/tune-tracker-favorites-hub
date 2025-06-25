
export interface Artist {
  id: number;
  name: string;
  picture?: string;
  picture_small?: string;
  picture_medium?: string;
  picture_big?: string;
}

export interface Album {
  id: number;
  title: string;
  cover?: string;
  cover_small?: string;
  cover_medium?: string;
  cover_big?: string;
}

export interface Track {
  id: number;
  title: string;
  duration: number;
  preview?: string;
  artist: Artist;
  album: Album;
  rank?: number;
}

export interface SearchResponse {
  data: Track[];
  total: number;
  next?: string;
}
