import { useState, useEffect, useCallback } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import '../styles/pages/Portfolio.css';
import { allProjects } from '../data';

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
              <img src={project.image} alt={project.title} className="project-image" />
              <div className="project-info">
                <h4>{project.title}</h4>
                <p className="project-location">📍 {project.location}</p>
                <Link 
                  to={`/projects/${project.id}`} 
                  className="project-view-more"
                  state={{ projectData: project }}
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
              <img src={project.image} alt={project.title} className="project-image" loading="lazy" />
              <div className="project-info">
                <h4>{project.title}</h4>
                <p className="project-location">📍 {project.location}</p>
                <Link 
                  to={`/projects/${project.id}`} 
                  className="project-view-more"
                  state={{ projectData: project }}
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
    { id: 'constructions', label: 'Constructions' }
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

  // Get featured projects (first 4)
  const featuredProjects = allProjects.slice(0, 4);

  const handleNavigation = useCallback((direction: 'next' | 'prev') => {
    setSlideDirection(direction);
    setActiveSlide(prev =>
      direction === 'next'
        ? (prev + 1) % featuredProjects.length
        : (prev - 1 + featuredProjects.length) % featuredProjects.length
    );
  }, [featuredProjects.length]);

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        handleNavigation('next');
      }, 7000);
      return () => clearInterval(timer);
    }
  }, [isPaused, handleNavigation]);

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
                  src={featuredProjects[activeSlide].image}
                  alt=""
                  className="headerSlideImg"
                  loading="lazy"
                />
                <span className={`headerStatus ${featuredProjects[activeSlide].status}`}>
                  {featuredProjects[activeSlide].status}
                </span>
              </div>
              
              <div className="headerSlideContent">
                <h3 className="headerSlideTitle">{featuredProjects[activeSlide].title}</h3>
                <p className="headerSlideDesc">{featuredProjects[activeSlide].description}</p>
                <div className="headerSlideMeta">
                  <span className="headerLocation">📍 {featuredProjects[activeSlide].location}</span>
                  <Link 
                    to={`/projects/${featuredProjects[activeSlide].id}`}
                    className="slide-view-more"
                    state={{ projectData: featuredProjects[activeSlide] }}
                  >
                    View More →
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="headerProgress">
          {featuredProjects.map((_, index) => (
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