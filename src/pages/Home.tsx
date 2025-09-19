import { motion } from 'framer-motion';
import { FaBuilding, FaChartLine, FaGlobe } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Import components for each section
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import PortfolioSection from '../components/home/PortfolioSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ContactSection from '../components/home/ContactSection';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section className="about-section">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="about-heading"
          >
            <h2 className="about-title">About <span className="about-title-highlight">Us</span></h2>
            <p className="about-description">
              Efie Plans designs luxury homes and commercial buildings for Ghanaians and Africans all over the world, creating personalized spaces that reflect your unique personality and vision.
            </p>
          </motion.div>

          <div className="about-cards-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="about-card"
            >
              <div className="about-card-icon-container">
                <FaBuilding className="about-card-icon" />
              </div>
              <h3 className="about-card-title">Our Mission</h3>
              <p className="about-card-description">
                Efie Plans designs luxury homes and commercial buildings for Ghanaians and Africans all over the world. At Efie Plans, we pride ourselves on doing more than just designing houses. We help create a home that you have always wanted and reflected your personality.
              </p>
              <Link to="/about" className="about-card-link">
                Learn More
                <svg className="about-card-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="about-card"
            >
              <div className="about-card-icon-container">
                <FaGlobe className="about-card-icon" />
              </div>
              <h3 className="about-card-title">Client Collaboration</h3>
              <p className="about-card-description">
                We work with you the client, throughout the design process to ensure you are completely satisfied with the schematic design before we move onto the next stage. The projects we design are custom to suit individual preferences so no two projects are the same and we start from scratch.
              </p>
              <Link to="/about" className="about-card-link">
                Learn More
                <svg className="about-card-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="about-card"
            >
              <div className="about-card-icon-container">
                <FaChartLine className="about-card-icon" />
              </div>
              <h3 className="about-card-title">Quality & Services</h3>
              <p className="about-card-description">
                Our attention to detail distinguishes us from the rest as we take into consideration the surrounding environment. Every project goes through rigorous quality control. Our services include full construction documentation, interior design, landscaping, and material selection guidance.
              </p>
              <Link to="/portfolio" className="about-card-link">
                View Projects
                <svg className="about-card-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="about-cta"
          >
            <Link to="/about" className="btn btn-primary">
              Learn More About Efie Plans
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Portfolio Section */}
      <PortfolioSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default Home;