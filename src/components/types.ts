export interface VideoSource{
    url: string;
    type: 'local';
    thumbnail: string;
  };
export interface Video {
  url: string;
  type: 'local' | 'external';
  thumbnail: string;
}

 export interface MediaItem {
  url: string;
  thumbnail: string;
}


 export interface Project  {
    id: number;
    category: string; 
    title: string;
    description: string;
    status: 'completed' | 'ongoing';
    image: string;
    location: string;
    details: {
      specifications: Record<string, string>;
      architects?: string[];
      timeline?: string;
      materials?: string[];
      imageGallery?: string[];
      blueprints?: string[];
      virtualTour?: string;
    
      videos?: Video[];
    };
  };
  
  export interface  Slide {
    id: number;
    image: string;
    title: string;
    description: string;
    location: string;
    status: 'completed' | 'ongoing';
    details: {
      description?: string;
      features?: string[];
      specifications?: Record< string,string>;
      imageGallery?: string[];
      blueprints?: string[];
      videos?: VideoSource[];
      virtualTour?: string;
    };
  };
  