import { useState, useEffect } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './styles/project.css';

import img1 from '../../../public/Images/81945302_2141154495987458_8142382399708200960_n.jpg'
import img2 from '../../../public/Images/82604517_2141155279320713_5725934327536025600_n.jpg'
import img3 from '../../../public/Images/img3.jpg'
import img4 from '../../../public/Images/81836978_2141186975984210_991424691258261504_n.jpg'

const slides = [
  {
    id: 1,
    image: [img1],
    title: 'Aperma Towers',
    description: 'Contemporary 6-bedroom smart home with sustainable design',
    location: 'Accra, GH',
    status: 'completed'
  },
  {
    id: 2,
    image: [img2],
    title: 'Innovation Tech Hub',
    description: '12-story mixed-use technology campus',
    location: 'Lagos, NG',
    status: 'ongoing'
  },
  {
    id: 3,
    image:[img3],
    title: 'Coastal Luxury Retreat',
    description: 'Private beachfront estate with wellness center',
    location: 'Cape Coast, GH',
    status: 'ongoing'
  },
  {
    id: 4,
    image: [img4],
    title: 'Eco Vertical Village',
    description: 'Green-certified high-rise community',
    location: 'Nairobi, KE',
    status: 'completed'
  }
];

const allProjects = [
  { 
    id: 1, 
    category: 'architectural', 
    title: 'Modern Skyscraper',
    status: 'completed',
    image: [img1],
    location: 'New York, US'
  },
  { 
    id: 2, 
    category: 'constructions', 
    title: 'Bridge Construction',
    status: 'ongoing',
    image: [img2],
    location: 'London, UK'
  },
  { 
    id: 3, 
    category: 'renovations', 
    title: 'Historic Renovation',
    status: 'completed',
    image: [img2],
    location: 'Paris, FR'
  },
  { 
    id: 4, 
    category: 'interior', 
    title: 'Luxury Apartment Design',
    status: 'ongoing',
    image: [img3],
    location: 'Tokyo, JP'
  },
  { 
    id: 5, 
    category: 'interior', 
    title: 'Luxury Apartment Design',
    status: 'ongoing',
    image: [img4],
    location: 'Tokyo, JP'
  },
  { 
    id: 6, 
    category: 'interior', 
    title: 'Luxury Apartment Design',
    status: 'ongoing',
    image: [img2],
    location: 'Tokyo, JP'
  },
  { 
    id: 7, 
    category: 'interior', 
    title: 'Luxury Apartment Design',
    status: 'completed',
    image: [img3],
    location: 'Tokyo, JP'
  }
];

const ProjectGrid = ({ selectedCategory }: { selectedCategory: string }) => {
  const filteredProjects = selectedCategory === 'all'
    ? allProjects
    : allProjects.filter(project => project.category === selectedCategory);

  const completedProjects = filteredProjects.filter(p => p.status === 'completed');
  const ongoingProjects = filteredProjects.filter(p => p.status === 'ongoing');

  return (
    <div className="split-layout">
      <div className="completed-column">
        <h3>Completed Projects ({completedProjects.length})</h3>
        <div className="projects-container">
          {completedProjects.map(project => (
            <div key={project.id} className="project-card">
              <img src={project.image[0]} alt={project.title} className="project-image" />
              <div className="project-info">
                <h4>{project.title}</h4>
                <p className="project-location">📍 {project.location}</p>
                
                <Link 
    to={`/projects/${project.id}`} 
    className="project-view-more"
  >
    Explore
  </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="ongoing-column">
        <h3>Ongoing Projects ({ongoingProjects.length})</h3>
        <div className="projects-container">
          {ongoingProjects.map(project => (
            <div key={project.id} className="project-card">
              <img src={project.image[0]} alt={project.title} className="project-image" />
              <div className="project-info">
                <h4>{project.title}</h4>
                <p className="project-location">📍 {project.location}</p>
               
                <Link 
    to={`/projects/${project.id}`} 
    className="project-view-more"
  >
    Explore
  </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CategoryFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'all';

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'architectural', label: 'Architectural Design' },
    { id: 'constructions', label: 'Constructions' },
    { id: 'renovations', label: 'Renovations' },
    { id: 'interior', label: 'Interior Design' }
  ];

  const handleCategoryChange = (categoryId: string) => {
    setSearchParams(categoryId === 'all' ? {} : { category: categoryId });
  };

  return (
    <div className="category-filter">
      <div className="filter-tabs">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`filter-tab ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>
      <ProjectGrid selectedCategory={selectedCategory} />
    </div>
  );
};

const Projects = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        handleNavigation('next');
      }, 7000);
      return () => clearInterval(timer);
    }
  }, [activeSlide, isPaused]);

  const handleNavigation = (direction: 'next' | 'prev') => {
    setSlideDirection(direction);0
    setActiveSlide(prev => 
      direction === 'next' 
        ? (prev + 1) % slides.length 
        : (prev - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className="projects-page">
     
      <section 
        className="headerSliderContainer" 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="headerSliderTrack" style={{ height: '40vh' }}>
          <div className="headerControls">
            <button 
              className="headerControlBtn"
              onClick={() => handleNavigation('prev')}
            >
              <FiArrowLeft />
            </button>
            <button 
              className="headerControlBtn"
              onClick={() => handleNavigation('next')}
            >
              <FiArrowRight />
            </button>
          </div>

           <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={activeSlide}
              className="headerSlide"
              initial={{ opacity: 0, x: slideDirection === 'next' ? '100%' : '-100%' }}
              animate={{ opacity: 1, x: 0 }}

              exit={{ opacity: 0, x: slideDirection === 'next' ? '-100%' : '100%' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <div className="headerSlideVisual">
                <img 
                  src={slides[activeSlide].image[0]} 
                  alt="" 
                  className="headerSlideImg"
                />
                <span className={`headerStatus ${slides[activeSlide].status}`}>
                  {slides[activeSlide].status}
                </span>
              </div>
              
              <div className="headerSlideContent">
                <h3 className="headerSlideTitle">{slides[activeSlide].title}</h3>
                <p className="headerSlideDesc">{slides[activeSlide].description}</p>
                <div className="headerSlideMeta">
                  <span className="headerLocation">📍 {slides[activeSlide].location}</span>
                  <Link 
      to={`/projects/featured/${slides[activeSlide].id}`} 
      className="slide-view-more"
    >
      View More →
    </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="headerProgress">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`headerProgressDot ${index === activeSlide ? 'active' : ''}`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </section>

     
      <CategoryFilter />
    </div>
  );
};

export default Projects;