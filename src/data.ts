import { Project } from './components/types';
import { Slide } from './components/types';



import sdl from '../public/Images/81945302_2141154495987458_8142382399708200960_n.jpg'

import sdl2 from '../public/Images/462932421_7677982035637982_8133384283652711148_n.jpg'

import dl3 from '../public/Images/1706916591344.jpg'


 
 export const slides: Slide[] = [
    {
        id: 1, 
      image: pdl,
      title: 'Apermah Tower',
      description: 'Contemporary 6-bedroom smart home with sustainable design',
      location: 'Accra, GH',
      status: 'completed',
      details:{
        description: "A groundbreaking residential project combining sustainable design with smart home technology...",
        features: [
          "Solar panel integration",
          "Greywater recycling system",
          "Home automation package"
        ],
        specifications: {
          area: "6500 sq ft",
          floors: '3',
          bedrooms: '6',
          completion: "2023"
        },
        imageGallery: [
          '../public/Images/img3.jpg',
          'path/to/gallery2.jpg',
          'path/to/gallery3.jpg',
          'path/to/gallery3.jpg'
        ],
        videos: [
          { url: '../public/videos/02673085c141fa1529b528534962bf26.mp4', type: 'local',
            thumbnail: '../public/Images/462932421_7677982035637982_8133384283652711148_n.jpg'
           },

          { url: '../public/videos/df3f9fcb4aac3224f69f8dab22f657bb.mp4', type: 'local',
            thumbnail: '../public/Images/462932421_7677982035637982_8133384283652711148_n.jpg'
           }
        ],
        virtualTour: 'https://3d-tour-link.com/project1'
      }
    },

    


    {
        id: 2, 
      image: 'src/components/pages/Images/82604517_2141155279320713_5725934327536025600_n.jpg',
      title: 'Innovation Tech Hub',
      description: '12-story mixed-use technology campus',
      location: 'Lagos, NG',
      status: 'ongoing',
      details: {
        specifications: {
          area: '6500 sq ft',
          floors: '3',
          bedrooms: '6',
          completion: '2023'
        },
        imageGallery: [
          '/images/gallery/urban-1.jpg',
          '/images/gallery/urban-2.jpg'
        ],
        videos: [
          { url: '/videos/urban-overview.mp4', type: 'local',
            thumbnail: '../public/Images/462932421_7677982035637982_8133384283652711148_n.jpg'
           },
          { url: 'https://youtu.be/abc123', type: 'local' ,
            thumbnail: '../public/Images/462932421_7677982035637982_8133384283652711148_n.jpg'
          }
        ],
        virtualTour: 'https://3d-tours.com/urban-oasis'
      }
    },

    {
        id: 3, 
      image: 'src/components/pages/Images/img3.jpg',
      title: 'Coastal Luxury Retreat',
      description: 'Private beachfront estate with wellness center',
      location: 'Cape Coast, GH',
      status: 'ongoing',
      details: {
        specifications: {
          area: '6500 sq ft',
          floors: '3',
          bedrooms: '6',
          completion: '2023'
        },
        imageGallery: [
          '../public/Images/img4.jpg',
          '/images/gallery/urban-2.jpg'
        ],
        videos: [
          { url: './public/videos/23881-337972830.mp4', type: 'local',
            thumbnail: '../public/Images/462932421_7677982035637982_8133384283652711148_n.jpg'
           },
          { url: 'https://youtu.be/abc123', type: 'local',
            thumbnail: '../public/Images/462932421_7677982035637982_8133384283652711148_n.jpg'
           }
        ],
        virtualTour: 'https://3d-tours.com/urban-oasis'
      }
    },
    {
      id: 4,
      image: 'src/components/pages/Images/81836978_2141186975984210_991424691258261504_n.jpg',
      title: 'Eco Vertical Village',
      description: 'Green-certified high-rise community',
      location: 'Nairobi, KE',
      status: 'completed',
      details: {
        specifications: {
          area: '6500 sq ft',
          floors: '3',
          bedrooms: '6',
          completion: '2023'
        },
        imageGallery: [
          'src/components/pages/Images/81945302_2141154495987458_8142382399708200960_n.jpg',
          'src/components/pages/Images/82604517_2141155279320713_5725934327536025600_n.jpg'
        ],
        videos: [
          { url: './components/pages/videos/23881-337972830.mp4', type: 'local',
            thumbnail: '../public/Images/462932421_7677982035637982_8133384283652711148_n.jpg'
           },
          { url: 'https://youtu.be/abc123', type: 'local',
            thumbnail: '../public/Images/462932421_7677982035637982_8133384283652711148_n.jpg'
           }
        ],
        virtualTour: 'https://3d-tours.com/urban-oasis'
      }
    }
  ];




import pdl from '../public/Images/81945302_2141154495987458_8142382399708200960_n.jpg'

import pdl2 from '../public/Images/462932421_7677982035637982_8133384283652711148_n.jpg'

import pdl3 from '../public/Images/1706916591344.jpg'


  export const allProjects: Project[] = [
    {
      id: 1,
      category: 'architectural',
      title: 'Modern Skyscraper',
      description:'Private beachfront estate with wellness center', 
      status: 'completed',
      image: pdl,
      location: 'New York, US',
      details: {
        specifications: {
          height: '300m',
          floors: '80',
          area: '150,000 sq ft',
          completion: '2022'
        },
        architects: ['John Architect', 'Jane Designer'],
        timeline: '2018-2022',
        materials: ['Reinforced Concrete', 'Glass Facade', 'Steel Framework'],
        imageGallery: [
          pdl,
          pdl2,
         pdl3
        ],
        videos: [
          { url: '../public/videos/02673085c141fa1529b528534962bf26.mp4', type: 'local' ,
            thumbnail: '../public/Images/81945302_2141154495987458_8142382399708200960_n.jpg'
          },
          { url: '../public/videos/df3f9fcb4aac3224f69f8dab22f657bb.mp4', type: 'local',
            thumbnail: '../public/Images/462932421_7677982035637982_8133384283652711148_n.jpg'
           }
        ],
        blueprints: ['/downloads/skyscraper-structural.pdf'],
        virtualTour: 'https://3dtour.com/skyscraper'
      }
    },


    {
      id: 2,
      category: 'architectural',
      title: 'Eco-Friendly Housing',
      description:'Private beachfront estate with wellness center', 
      status: 'ongoing',
      image: '../public/Images/81945302_2141154495987458_8142382399708200960_n.jpg',
      location: 'New York, US',
      details: {
        specifications: {
          height: '300m',
          floors: '80',
          area: '150,000 sq ft',
          completion: '2022'
        },
        architects: ['John Architect', 'Jane Designer'],
        timeline: '2018-2022',
        materials: ['Reinforced Concrete', 'Glass Facade', 'Steel Framework'],
        imageGallery: [
          '../public/Images/462932421_7677982035637982_8133384283652711148_n.jpg',
          '../public/Images/img3.jpg',
          '../public/Images/interor.jpg'
        ],
        videos: [
          { url: '../public/videos/02673085c141fa1529b528534962bf26.mp4', type: 'local' ,
            thumbnail: '../public/Images/81945302_2141154495987458_8142382399708200960_n.jpg'
          },
          { url: '../public/videos/df3f9fcb4aac3224f69f8dab22f657bb.mp4', type: 'local',
            thumbnail: '../public/Images/462932421_7677982035637982_8133384283652711148_n.jpg'
           }
        ],
        blueprints: ['/downloads/skyscraper-structural.pdf'],
        virtualTour: 'https://3dtour.com/skyscraper'
      }
    }
  ];