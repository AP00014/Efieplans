
import type { ProjectItem } from './types';



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
  
  
  




  