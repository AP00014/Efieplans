import { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { FaPlay, FaArrowLeft } from 'react-icons/fa';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import '../styles/pages/ProjectDetail.css';
import { allProjects } from '../data';
import type { MediaItem, ProjectItem, VideoSource } from '../types';

const MediaGrid = ({ items, mediaType }: { items: (MediaItem | VideoSource)[], mediaType: 'image' | 'video' }) => {
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
          {mediaType === 'video' && (
            <div className="video-overlay">
              <FaPlay className="play-icon" />
            </div>
          )}
          <img
            src={item.thumbnail}
            alt={`${mediaType} thumbnail ${index + 1}`}
            loading="lazy"
          />
        </div>
      ))}

      {showModal && (
        <div className="media-modal">
          <button className="close-button" onClick={() => setShowModal(false)}>
            &times;
          </button>
          
          {mediaType === 'image' ? (
            <ImageGallery
              items={(items as MediaItem[]).map(item => ({
                original: item.url,
                thumbnail: item.thumbnail
              }))}
              startIndex={selectedIndex}
              showPlayButton={false}
              showFullscreenButton={true}
              lazyLoad={true}
            />
          ) : (
            items[selectedIndex] && 'type' in items[selectedIndex] && (
              (items[selectedIndex] as VideoSource).type === 'local' ? (
                <video
                  controls
                  autoPlay
                  className="video-player"
                  src={items[selectedIndex].url}
                  key={items[selectedIndex].url}
                />
              ) : (
                <iframe
                  className="external-video"
                  src={items[selectedIndex].url}
                  title="Video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )
            )
          )}
        </div>
      )}
    </div>
  );
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const preloadedData = location.state?.projectData as ProjectItem | undefined;

  // Find project by ID
  const item = preloadedData || allProjects.find(p => p.id === Number(id));

  if (!item) {
    return (
      <div className="error-state">
        <h2>Project Not Found</h2>
        <Link to="/projects" className="back-button">
          <FaArrowLeft /> Return to Projects
        </Link>
      </div>
    );
  }

  // Normalize media data
  const normalizeMedia = (urls?: string[]): MediaItem[] => 
    (urls || []).map(url => ({ url, thumbnail: url }));

  const imageGallery = normalizeMedia(item.details.imageGallery);
  const videos = item.details.videos || [];

  return (
    <div className="project-detail">
      <header className="project-header">
        <Link to="/projects" className="back-button">
          <FaArrowLeft /> All Projects
        </Link>
        <h1>{item.title}</h1>
        <div className="meta-info">
          {item.category && <span className="category">{item.category}</span>}
          <span className={`status ${item.status}`}>{item.status.toUpperCase()}</span>
        </div>
      </header>

      <main className="project-content">
        <img 
          src={item.image} 
          alt={item.title} 
          className="hero-image"
          loading="lazy"
        />

        <section className="content-section">
          <h2>Project Overview</h2>
          <p>{item.description}</p>

          <div className="specs-grid">
            <div className="spec-item">
              <span className="label">Location</span>
              <span className="value">📍 {item.location}</span>
            </div>
            {item.details.features && (
              <div className="spec-item">
                <span className="label">Features</span>
                <span className="value">
                  {item.details.features.map((feature, i) => (
                    <span key={i} className="feature-tag">{feature}</span>
                  ))}
                </span>
              </div>
            )}

            {item.details.specifications && Object.entries(item.details.specifications).map(([key, value]) => (
              <div className="spec-item" key={key}>
                <span className="label">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="value">{String(value)}</span>
              </div>
            ))}
          </div>
        </section>

       

        {imageGallery.length > 0 && (
          <section className="media-section">
            <h2>Project Gallery</h2>
            <MediaGrid items={imageGallery} mediaType="image" />
          </section>
        )}

        {videos.length > 0 && (
          <section className="media-section">
            <h2>Video Content</h2>
            <MediaGrid items={videos} mediaType="video" />
          </section>
        )}


      </main>
    </div>
  );
};

export default ProjectDetail;