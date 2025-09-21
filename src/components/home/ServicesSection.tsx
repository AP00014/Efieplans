import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBuilding,  FaHardHat, FaPencilRuler, FaClipboardCheck } from 'react-icons/fa';
import '../../styles/components/ServicesSection.css';

const services = [
  {
    id: 1,
    title: 'Building Construction',
    description: 'From residential homes to commercial buildings, we handle all aspects of construction with precision and quality.',
    icon: <FaBuilding className="service-icon" />
  },

  {
    id: 2,
    title: 'Construction Management',
    description: 'Our experienced team ensures your project is completed on time, within budget, and to the highest standards.',
    icon: <FaHardHat className="service-icon" />
  },
  {
    id: 3,
    title: 'Architectural Design',
    description: 'Our design team creates functional and aesthetically pleasing spaces that meet your specific requirements.',
    icon: <FaPencilRuler className="service-icon" />
  },
  {
    id: 4,
    title: 'Interior Design',
    description: 'We provide innovative interior design solutions that enhance the beauty and functionality of your spaces.',
    icon: <FaClipboardCheck className="service-icon" />
  }
];

const ServicesSection = () => {
  return (
    <section className="services-section">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="services-header"
        >
          <h2 className="services-title">Our <span className="services-title-highlight">Services</span></h2>
          <p className="services-description">
            We offer a comprehensive range of construction and architectural services to meet all your building needs.
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="service-card"
            >
              <div className="service-icon-container">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="services-cta"
        >
          <Link to="/services" className="services-cta-button">
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;