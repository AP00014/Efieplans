
import type { ProjectItem } from './types';
import type { Post } from './types/index';



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
          url: '/videos/02673085c141fa1529b528534962bf26.mp4',
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
    status: 'ongoing',
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
    description: 'Contemporary 6-bedroom smart home with sustainable design',
    status: 'completed',
    image: 'https://res.cloudinary.com/dpzndrhse/image/upload/v1750628718/Michael_s_final_d78rgo.jpg',
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
      imageGallery: ['https://res.cloudinary.com/dpzndrhse/image/upload/v1750628736/old-7_gyprl8.jpg',
         'https://res.cloudinary.com/dpzndrhse/image/upload/v1750628697/old-2_mcw8ur.jpg', 
        'https://res.cloudinary.com/dpzndrhse/image/upload/v1750628718/old-5_febxux.jpg',
      'https://res.cloudinary.com/dpzndrhse/image/upload/v1750628670/f_py5w3w.jpg',
      'https://res.cloudinary.com/dpzndrhse/image/upload/v1750628663/d_si5di1.jpg',
      'https://res.cloudinary.com/dpzndrhse/image/upload/v1750628686/old-1_ymwzj5.jpg',
      'https://res.cloudinary.com/dpzndrhse/image/upload/v1750628663/e_zblvve.jpg'
      
      ],
      videos: [
        {
          url: '/videos/02673085c141fa1529b528534962bf26.mp4',
          type: 'local',
          thumbnail: 'https://res.cloudinary.com/dpzndrhse/image/upload/v1750628718/Michael_s_final_d78rgo.jpg',
        }
      ],
      blueprints: ['/downloads/skyscraper-structural.pdf'],
      virtualTour: 'https://3dtour.com/skyscraper'
    }
  },
  
{
    id: 7,
    category: 'architectural',
    title: 'Golden Village',
    description: 'Contemporary 6-bedroom smart home with sustainable design',
    status: 'completed',
    image: 'https://res.cloudinary.com/dpzndrhse/image/upload/v1750631768/birdview_mdavmx.jpg',
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
      imageGallery: ['https://res.cloudinary.com/dpzndrhse/image/upload/v1750632129/3_h8fead.jpg',
         'https://res.cloudinary.com/dpzndrhse/image/upload/v1750631757/81_zqaopq.jpg', 
        'https://res.cloudinary.com/dpzndrhse/image/upload/v1750631753/61_ucwch3.jpg',
      'https://res.cloudinary.com/dpzndrhse/image/upload/v1750631745/11_y17bzd.jpg',
      'https://res.cloudinary.com/dpzndrhse/image/upload/v1750631695/2_awkkzl.jpg',
      'https://res.cloudinary.com/dpzndrhse/image/upload/v1750631624/20_zc6a1n.jpg',
      'https://res.cloudinary.com/dpzndrhse/image/upload/v1750631570/14_yfdqtk.jpg'
      
      ],
      videos: [
        {
          url: '/videos/02673085c141fa1529b528534962bf26.mp4',
          type: 'local',
          thumbnail: 'https://res.cloudinary.com/dpzndrhse/image/upload/v1750631555/13-1_hdvpmx.jpg',
        }
      ],
      blueprints: ['/downloads/skyscraper-structural.pdf'],
      virtualTour: 'https://3dtour.com/skyscraper'
    }
  } ,
   
{
    id: 8,
    category: 'architectural',
    title: 'Belles Fleur',
    description: 'Contemporary 6-bedroom smart home with sustainable design',
    status: 'completed',
    image: 'https://res.cloudinary.com/dpzndrhse/image/upload/v1750629085/c2_z8gijk.jpg',
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
      imageGallery: ['https://res.cloudinary.com/dpzndrhse/image/upload/v1750629303/c1_lmfemt.jpg',
        'https://res.cloudinary.com/dpzndrhse/image/upload/v1750629085/c3_tpoxa7.jpg',
        'https://res.cloudinary.com/dpzndrhse/image/upload/v1750629091/C4_cygb7d.jpg',
        'https://res.cloudinary.com/dpzndrhse/image/upload/v1750629093/c5_mkzxgs.jpg',

         'https://res.cloudinary.com/dpzndrhse/image/upload/v1750629105/family_nntzit.jpg',
         'https://res.cloudinary.com/dpzndrhse/image/upload/v1750629107/master_bed_qsgqid.jpg'
         
      ],
      videos: [
        {
          url: '/videos/02673085c141fa1529b528534962bf26.mp4',
          type: 'local',
          thumbnail: 'https://res.cloudinary.com/dpzndrhse/image/upload/v1750629093/c5_mkzxgs.jpg',
        }
      ],
      blueprints: ['/downloads/skyscraper-structural.pdf'],
      virtualTour: 'https://3dtour.com/skyscraper'
    }
  },


  {
    id: 9,
    category: 'architectural',
    title: 'Gecko Lodge',
    description: 'Contemporary 6-bedroom smart home with sustainable design',
    status: 'completed',
    image: 'https://res.cloudinary.com/dpzndrhse/image/upload/v1750631103/b_kp9qn6.jpg',
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
      imageGallery: ['https://res.cloudinary.com/dpzndrhse/image/upload/v1750631123/d1_rj3tse.jpg',
        'https://res.cloudinary.com/dpzndrhse/image/upload/v1750631113/b1_bxgtth.jpg',
        'https://res.cloudinary.com/dpzndrhse/image/upload/v1750631100/a1_j7a7cl.jpg',
        'https://res.cloudinary.com/dpzndrhse/image/upload/v1750631103/b_kp9qn6.jpg',

         'https://res.cloudinary.com/dpzndrhse/image/upload/v1750631135/rooftop_b6sspo.jpg',
         'https://res.cloudinary.com/dpzndrhse/image/upload/v1750631135/h_-1_vdyp2b.jpg',
         ' https://res.cloudinary.com/dpzndrhse/image/upload/v1750631128/e1_skdoqh.jpghttps://res.cloudinary.com/dpzndrhse/image/upload/v1750631130/f_od7pdx.jpghttps://res.cloudinary.com/dpzndrhse/image/upload/v1750631118/c1_wxqz7m.jpg'
      ],
      videos: [
        {
          url: '/videos/02673085c141fa1529b528534962bf26.mp4',
          type: 'local',
          thumbnail: 'https://res.cloudinary.com/dpzndrhse/image/upload/v1750629093/c5_mkzxgs.jpg',
        }
      ],
      blueprints: ['/downloads/skyscraper-structural.pdf'],
      virtualTour: 'https://3dtour.com/skyscraper'
    }
  },



  


     ];
  
  
  




  
export const posts: Post[] = [
  {
    id: '1',
    title: 'Innovative Skyscraper Design',
    description: 'Exploring modern architectural trends in high-rise buildings with sustainable materials and cutting-edge engineering.',
    images: ['https://via.placeholder.com/400x300?text=Skyscraper+1', 'https://via.placeholder.com/400x300?text=Skyscraper+2'],
    videos: ['https://www.youtube.com/embed/dQw4w9WgXcQ'],
    categories: ['Architecture'],
    likes: 150,
    comments: [
      { id: 'c1', user: 'ArchFan', text: 'Amazing design!', timestamp: '2023-10-01T10:00:00Z' },
      { id: 'c2', user: 'BuilderBob', text: 'How sustainable is this?', timestamp: '2023-10-02T11:00:00Z' }
    ]
  },
  {
    id: '2',
    title: 'Minimalist Living Room Interior',
    description: 'A guide to creating a serene and functional living space with minimalist design principles.',
    images: ['https://via.placeholder.com/400x300?text=Living+Room+1', 'https://via.placeholder.com/400x300?text=Living+Room+2', 'https://via.placeholder.com/400x300?text=Living+Room+3'],
    videos: [],
    categories: ['Interior Design'],
    likes: 89,
    comments: [
      { id: 'c3', user: 'DesignLover', text: 'Love the simplicity!', timestamp: '2023-10-03T12:00:00Z' }
    ]
  },
  {
    id: '3',
    title: 'Sustainable Construction Techniques',
    description: 'Implementing eco-friendly building methods to reduce environmental impact in modern construction.',
    images: ['https://via.placeholder.com/400x300?text=Sustainable+1'],
    videos: ['https://www.youtube.com/embed/sample2'],
    categories: ['Construction'],
    likes: 200,
    comments: [
      { id: 'c4', user: 'EcoBuilder', text: 'Great for the planet!', timestamp: '2023-10-04T13:00:00Z' },
      { id: 'c5', user: 'ContractorJoe', text: 'Any cost implications?', timestamp: '2023-10-05T14:00:00Z' },
      { id: 'c6', user: 'GreenArch', text: 'More projects like this please.', timestamp: '2023-10-06T15:00:00Z' }
    ]
  },
  {
    id: '4',
    title: 'Historic Building Restoration',
    description: 'Preserving architectural heritage through careful restoration of historic structures.',
    images: ['https://via.placeholder.com/400x300?text=Historic+1', 'https://via.placeholder.com/400x300?text=Historic+2'],
    videos: [],
    categories: ['Architecture', 'Construction'],
    likes: 120,
    comments: [
      { id: 'c7', user: 'HistoryBuff', text: 'Beautiful work!', timestamp: '2023-10-07T16:00:00Z' },
      { id: 'c8', user: 'RestorerPro', text: 'Authentic materials used?', timestamp: '2023-10-08T17:00:00Z' }
    ]
  },
  {
    id: '5',
    title: 'Luxury Kitchen Design Trends',
    description: 'Latest trends in high-end kitchen interiors featuring smart appliances and premium finishes.',
    images: ['https://via.placeholder.com/400x300?text=Kitchen+1', 'https://via.placeholder.com/400x300?text=Kitchen+2'],
    videos: ['https://www.youtube.com/embed/sample3'],
    categories: ['Interior Design'],
    likes: 175,
    comments: [
      { id: 'c9', user: 'ChefHome', text: 'Inspiring!', timestamp: '2023-10-09T18:00:00Z' }
    ]
  },
  {
    id: '6',
    title: 'Bridge Construction Engineering',
    description: 'The challenges and innovations in building large-scale bridge infrastructure projects.',
    images: ['https://via.placeholder.com/400x300?text=Bridge+1'],
    videos: [],
    categories: ['Construction'],
    likes: 95,
    comments: [
      { id: 'c10', user: 'EngTech', text: 'Fascinating engineering!', timestamp: '2023-10-10T19:00:00Z' },
      { id: 'c11', user: 'BridgeFan', text: 'How long did it take?', timestamp: '2023-10-11T20:00:00Z' }
    ]
  }
];