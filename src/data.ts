
import video1 from '../public/videos/02673085c141fa1529b528534962bf26.mp4';
import { ProjectItem } from './components/types';



export const allProjects: ProjectItem[] = [
  {
    id: 1,
    category: 'constructions',
    title: 'The Metropol',
    description: 'Contemporary 6-bedroom smart home with sustainable design',
    status: 'ongoing',
    image: 'https://res.cloudinary.com/dpzndrhse/image/upload/v1750667824/81945302_2141154495987458_8142382399708200960_n_cpcfed.jpg',
    location: 'Accra,Ghana',
    details: {
      specifications: {
        height: '300m',
        floors: '80',
        area: '150,000 sq ft',
        completion: '2022'
      },
    
      timeline: '2018-2025',
      materials: ['Reinforced Concrete', 'Glass Facade', 'Steel Framework'],
      imageGallery: ['https://res.cloudinary.com/dpzndrhse/image/upload/v1750667945/img3_xmxexn.jpg',
         'https://res.cloudinary.com/dpzndrhse/image/upload/v1750667956/img4_trud1s.jpg', 
        'https://res.cloudinary.com/dpzndrhse/image/upload/v1750667958/interor_rk9rms.jpg'],
      videos: [
        { 
          url: video1, 
          type: 'local',
          thumbnail: 'https://res.cloudinary.com/dpzndrhse/image/upload/v1750667824/81945302_2141154495987458_8142382399708200960_n_cpcfed.jpg',
        }
      ],
      blueprints: ['/downloads/skyscraper-structural.pdf'],
      virtualTour: 'https://3dtour.com/skyscraper'
    }
  },
  {
    id: 2,
    category: 'constructions',
    title: 'Elizabeth ',
    description: '12-story mixed-use technology campus',
    status: 'ongoing',
    image: 'https://res.cloudinary.com/dpzndrhse/image/upload/v1750667823/795d537546404a15a5edb74793570ebe_lvhdqb.jpg',
    location: 'Kumasi, GH',
    details: {
      specifications: {
        height: '150m',
        floors: '35',
        area: '85,000 sq ft',
        completion: '2024'
      },
     
      timeline: '2021-2024',
      materials: ['Smart Glass', 'Carbon Composite'],
      imageGallery: ['https://res.cloudinary.com/dpzndrhse/image/upload/v1750667823/795d537546404a15a5edb74793570ebe_lvhdqb.jpg',
         'https://res.cloudinary.com/dpzndrhse/image/upload/v1750667823/795d537546404a15a5edb74793570ebe_lvhdqb.jpg'],
      videos: [
        { 
          url: '/videos/techhub-overview.mp4', 
          type: 'local',
          thumbnail: 'https://res.cloudinary.com/dpzndrhse/image/upload/v1750667823/795d537546404a15a5edb74793570ebe_lvhdqb.jpg'
        }
      ],
      virtualTour: 'https://3dtour.com/techhub'
    }
  },
  {
    id: 3,
    title: 'Jonas Estate ',
    description: 'Private beachfront estate with wellness center',
    status: 'ongoing',
    image: 'https://res.cloudinary.com/dpzndrhse/image/upload/v1750631800/GV-6_iacnvz.jpg',
    location: 'Kumasi, GH',
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
      imageGallery: ['https://res.cloudinary.com/dpzndrhse/image/upload/v1750631800/GV-6_iacnvz.jpg', 
        'https://res.cloudinary.com/dpzndrhse/image/upload/v1750631800/GV-6_iacnvz.jpg'],
      videos: [
        { 
          url: '/videos/coastal-retreat.mp4', 
          type: 'local',
          thumbnail: 'https://res.cloudinary.com/dpzndrhse/image/upload/v1750631800/GV-6_iacnvz.jpg'
        }
      ],
      virtualTour: 'https://3dtour.com/coastal-retreat'
    }
  },
  {
    id: 4,
    title: 'The Gleam',
    description: 'Green-certified high-rise community',
    status: 'completed',
    image: 'https://res.cloudinary.com/dpzndrhse/image/upload/v1750631402/Francess.final-1_n8dmoa.jpg',
    location: 'Accra, GH',
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
      imageGallery: ['https://res.cloudinary.com/dpzndrhse/image/upload/v1750631402/Francess.final-1_n8dmoa.jpg',
         'https://res.cloudinary.com/dpzndrhse/image/upload/v1750631402/Francess.final-1_n8dmoa.jpg'],
      videos: [
        { 
          url: 'https://youtube.com/embed/ecovillage', 
          type: 'external',
          thumbnail: 'https://res.cloudinary.com/dpzndrhse/image/upload/v1750631402/Francess.final-1_n8dmoa.jpg'
        }
      ],
      virtualTour: 'https://3dtour.com/ecovillage'
    }
  },

























  {
    id: 5,
    category: 'architectural',
    title: 'Abode',
    status: 'completed',
    image: 'https://res.cloudinary.com/dpzndrhse/image/upload/v1750628589/Afari_s_final_lrcjvr.jpg',
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
    category: 'architectural',
    title: 'Appease',
    status: 'completed',
    image: 'https://res.cloudinary.com/dpzndrhse/image/upload/v1750628718/Michael_s_final_d78rgo.jpg',
    location: 'Accra, GH',
    description: 'Restoration of 19th century landmark building',
    details: {
      specifications: {
        era: '19th Century',
        restoration: '95% original materials preserved'
      }
    }
  }
];