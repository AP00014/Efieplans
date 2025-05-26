import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { slides } from '../data';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { FaPlay, FaArrowLeft } from 'react-icons/fa';
import '../components/pages/styles/featuredDetail.css';
import { MediaItem } from './types';

const MediaGrid = ({ items, type }: { items: MediaItem[], type: 'image' | 'video' }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);





  return (
    <div className="media-grid">
      {items.map((item, index) => (
        <div 
          key={index}
          className="media-thumbnail"
          onClick={() => {
            setSelectedIndex(index);
            setShowModal(true);
          }}
        >
          {type === 'video' && (
            <div className="video-overlay">
              <FaPlay className="play-icon" />
            </div>
          )}
          <img 
            src={type === 'image' ? item.url : item.thumbnail}
            alt={`${type} thumbnail ${index + 1}`}
          />
        </div>
      ))}

      {showModal && (
        <div className="media-modal">
          <button 
            className="close-button"
            onClick={() => setShowModal(false)}
          >
            &times;
          </button>
          
          {type === 'image' ? (
            <ImageGallery
              items={items.map(item => ({
                original: item.url,
                thumbnail: item.thumbnail || item.url
              }))}
              startIndex={selectedIndex}
              showPlayButton={false}
              showFullscreenButton={true}
            />
          ) : (
            <video
              controls
              autoPlay
              className="video-player"
              src={items[selectedIndex].url}
            />
          )}
        </div>
      )}
    </div>
  );
};

const FeaturedDetail = () => {
  const { id } = useParams<{ id: string }>();
  const slide = slides.find(s => s.id === Number(id));

  if (!slide) {
    return (
      <div className="error-state">
        <h2>Project Not Found</h2>
        <Link to="/projects" className="back-button">
          <FaArrowLeft /> Return to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="featured-container">
      <header className="project-header">
        <Link to="/projects" className="back-button">
          <FaArrowLeft /> All Projects
        </Link>
        <h1>{slide.title}</h1>
        <div className="status-badge">
          <span className={slide.status}>{slide.status.toUpperCase()}</span>
        </div>
      </header>

      <main className="project-content">
        <img src={slide.image} alt={slide.title} className="hero-image" />

        <section className="project-overview">
          <h2>About the Project</h2>
          <p>{slide.description}</p>
          
          <div className="specs-grid">
            <div className="spec-item">
              <span className="label">Location</span>
              <span className="value">📍 {slide.location}</span>
            </div>
            
            {Object.entries(slide.details?.specifications ?? {}).map(([key, value]) => (
              <div className="spec-item" key={key}>
                <span className="label">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="value">{value}</span>
              </div>
            ))}
          </div>
        </section>

        {(slide.details.imageGallery ?? []).length > 0 && (
          <section className="media-section">
            <h2>Project Gallery</h2>
            <MediaGrid 
              items={(slide.details.imageGallery ?? []).map(url => 
                typeof url === 'string' ? { url, thumbnail: url } : url
              )} 
              type="image" 
            />
          </section>
        )}
        {(slide.details?.videos?.length ?? 0) > 0 && (
          <section className="media-section">
            <h2>Video Content</h2>
            <MediaGrid
              items={slide.details.videos ?? []}
              type="video"
            />
          </section>
        )}

       
      </main>
    </div>
  );
};

export default FeaturedDetail;