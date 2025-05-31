import img1 from '../public/Images/81945302_2141154495987458_8142382399708200960_n.jpg';
import img2 from '../public/Images/82604517_2141155279320713_5725934327536025600_n.jpg';
import img3 from '../public/Images/img3.jpg';
import img4 from '../public/Images/81836978_2141186975984210_991424691258261504_n.jpg';
import img5 from '../public/Images/462932421_7677982035637982_8133384283652711148_n.jpg';
import img6 from '../public/Images/1706916591344.jpg';
import video1 from '../public/videos/02673085c141fa1529b528534962bf26.mp4';
import { ProjectItem } from './components/types';



export const allProjects: ProjectItem[] = [
  {
    id: 1,
    category: 'architectural',
    title: 'Modern Skyscraper',
    description: 'Contemporary 6-bedroom smart home with sustainable design',
    status: 'completed',
    image: img1,
    location: 'New York, US',
    details: {
      specifications: {
        height: '300m',
        floors: '80',
        area: '150,000 sq ft',
        completion: '2022'
      },
    
      timeline: '2018-2022',
      materials: ['Reinforced Concrete', 'Glass Facade', 'Steel Framework'],
      imageGallery: [img1, img2, img3],
      videos: [
        { 
          url: video1, 
          type: 'local',
          thumbnail: img5
        }
      ],
      blueprints: ['/downloads/skyscraper-structural.pdf'],
      virtualTour: 'https://3dtour.com/skyscraper'
    }
  },
  {
    id: 2,
    category: 'architectural',
    title: 'Innovation Tech Hub',
    description: '12-story mixed-use technology campus',
    status: 'ongoing',
    image: img2,
    location: 'Lagos, NG',
    details: {
      specifications: {
        height: '150m',
        floors: '35',
        area: '85,000 sq ft',
        completion: '2024'
      },
     
      timeline: '2021-2024',
      materials: ['Smart Glass', 'Carbon Composite'],
      imageGallery: [img2, img3],
      videos: [
        { 
          url: '/videos/techhub-overview.mp4', 
          type: 'local',
          thumbnail: img3
        }
      ],
      virtualTour: 'https://3dtour.com/techhub'
    }
  },
  {
    id: 3,
    title: 'Coastal Luxury Retreat',
    description: 'Private beachfront estate with wellness center',
    status: 'ongoing',
    image: img3,
    location: 'Cape Coast, GH',
    details: {
      specifications: {
        area: '12,000 sq ft',
        bedrooms: '8',
        completion: '2024'
      },
      features: [
        'Private beach access',
        'Infinity pool',
        'Spa & wellness center'
      ],
      imageGallery: [img3, img4],
      videos: [
        { 
          url: '/videos/coastal-retreat.mp4', 
          type: 'local',
          thumbnail: img4
        }
      ],
      virtualTour: 'https://3dtour.com/coastal-retreat'
    }
  },
  {
    id: 4,
    title: 'Eco Vertical Village',
    description: 'Green-certified high-rise community',
    status: 'completed',
    image: img4,
    location: 'Nairobi, KE',
    details: {
      specifications: {
        units: '120',
        area: '450,000 sq ft',
        completion: '2022'
      },
      features: [
        'Vertical gardens',
        'Rainwater harvesting',
        'Solar power generation'
      ],
      imageGallery: [img4, img1],
      videos: [
        { 
          url: 'https://youtube.com/embed/ecovillage', 
          type: 'external',
          thumbnail: img1
        }
      ],
      virtualTour: 'https://3dtour.com/ecovillage'
    }
  },
  {
    id: 5,
    category: 'constructions',
    title: 'Bridge Construction',
    status: 'ongoing',
    image: img5,
    location: 'London, UK',
    description: 'Major river crossing with innovative engineering',
    details: {
      specifications: {
        length: '850m',
        lanes: '6',
        completion: '2025'
      }
    }
  },
  {
    id: 6,
    category: 'renovations',
    title: 'Historic Renovation',
    status: 'completed',
    image: img6,
    location: 'Paris, FR',
    description: 'Restoration of 19th century landmark building',
    details: {
      specifications: {
        era: '19th Century',
        restoration: '95% original materials preserved'
      }
    }
  }
];