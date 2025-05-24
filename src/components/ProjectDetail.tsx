import { useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FaPlay, FaArrowLeft, 
} from 'react-icons/fa';
import { allProjects } from '../data';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Video } from './types'; // Ensure the Video type is exported from './types'
import './pages/styles/ProjectDetail.css';




const MediaGrid = ({ items, type }: { items: (string | Video)[], type: 'image' | 'video' }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="media-grid">
      {items.map((item, index) => {
        const src = typeof item === 'string' ? item : item.thumbnail;

        return (
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
              src={src}
              alt={`${type} thumbnail ${index + 1}`}
            />
          </div>
        );
      })}

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
                original: typeof item === 'string' ? item : item.url,
                thumbnail: typeof item === 'string' ? item : item.thumbnail
              }))}
              startIndex={selectedIndex}
            />
          ) : (
            <video
              controls
              autoPlay
              className="video-player"
              src={typeof items[selectedIndex] === 'string' 
                ? items[selectedIndex] as string
                : (items[selectedIndex] as Video).url}
            />
          )}
        </div>
      )}
    </div>
  );
};;

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = allProjects.find(p => p.id === Number(id));

  if (!project) {
    return (
      <div className="not-found">
        <h2>Project Not Found</h2>
        <Link to="/projects" className="back-button">
          <FaArrowLeft /> Return to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="project-detail">
      <header className="project-header">
        <Link to="/projects" className="back-button">
          <FaArrowLeft /> All Projects
        </Link>
        <h1>{project.title}</h1>
        <div className="meta-info">
          <span className="category">{project.category}</span>
          <span className={`status ${project.status}`}>
            {project.status.toUpperCase()}
          </span>
        </div>
      </header>

      <main className="project-content">
        <img src={project.image} alt={project.title} className="hero-image" />

        <section className="content-section2">
          <h2>Project Overview</h2>
          <p className="description">{project.description}</p>
          
          <div className="spec-grid">
            <div className="spec-item location">
              <span className="label">Location</span>
              <span className="value">📍 {project.location}</span>
            </div>
            {Object.entries(project.details.specifications).map(([key, value]) => (
              <div className="spec-item" key={key}>
                <span className="label">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="value">{value}</span>
              </div>
            ))}
          </div>
        </section>

        {(project.details.imageGallery ?? []).length > 0 && (
          <section className="media-section">
            <h2>Project Gallery</h2>
            <MediaGrid items={project.details.imageGallery ?? []} type="image" />
          </section>
        )}

{project.details.videos?.length && (
  <section className="media-section">
    <h2>Video Content</h2>
    <MediaGrid 
      items={project.details.videos}
      type="video" 
    />
  </section>
)}

      </main>
    </div>
  );
};

export default ProjectDetail;