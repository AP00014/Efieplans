import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/pages/Portfolio.css';
import { allProjects } from '../data';

const ProjectGrid = ({ selectedCategory }: { selectedCategory: string }) => {
  const filteredProjects = selectedCategory === 'all'
    ? allProjects
    : allProjects.filter(project => project.category === selectedCategory);

  return (
    <motion.div
      className="projects-grid"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="projects-container">
        {filteredProjects.map((project, index) => (
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
  );
};

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'town-houses', label: 'Town Houses' },
  { id: 'group-dualling', label: 'Group Dualling' }
];

const CategoryFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'all';

  const handleCategoryChange = (categoryId: string) => {
    setSearchParams(categoryId === 'all' ? {} : { category: categoryId });
  };

  const getSlidesToShow = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 480) return Math.min(categories.length, 3);
      if (window.innerWidth <= 768) return Math.min(categories.length, 3);
      if (window.innerWidth <= 1024) return Math.min(categories.length, 3);
      return Math.min(categories.length, 4);
    }
    return Math.min(categories.length, 4);
  }, []);

  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(getSlidesToShow());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getSlidesToShow]);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(categories.length, 3),
          arrows: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(categories.length, 3),
          arrows: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(categories.length, 3),
          arrows: true,
        }
      }
    ]
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
        <Slider {...sliderSettings}>
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1 + 0.3,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
            >
              <button
                className={`filter-tab ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category.id)}
                style={{
                  width: '100%',
                  margin: '0 5px',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '25px',
                  backgroundColor: selectedCategory === category.id ? '#007bff' : '#f8f9fa',
                  color: selectedCategory === category.id ? '#fff' : '#333',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.backgroundColor = '#e9ecef';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                  }
                }}
              >
                {category.label}
              </button>
            </motion.div>
          ))}
        </Slider>
      </motion.div>
      <ProjectGrid selectedCategory={selectedCategory} />
    </motion.div>
  );
};

const Projects = () => {

  return (
    <motion.div
      className="projects-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* <motion.section
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
      </motion.section> */}
      <CategoryFilter />
    </motion.div>
  );
};

export default Projects;