import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowRight,
  FaPlay,
 
  FaHeart,
  FaEye,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaRulerCombined,
  
  FaAward,
  FaLightbulb,
  FaCogs,
  FaRocket,
  FaCheckCircle,
  
  FaBuilding,
 
} from 'react-icons/fa';
import '../styles/pages/ArchitecturalDesign.css';
import { allProjects } from '../data';

const ArchitecturalDesign = () => {
  const [likedProjects, setLikedProjects] = useState(new Set<string | number>());

  const toggleLike = (projectId: string | number) => {
    setLikedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  // Architectural projects from data
  const architecturalProjects = allProjects.filter(p => p.category === 'architectural').map(p => ({
    id: p.id,
    title: p.title,
    description: p.description,
    image: p.image,
    video: p.details?.videos?.[0]?.url || '',
    type: "Architectural",
    location: p.location,
    year: p.details?.specifications?.completion || '2023',
    size: p.details?.specifications?.area || 'N/A',
    budget: "Contact for details",
    status: p.status,
    features: p.details?.materials || [],
    architect: "Efie Plans Team",
    likes: 0,
    views: 0
  }));

  const services = [
    {
      icon: <FaLightbulb />,
      title: "Conceptual Design",
      description: "Transform your ideas into detailed architectural concepts that capture the essence of your vision while considering functionality and aesthetics."
    },
    {
      icon: <FaCogs />,
      title: "Technical Drawings",
      description: "Precise technical drawings and specifications that meet building codes and ensure seamless construction execution."
    },
    {
      icon: <FaRocket />,
      title: "Sustainable Design",
      description: "Eco-friendly architectural solutions that minimize environmental impact while maximizing energy efficiency and comfort."
    },
    {
      icon: <FaBuilding />,
      title: "3D Visualization",
      description: "Experience your project before construction begins with detailed 3D renderings and virtual tours."
    },
    {
      icon: <FaCheckCircle />,
      title: "Code Compliance",
      description: "All designs meet local building codes and regulations, ensuring smooth approval processes."
    },
    {
      icon: <FaAward />,
      title: "Quality Assurance",
      description: "Strategic design decisions that balance aesthetics with construction efficiency and budget constraints."
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: "Consultation",
      description: "Understanding your vision, requirements, and budget through detailed discussions and site analysis."
    },
    {
      number: 2,
      title: "Design Development",
      description: "Creating initial concepts and refining them based on your feedback and site analysis."
    },
    {
      number: 3,
      title: "Technical Documentation",
      description: "Developing detailed plans, elevations, and specifications for construction."
    },
    {
      number: 4,
      title: "Project Handover",
      description: "Delivering complete documentation and supporting you through the construction phase."
    }
  ];

  return (
    <div className="architectural-design-page">
      {/* Hero Section */}
      <section className="arch-hero">
        <div className="arch-floating-elements">
          <div className="arch-floating-element"></div>
          <div className="arch-floating-element"></div>
          <div className="arch-floating-element"></div>
        </div>
        
        <div className="arch-hero-content">
          <h1>Architectural Design Excellence</h1>
          <p>
            Creating innovative and sustainable building solutions that blend functionality,
            aesthetics, and environmental consciousness. Discover our portfolio of award-winning
            architectural designs that transform spaces and inspire communities.
          </p>
          <div className="arch-hero-buttons">
            <Link to="/contact" className="arch-btn arch-btn-primary">
              Start Your Project
            </Link>
            <Link to="#portfolio" className="arch-btn arch-btn-secondary">
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section id="portfolio" className="arch-portfolio">
        <div className="arch-portfolio-header">
          <h2>Our Architectural Portfolio</h2>
          <p>
            Explore our diverse collection of architectural projects, from residential villas to 
            commercial complexes, each designed with precision, innovation, and sustainability in mind.
          </p>
        </div>

        <div className="arch-projects-grid">
          {architecturalProjects.map((project) => (
            <div key={project.id} className="arch-project-card">
              <div className="arch-project-media">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="arch-project-image"
                />
                <div className="arch-project-overlay">
                  <div className="arch-play-button">
                    <FaPlay />
                  </div>
                </div>
              </div>
              
              <div className="arch-project-info">
                <h3 className="arch-project-title">{project.title}</h3>
                <p className="arch-project-description">{project.description}</p>
                
                <div className="arch-project-details">
                  <span className="arch-project-detail">
                    <FaMapMarkerAlt style={{ marginRight: '8px' }} />
                    {project.location}
                  </span>
                  <span className="arch-project-detail">
                    <FaCalendarAlt style={{ marginRight: '8px' }} />
                    {project.year}
                  </span>
                  <span className="arch-project-detail">
                    <FaRulerCombined style={{ marginRight: '8px' }} />
                    {project.size}
                  </span>
                  <span className="arch-project-detail">
                    <FaBuilding style={{ marginRight: '8px' }} />
                    {project.type}
                  </span>
                </div>

                <div className="arch-project-features">
                  {project.features.map((feature, index) => (
                    <span key={index} className="arch-project-detail">
                      {feature}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <button 
                      onClick={() => toggleLike(project.id)}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: likedProjects.has(project.id) ? '#ff6b6b' : '#666',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <FaHeart />
                      {project.likes + (likedProjects.has(project.id) ? 1 : 0)}
                    </button>
                    <span style={{ color: '#666', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FaEye />
                      {project.views}
                    </span>
                  </div>
                  
                  <Link to={`/projects/${project.id}`} className="arch-project-link">
                    View Details <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="arch-services">
        <div className="arch-services-content">
          <div className="arch-services-header">
            <h2>Our Architectural Services</h2>
            <p>
              From concept to completion, we provide comprehensive architectural design services
              that bring your vision to life with precision and excellence.
            </p>
          </div>

          <div className="arch-services-grid">
            {services.map((service, index) => (
              <div key={index} className="arch-service-card">
                <div className="arch-service-icon">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="arch-process">
        <div className="arch-process-content">
          <div className="arch-process-header">
            <h2>Our Design Process</h2>
            <p>
              A systematic approach to bringing your architectural vision to life
            </p>
          </div>

          <div className="arch-process-steps">
            {processSteps.map((step, index) => (
              <div key={index} className="arch-process-step">
                <div className="arch-step-number">{step.number}</div>
                <h3 className="arch-step-title">{step.title}</h3>
                <p className="arch-step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="arch-cta">
        <div className="arch-cta-content">
          <h2>Ready to Bring Your Vision to Life?</h2>
          <p>
            Let's discuss your architectural project and create something truly extraordinary together.
            Our team of experienced architects is ready to transform your ideas into reality.
          </p>
          <div className="arch-cta-buttons">
            <Link to="/contact" className="arch-btn arch-btn-primary">
              Get Started Today <FaArrowRight />
            </Link>
            <Link to="/projects" className="arch-btn arch-btn-secondary">
              View Our Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArchitecturalDesign;