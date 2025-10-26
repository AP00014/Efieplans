import { motion } from 'framer-motion';
import { FaBuilding, FaChartLine, FaGlobe } from 'react-icons/fa';

// Import components for each section
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import PortfolioSection from '../components/home/PortfolioSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ContactSection from '../components/home/ContactSection';

const Home = () => {
  console.log('Home component rendering');
  return (
    <div className="home-container">
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section id="about" className="about-section">
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
              
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="about-cta"
          >
            
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