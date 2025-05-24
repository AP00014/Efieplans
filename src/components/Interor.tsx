// ArchitecturePage.tsx
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiZoomIn, FiVideo, FiArrowUpRight } from 'react-icons/fi';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import './Interor.css';

interface ArcMediaItem {
  id: number;
  type: 'image' | 'video';
  url: string;
  title: string;
  location: string;
}

const ArchitecturePage = () => {    
  const [activeMedia, setActiveMedia] = useState<ArcMediaItem | null>(null);
  const arcScrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: arcScrollRef });
  const arcScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.1]);

  const arcProjects: ArcMediaItem[] = [
    { id: 1, type: 'video', url: 'https://youtube.com/watch?v=...', title: 'Modern Villa', location: 'Los Angeles' },
    { id: 2, type: 'video', url: 'https://youtube.com/watch?v=...', title: 'Eco Complex', location: 'Singapore' },
    { id: 3, type: 'image', url: './Images/arc-project1.jpg', title: 'Urban Oasis', location: 'Dubai' },
    { id: 4, type: 'image', url: '/projects/arc-showcase.jpg', title: 'Skyline Tower', location: 'New York' }
  ];

  return (
    <motion.div 
      className="arc-root"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <section className="arc-hero-section">
        <motion.div 
          className="arc-hero-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="arc-hero-text">
            <h1 className="arc-main-heading">
              Crafting <span className="arc-highlight">Living Spaces</span>
            </h1>
            <p className="arc-hero-sub">
              Transform your environment with bespoke interior solutions
            </p>
          </div>
        </motion.div>
      </section>

      {/* Project Gallery */}
      <section className="arc-gallery-section" ref={arcScrollRef}>
        <motion.div 
          className="arc-gallery-header"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="arc-gallery-title">Featured Projects</h2>
          <p className="arc-gallery-desc">Exploring form and function</p>
        </motion.div>

        <motion.div 
          className="arc-project-grid"
          style={{ scale: arcScale }}
        >
          {arcProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              className="arc-project-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveMedia(project)}
            >
              {project.type === 'image' ? (
                <img 
                  src={project.url} 
                  alt={project.title}
                  className="arc-project-media"
                  loading="lazy"
                />
              ) : (
                <ReactPlayer
                  url={project.url}
                  width="100%"
                  height="100%"
                  className="arc-project-media"
                  light
                  playIcon={<FiVideo size={40} />}
                />
              )}
              <div className="arc-card-overlay">
                <div className="arc-card-info">
                  <h3 className="arc-card-title">{project.title}</h3>
                  <p className="arc-card-location">{project.location}</p>
                </div>
                <button className="arc-zoom-btn">
                  <FiZoomIn size={24} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <motion.div 
        className="arc-cta-section"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="arc-cta-group">
          <Link to="/projects" className="arc-main-cta">
            View Projects
            <FiArrowUpRight className="arc-cta-icon" />
          </Link>
          <span className="arc-cta-caption">Explore 50+ innovative designs</span>
        </div>

        <div className="arc-cta-group">
          <Link to="/contact" className="arc-main-cta">
            Start Your Project
            <FiArrowUpRight className="arc-cta-icon" />
          </Link>
          <span className="arc-cta-caption">Schedule a consultation today</span>
        </div>

        <span className="arc-awards">
          Recognized by Architectural Digest & AIA
        </span>
      </motion.div>

      {/* Project Modal */}
      {activeMedia && (
        <motion.div 
          className="arc-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setActiveMedia(null)}
        >
          <div className="arc-modal-content" onClick={(e) => e.stopPropagation()}>
            {activeMedia.type === 'image' ? (
              <img 
                src={activeMedia.url} 
                alt={activeMedia.title}
                className="arc-modal-media"
              />
            ) : (
              <ReactPlayer
                url={activeMedia.url}
                width="100%"
                height="100%"
                className="arc-modal-media"
                controls
              />
            )}
            <div className="arc-modal-footer">
              <h2 className="arc-modal-title">{activeMedia.title}</h2>
              <p className="arc-modal-location">{activeMedia.location}</p>
              <Link to="#" className="arc-modal-link">
                View Project <FiArrowUpRight />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ArchitecturePage;