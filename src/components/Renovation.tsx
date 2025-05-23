import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiTool, FiHome, FiRefreshCw, FiCheckCircle, FiX } from 'react-icons/fi';
import { ReactCompareSlider } from 'react-compare-slider';
import './pages/styles/Renovation.css';

import image1 from '../../public/Images/img1.jpg';
import image2 from '../../public/Images/img2.jpg';



interface Project {
  id: number;
  title: string;
  type: string;
  before: string;
  after: string;
  duration: string;
}

const RenovationPage = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const processRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: processRef });
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);

  const projects: Project[] = [
    { 
      id: 1, 
      title: 'Vintage Home Restoration', 
      type: 'Full Home', 
      before: image1,
      after: image2,
      duration: '6 Months' 
    },
    // Add more projects
  ];

  const services = [
    { icon: <FiHome />, title: 'Whole Home', description: 'Complete property transformations' },
    { icon: <FiTool />, title: 'Room Specific', description: 'Kitchens, bathrooms, basements' },
    { icon: <FiRefreshCw />, title: 'Structural', description: 'Foundations, walls, roofing' },
  ];

  return (
    <motion.div 
      className="renovation-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <section className="hero-section">
        <motion.div 
          className="hero-content hc"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1>
            <span className="highlight">Transform</span> Your Space
            <br />
            With Precision Renovation
          </h1>
          <p className="subheadline">
            Specializing in residential and commercial property transformations since 2005
          </p>
          
        
        </motion.div>
        
        <div className="comparison-preview">
          <ReactCompareSlider
            itemOne={<img src={image1} alt="Before" />}
            itemTwo={<img src={image2} alt="After" />}
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <motion.div 
          className="services-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="service-card"
              whileHover={{ scale: 1.02 }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Process Section */}
      <section className="process-section" ref={processRef}>
        <h2>Our Renovation Process</h2>
        <motion.div className="process-steps" style={{ scale }}>
          {['Consultation', 'Design', 'Approval', 'Construction'].map((step, index) => (
            <div key={step} className="process-step">
              <div className="step-number">0{index + 1}</div>
              <h3>{step}</h3>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Portfolio Section */}
      <section className="portfolio-section">
        <h2>Recent Transformations</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="project-card"
              onClick={() => setSelectedProject(project)}
            >
              <ReactCompareSlider
                itemOne={<img src={project.before} alt="Before" />}
                itemTwo={<img src={project.after} alt="After" />}
              />
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.type} · {project.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="project-modal">
        <div className="modal-content">
          <button 
            className="modal-close"
            onClick={() => setSelectedProject(null)}
          >
            <FiX size={24} />
          </button>
          
          <ReactCompareSlider
            itemOne={<img src={selectedProject.before} alt="Before" />}
            itemTwo={<img src={selectedProject.after} alt="After" />}
          />
          <div className="project-details">
            <h2>{selectedProject.title}</h2>
            <div className="detail-item">
              <span>Project Type:</span>
              <p>{selectedProject.type}</p>
            </div>
            <div className="detail-item">
              <span>Duration:</span>
              <p>{selectedProject.duration}</p>
            </div>
          </div>
        </div>/
      </div>

      )}

        <div className="cta-container">
            <button className="Cta-button5">
             view Projects
              <FiCheckCircle />
            </button>
            
          </div>
    </motion.div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
  );
};

export default RenovationPage;