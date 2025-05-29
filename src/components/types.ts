export interface VideoSource {
  url: string;
  type: 'local' | 'external';
  thumbnail: string;
};

export interface MediaItem {
  url: string;
  thumbnail: string;
}

export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'ongoing';
  image: string;
  location: string;
  category?: string;
  details: {
    specifications: Record<string, string>;
   
    timeline?: string;
    materials?: string[];
    features?: string[];
    imageGallery?: string[];
    blueprints?: string[];
    videos?: VideoSource[];
    virtualTour?: string;
  };
};