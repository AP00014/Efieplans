import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiZoomIn, FiVideo, FiArrowUpRight } from 'react-icons/fi';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import './Interor.css'; // Create this CSS file

interface MediaItem {
  id: number;
  type: 'image' | 'video';
  url: string;
  title: string;
  location: string;
}

const ArchitecturePage = () => {    
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const mediaRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: mediaRef });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.1]);

  const mediaItems: MediaItem[] = [
    
    { id: 1, type: 'video', url: 'https://youtube.com/watch?v=...', title: 'Modern Villa', location: 'Los Angeles' },
    { id: 2, type: 'video', url: 'https://youtube.com/watch?v=...', title: 'Eco Complex', location: 'Singapore' },
    { id: 3, type: 'image', url: './Images/81836978_2141186975984210_991424691258261504_n.jpg', title: 'Urban Oasis', location: 'Dubai' },
    { id: 4, type: 'image', url: '/projects/project1.jpg', title: 'Skyline Tower', location: 'New York' }

  ];

  return (
    <motion.div 
      className="portfolio-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <section className="hero-section3 ">
        <motion.div 
          className="hero-content1"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-container1">
            <h1 className="eh1">
             
            Crafting  <span className="highlight">Living Spaces</span>
              <br />
            </h1>
            <p className="subheadline">
            Transform your environment with bespoke interior solutions
            </p>
          </div>

          <motion.div 
            className="cta-container"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
           
          </motion.div>
        </motion.div>
      </section>

      {/* Media Gallery Section */}
      <section className="media-gallery" ref={mediaRef}>
        <motion.div 
          className="gallery-header"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2>Featured Projects</h2>
          <p>Exploring the intersection of form and function</p>
        </motion.div>

        <motion.div 
          className="media-grid"
          style={{ scale }}
        >
          {mediaItems.map((item, index) => (
            <motion.div 
              key={item.id}
              className="media-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedMedia(item)}
            >
              {item.type === 'image' ? (
                <img 
                  src={item.url} 
                  alt={item.title}
                  loading="lazy"
                />
              ) : (
                <ReactPlayer
                  url={item.url}
                  width="100%"
                  height="100%"
                  light
                  playIcon={<FiVideo size={40} />}
                />
              )}
              <div className="media-overlay">
                <div className="media-info">
                  <h3>{item.title}</h3>
                  <p>{item.location}</p>
                </div>
                <button className="zoom-button">
                  <FiZoomIn size={24} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>


   
      </section>

      <motion.div 
  className="cta5-container"
  whileHover={{ scale: 1.05 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  <div className="button-group">
  <Link to="/projects" className="Cta-button5">
  View Projects
  <FiArrowUpRight className="cta-icon" />
   </Link>
    <span className="button-caption">Explore 50+ innovative designs</span>
  </div>

  <div className="button-group">
   
<Link to="/contact" className="Cta-button5">
  Start Your Project
  <FiArrowUpRight className="cta-icon" />
</Link>
    <span className="button-caption">Schedule a consultation today</span>
  </div>

  <span className="awards-text">
    Recognized by Architectural Digest & AIA
  </span>
</motion.div>

      {/* Modal */}
      {selectedMedia && (
        <motion.div 
          className="media-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedMedia(null)}
        >
          <div className="modal-content">
            {selectedMedia.type === 'image' ? (
              <img src={selectedMedia.url} alt={selectedMedia.title} />
            ) : (
              <ReactPlayer
                url={selectedMedia.url}
                width="100%"
                height="100%"
                controls
              />
            )}
            <div className="modal-footer">
              <h2>{selectedMedia.title}</h2>
              <p>{selectedMedia.location}</p>
              <a href="#" className="project-link">
                View Project <FiArrowUpRight />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>



  );
};



export default ArchitecturePage;