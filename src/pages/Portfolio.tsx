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
    <motion.div
      className="split-layout"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div
        className="completed-column"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Completed Projects ({completedProjects.length})
        </motion.h3>
        <div className="projects-container">
          {completedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
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
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="ongoing-column"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          Ongoing Projects ({ongoingProjects.length})
        </motion.h3>
        <div className="projects-container">
          {ongoingProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1 + 0.6,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
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
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
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
    <motion.div
      className="category-filter"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.div
        className="filter-tabs"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            className={`filter-tab ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category.id)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1 + 0.3,
              ease: "easeOut"
            }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
          >
            {category.label}
          </motion.button>
        ))}
      </motion.div>
      <ProjectGrid selectedCategory={selectedCategory} />
    </motion.div>
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
    <motion.div
      className="projects-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.section
        className="headerSliderContainer"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="headerSliderTrack" style={{ height: '40vh' }}>
          <motion.div
            className="headerControls"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="headerControlBtn"
              onClick={() => handleNavigation('prev')}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(255, 140, 0, 0.8)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <FiArrowLeft />
            </motion.button>
            <motion.button
              className="headerControlBtn"
              onClick={() => handleNavigation('next')}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(255, 140, 0, 0.8)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <FiArrowRight />
            </motion.button>
          </motion.div>

          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={activeSlide}
              className="headerSlide"
              initial={{ opacity: 0, x: slideDirection === 'next' ? '100%' : '-100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: slideDirection === 'next' ? '-100%' : '100%' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <motion.div
                className="headerSlideVisual"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.img
                  src={featuredProjects[activeSlide].image}
                  alt=""
                  className="headerSlideImg"
                  loading="lazy"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                />
                <motion.span
                  className={`headerStatus ${featuredProjects[activeSlide].status}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  {featuredProjects[activeSlide].status}
                </motion.span>
              </motion.div>

              <motion.div
                className="headerSlideContent"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <motion.h3
                  className="headerSlideTitle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {featuredProjects[activeSlide].title}
                </motion.h3>
                <motion.p
                  className="headerSlideDesc"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {featuredProjects[activeSlide].description}
                </motion.p>
                <motion.div
                  className="headerSlideMeta"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <span className="headerLocation">📍 {featuredProjects[activeSlide].location}</span>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={`/projects/${featuredProjects[activeSlide].id}`}
                      className="slide-view-more"
                      state={{ projectData: featuredProjects[activeSlide] }}
                    >
                      View More →
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          className="headerProgress"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
        >
          {featuredProjects.map((_, index) => (
            <motion.button
              key={index}
              className={`headerProgressDot ${index === activeSlide ? 'active' : ''}`}
              onClick={() => setActiveSlide(index)}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1 + 0.9,
                type: "spring",
                stiffness: 200
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </motion.div>
      </motion.section>
      <CategoryFilter />
    </motion.div>
  );
};

export default Projects;