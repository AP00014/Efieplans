import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiVideo, FiArrowUpRight,} from 'react-icons/fi';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { allProjects } from '../data';

import '../styles/pages/ArchitecturalDesign.css';


interface MediaItem {
  id: number;
  type: 'image' | 'video';
  url: string;
  title: string;
  location: string;
  description: string;
  thumbnail?: string;
}

const ArchitecturePage = () => {
  const [playingId, setPlayingId] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRefs = useRef<{ [key: number]: any }>({});

  // Filter architectural projects from data.ts
  const architecturalProjects = allProjects.filter(project => project.category === 'architectural');

  // Transform projects to match the MediaItem interface
  const mediaItems: MediaItem[] = architecturalProjects.map(project => ({
    id: project.id,
    type: project.details?.videos && project.details.videos.length > 0 ? 'video' : 'image',
    url: project.details?.videos && project.details.videos.length > 0 ? project.details.videos[0].url : project.image,
    title: project.title,
    location: project.location,
    description: project.description,
    thumbnail: project.details?.videos && project.details.videos.length > 0 ? project.details.videos[0].thumbnail : project.image
  }));

  // Separate videos and images
  const videoItems = mediaItems.filter(item => item.type === 'video');
  const imageItems = mediaItems.filter(item => item.type === 'image');

  const handlePlay = (id: number) => {
    console.log('Playing video:', id);
    setPlayingId(id);
  };


  const handleReady = (id: number) => {
    console.log('ReactPlayer ready for video:', id);
    if (playerRefs.current[id]) {
      console.log('Player ref exists, adding class');
      // Note: ReactPlayer ref doesn't have classList, this was incorrect
      // The className prop should be used instead
    }
  };

  return (
    <motion.div className="architectural-design-page">
      {/* Hero Section */}
      <section className="arch-hero">
        <motion.div
          className="arch-hero-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="arch-hero h1">
            <span>Architectural</span> Innovation
            <br />
            That Shapes Tomorrow
          </h1>
          <p className="arch-hero p">
            Creating spaces that <span>inspire human connection</span>,
            <br />
            blending cutting-edge technology with sustainable design principles.
          </p>
        </motion.div>
      </section>

      {/* Media Gallery Section */}
      <section className="arch-portfolio">
        <div className="arch-portfolio-header">
          <h2>Featured Projects</h2>
          <p>Exploring the intersection of form and function</p>
        </div>

        {/* Video Projects Section */}
        <div className="section-divider">
          <div className="divider-line"></div>
          <h3 className="section-title">Video Showcases</h3>
          <div className="divider-line"></div>
        </div>

        <div className="arch-projects-grid">
          {videoItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="arch-project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="arch-project-media">
                {playingId === item.id ? (
                  <div className="video-player-wrapper">
                    <ReactPlayer
                      ref={(player) => { playerRefs.current[item.id] = player }}
                      src={item.url}
                      width="100%"
                      height="100%"
                      playing={true}
                      controls={true}
                      onReady={() => handleReady(item.id)}
                      className="react-player"
                    />
                    <div className="video-badge">
                      <FiVideo size={16} />
                      <span>Video</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      loading="lazy"
                      className="arch-project-image"
                    />
                    <div className="arch-project-overlay">
                      <button
                        className="arch-play-button"
                        onClick={() => handlePlay(item.id)}
                      >
                        <FiVideo size={40} />
                      </button>
                    </div>
                    <div className="video-badge">
                      <FiVideo size={16} />
                      <span>Video</span>
                    </div>
                  </>
                )}
              </div>
              <div className="arch-project-info">
                <h3 className="arch-project-title">{item.title}</h3>
                <p>{item.location}</p>
                <p className="arch-project-description">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Image Projects Section */}
        <div className="section-divider">
          <div className="divider-line"></div>
          <h3 className="section-title">Architectural Photography</h3>
          <div className="divider-line"></div>
        </div>

        <div className="arch-projects-grid">
          {imageItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="arch-project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="arch-project-media">
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  className="arch-project-image"
                />
                <div className="arch-project-overlay">
                  <div className="arch-play-button">
                    <FiVideo size={40} />
                  </div>
                </div>
              </div>
              <div className="arch-project-info">
                <h3 className="arch-project-title">{item.title}</h3>
                <p>{item.location}</p>
                <p className="arch-project-description">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Project CTA */}
      <section className="arch-cta">
        <div className="arch-cta-content">
          <h2>Ready to Bring Your Vision to Life?</h2>
          <p>Let's collaborate to create architectural marvels that stand the test of time</p>

          <div className="arch-cta-buttons">
            <Link to="/contact" className="arch-btn arch-btn-primary">
              Start Your Project
              <FiArrowUpRight />
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ArchitecturePage;