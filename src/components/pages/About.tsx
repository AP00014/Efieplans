
import { FaBuilding, FaPaintRoller, FaBullseye, FaEye } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './styles/About.css';



const MotionLink = motion(Link);


const About = () => {
 

   {/* Company Profile Section  const processSteps = [
    { title: 'Concept Development', description: 'Translating your vision into initial sketches' },
    { title: 'Design Refinement', description: 'Perfecting every detail of the blueprint' },
    { title: 'Material Selection', description: 'Curating premium quality materials' },
    { title: 'Final Execution', description: 'Bringing the design to life' }
  ];*/}

  return (
    <div className="about-container1">
     
      {/* Company Profile Section */}
      <section className="company-profile-section">
        <h2 className="section-heading">Crafting Architectural Excellence</h2>
        
        <div className="company-grid-container">
          {/* About Card */}
          <div className="company-card">
            <div className="company-card-header">
              <div className="icon-wrapper-blue">
                <FaBuilding size={24} className="icon-blue" />
              </div>
              <h3 className="company-card-title">About Efie Plans</h3>
            </div>
            <p className="company-body-text">
              We transform living spaces into personalized masterpieces, blending contemporary 
              design with cultural authenticity. As Africa's premier architectural studio, 
              we specialize in creating bespoke homes that tell your unique story through 
              intelligent spatial design and meticulous attention to detail.
            </p>
            <div className="service-heading">
              <FaPaintRoller className="icon-blue" />
              <span className="sub-heading">
                Full-service design solutions including:
              </span>
            </div>
            <ul className="feature-list">
              <li>✓ Architectural Design</li>
              <li>✓ Interior Styling</li>
              <li>✓ Landscape Architecture</li>
              <li>✓ Construction Oversight</li>
            </ul>
          </div>

          {/* Mission & Vision Card */}
          <div className="company-card">
            <div className="company-card-header">
              <div className="icon-wrapper-green">
                <FaBullseye size={24} className="icon-green" />
              </div>
              <h3 className="company-card-title">Our Compass</h3>
            </div>
            <div className="mission-item">
              <FaEye className="icon-green" />
              <div>
                <h4 className="sub-heading">Vision</h4>
                <p className="company-body-text">
                  Redefine African luxury living by creating timeless architectural 
                  statements that harmonize modern innovation with cultural heritage.
                </p>
              </div>
            </div>
            <div className="mission-item">
              <FaBullseye className="icon-green" />
              <div>
                <h4 className="sub-heading">Mission</h4>
                <p className="company-body-text">
                  Empower homeowners through collaborative design processes that 
                  transform personal aspirations into breathtaking living 
                  environments exceeding every expectation.
                </p>
              </div>
            </div>
            <div className="quote-box">
              <p className="quote-text">
                "We don't just design houses - we curate living experiences that 
                resonate with your soul and stand the test of time."
              </p>
            </div>
          </div>
        </div>
      </section>

     

     
      {/* Process Section 
      <div className="process-section1">
        <h3 className="process-heading">Our Creative Process</h3>
        <div className="process-steps">
          {processSteps.map((step, index) => (
            <motion.div 
              className="process-card1"
              key={index}
              whileHover={{ scale: 1.05 }}
            >
              <div className="process-number">0{index + 1}</div>
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>*/}

      {/* CTA Section */}
      <motion.div 
        className="cta-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div className="cta-content">
          <h3>Ready to Create Your Dream Space?</h3>
          <p>Start your architectural journey with Africa's most innovative design team</p>
         <MotionLink
  to="/contact"  // Your target route
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="ctas-button"
>
  Schedule For Consultation
</MotionLink>
        </div>
      </motion.div>
    </div>
  );
};

export default About;