import {  useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiZoomIn, FiVideo, FiArrowUpRight } from 'react-icons/fi';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import './pages/styles/Architectural.css'; 

import video1 from '../../public/videos/02673085c141fa1529b528534962bf26.mp4'
import thumb1 from '../../public/images/1705497058699.jpg'




interface MediaItem {
  id: number;
  type: 'image' | 'video';
  url: string;
  title: string;
  location: string;
  thumbnail?: string; 
}

const ArchitecturePage = () => {    
  // Removed unused selectedMedia state
  const mediaRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: mediaRef });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.1]);

  const mediaItems: MediaItem[] = [
    
    { id: 1, type: 'video', url: video1, title: 'Modern Villa', location: 'Los Angeles', thumbnail: thumb1 },
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
      <section className="hero-section1">
        <motion.div 
          className="hero-content1"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-container1">
            <h1 className="eh1">
              <span className="highlight1">Architectural</span> Innovation
              <br />
              That Shapes Tomorrow
            </h1>
            <p className="subheadline1">
              Creating spaces that <span className="accent-text1">inspire human connection</span>,
              <br />
              blending cutting-edge technology with sustainable design principles.
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
      <section className="media-gallery1" ref={mediaRef}>
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
                  light={item.thumbnail || true}
                  playIcon={
                  <div className="play-icon-container">
                  <FiVideo size={40} />
                </div>}
                 style={{ backgroundImage: `url(${item.thumbnail})` }}
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

   <motion.section 
        className="project-cta"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="cta-content">
          <h2>Ready to Bring Your Vision to Life?</h2>
          <p>Let's collaborate to create architectural marvels that stand the test of time</p>
          
          <motion.div 
            className="cta-button-container"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/contact" className="cta-button">
              Start Your Project
              <FiArrowUpRight className="arrow-icon" />
            </Link>
          </motion.div>
          
          <div className="neon-line"></div>
        </div>
      </motion.section>
    
    </motion.div>



  );
};



export default ArchitecturePage;