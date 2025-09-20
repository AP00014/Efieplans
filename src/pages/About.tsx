import { motion } from "framer-motion";
import {
  FaBuilding,
  FaGlobe,
  FaUsers,
  FaHistory,
  FaAward,
} from "react-icons/fa";
import "../styles/pages/About.css";

const About = () => {
  return (
    <div className="about-page about-py-16">
      {/* Hero Section */}
      <section className="container-custom about-mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="about-text-center about-mb-12 about-fade-in-up"
        >
          <h1 className="about-title about-animate-float">
            About <span className="about-text-primary about-text-gradient">Efie Plans</span>
          </h1>
          <p className="about-subtitle about-smooth-text">
            Designing luxury homes and commercial buildings for Ghanaians and Africans worldwide.
          </p>
        </motion.div>

        <div className="about-story-section">
          <div className="about-story-container">
            {/* Timeline Background */}
            <div className="about-timeline-bg">
              <div className="about-timeline-line"></div>
              <div className="about-timeline-dots">
                <div className="about-timeline-dot" style={{ top: '25%' }}></div>
                <div className="about-timeline-dot" style={{ top: '50%' }}></div>
                <div className="about-timeline-dot" style={{ top: '75%' }}></div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="about-story-content about-loading-overlay"
            >
              {/* Timeline Header */}
              <div className="about-timeline-header">
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="about-timeline-title-section"
                >
                  <h2 className="about-timeline-title">
                    <span className="about-timeline-title-main">Our Journey</span>
                    <span className="about-timeline-title-accent">Building Excellence</span>
                  </h2>
                  <div className="about-timeline-title-bar"></div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="about-timeline-subtitle"
                >
                  From vision to reality: The story of Efie Plans' commitment to architectural excellence
                </motion.p>
              </div>

              {/* Timeline Items */}
              <div className="about-timeline">
                {[
                  {
                    year: "2018",
                    title: "Foundation & Mission",
                    description: "Efie Plans was established with a clear mission: To create homes that perfectly reflect our clients' personalities and dreams, ensuring complete satisfaction through collaborative design processes and meticulous attention to detail.",
                    icon: <FaBuilding />,
                    position: "left",
                    gradient: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                    delay: 0.6,
                    type: "mission",
                    highlights: [
                      "Client satisfaction at every stage",
                      "Custom designs for individual preferences",
                      "Comprehensive construction documentation"
                    ]
                  },
                  {
                    year: "2020",
                    title: "Innovation & Vision",
                    description: "We pioneered client-centric design approaches while envisioning ourselves as the premier architectural design firm serving Ghanaians and Africans worldwide, creating dream homes that blend personality, environment, and luxury.",
                    icon: <FaUsers />,
                    position: "right",
                    gradient: "linear-gradient(135deg, #374151 0%, #4b5563 100%)",
                    delay: 0.8,
                    type: "vision",
                    highlights: [
                      "Global recognition for luxury design",
                      "Contextual designs harmonizing with surroundings",
                      "Excellence in interior and landscaping"
                    ]
                  },
                  {
                    year: "2022",
                    title: "Excellence Achieved",
                    description: "Achieved recognition for custom architectural solutions that harmonize with environmental contexts. Every project undergoes rigorous quality checks to ensure clients fall in love with the final result.",
                    icon: <FaAward />,
                    position: "left",
                    gradient: "linear-gradient(135deg, #475569 0%, #64748b 100%)",
                    delay: 1.0,
                    type: "achievement",
                    highlights: [
                      "100+ custom designs completed",
                      "50+ satisfied clients worldwide",
                      "15+ skilled design experts"
                    ]
                  },
                  {
                    year: "2024",
                    title: "Global Expansion",
                    description: "Expanded our services internationally while maintaining our commitment to personalized, sustainable design. From initial design to material selection, we provide complete solutions for stunning results.",
                    icon: <FaGlobe />,
                    position: "right",
                    gradient: "linear-gradient(135deg, #525252 0%, #737373 100%)",
                    delay: 1.2,
                    type: "growth",
                    highlights: [
                      "Services expanded to 5 countries",
                      "98% client satisfaction rate",
                      "Complete design-to-delivery solutions"
                    ]
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: item.position === 'left' ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: item.delay,
                      type: "spring",
                      stiffness: 80
                    }}
                    className={`about-timeline-item ${item.position} about-fade-in-${item.position === 'left' ? 'left' : 'right'} about-hover-lift`}
                  >
                    <div className="about-timeline-card">
                      <div
                        className="about-timeline-card-bg"
                        style={{ background: item.gradient }}
                      ></div>

                      <div className="about-timeline-content">
                        <div className="about-timeline-year">{item.year}</div>
                        <div className="about-timeline-icon">
                          {item.icon}
                        </div>
                        <h3 className="about-timeline-item-title">{item.title}</h3>
                        <p className="about-timeline-description">{item.description}</p>

                        {/* Mission/Vision Highlights */}
                        <div className="about-timeline-highlights">
                          <div className={`about-highlight-${item.type}`}>
                            <span className="about-highlight-label">
                              {item.type === 'mission' && 'Mission Focus:'}
                              {item.type === 'vision' && 'Vision Goals:'}
                              {item.type === 'achievement' && 'Key Achievements:'}
                              {item.type === 'growth' && 'Growth Milestones:'}
                            </span>
                            <ul className="about-highlight-list">
                              {item.highlights.map((highlight, idx) => (
                                <li key={idx} className="about-highlight-item">
                                  <span className="about-highlight-bullet">•</span>
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="about-timeline-connector">
                        <div className="about-timeline-connector-line"></div>
                        <div className="about-timeline-connector-dot"></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Timeline CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="about-timeline-cta"
              >
                <div className="about-timeline-cta-content">
                  <h3 className="about-timeline-cta-title">Be Part of Our Story</h3>
                  <p className="about-timeline-cta-text">
                    Let's create your architectural masterpiece together
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="about-timeline-cta-button"
                  >
                    <span>Start Your Project</span>
                    <div className="about-timeline-cta-arrow">
                      <FaGlobe />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Core Values */}
      <section className="container-custom about-py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="about-text-center about-mb-12 about-fade-in-up"
        >
          <h2 className="about-section-title-large about-text-gradient">Our Core Values</h2>
          <p className="about-subtitle about-smooth-text">
            These principles guide our design philosophy and commitment to creating exceptional homes.
          </p>
        </motion.div>

        <div className="about-values-grid">
          {[
            {
              icon: <FaUsers className="about-value-icon" />,
              title: "Client Collaboration",
              description:
                "We work closely with clients throughout the design process to ensure complete satisfaction with every detail.",
            },
            {
              icon: <FaAward className="about-value-icon" />,
              title: "Attention to Detail",
              description:
                "Our meticulous approach distinguishes us, considering every aspect from environment to finishing touches.",
            },
            {
              icon: <FaBuilding className="about-value-icon" />,
              title: "Customization",
              description:
                "Every project is uniquely designed from scratch to perfectly suit individual preferences and personality.",
            },
            {
              icon: <FaGlobe className="about-value-icon" />,
              title: "Environmental Integration",
              description:
                "We harmonize designs with their surroundings, creating homes that naturally fit their context.",
            },
            {
              icon: <FaHistory className="about-value-icon" />,
              title: "Comprehensive Services",
              description:
                "From initial design to material selection, we provide complete solutions for stunning results.",
            },
            {
              icon: <FaUsers className="about-value-icon" />,
              title: "Quality Assurance",
              description:
                "Every project undergoes rigorous quality checks to ensure clients fall in love with the final result.",
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="about-card about-text-center about-fade-in-up about-hover-lift"
            >
              <div className="about-card-content">
                <div className="about-value-icon-container about-mb-4">
                  {value.icon}
                </div>
                <h3 className="about-card-title">{value.title}</h3>
                <p className="about-card-description">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* Experience & Expertise */}
      <section className="container-custom about-py-16">
        <div className="about-experience-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="about-experience-content about-fade-in-left about-smooth-text"
          >
            <h2 className="about-section-title-large">
              Our Design Expertise
            </h2>
            <p className="about-text">
              Efie Plans specializes in creating luxury homes and commercial buildings
              that perfectly capture our clients' visions. We understand that building
              a home is not an easy decision, so we strive to achieve the best for our clients
              through meticulous attention to detail and collaborative design processes.
            </p>
            <p className="about-text">
              Our team of skilled designers and architects brings creativity and technical
              expertise to every project. We take into consideration the surrounding environment
              to create designs that naturally fit their context while reflecting our clients'
              unique personalities and preferences.
            </p>

            <div className="about-skills">
              <div className="about-skill">
                <div className="about-skill-header">
                  <span className="about-skill-label">
                    Luxury Home Design
                  </span>
                  <span className="about-text-primary about-font-bold">98%</span>
                </div>
                <div className="about-skill-bar">
                  <div
                    className="about-skill-progress"
                    style={{ width: "98%" }}
                  ></div>
                </div>
              </div>

              <div className="about-skill">
                <div className="about-skill-header">
                  <span className="about-skill-label">Interior Design</span>
                  <span className="about-text-primary about-font-bold">95%</span>
                </div>
                <div className="about-skill-bar">
                  <div
                    className="about-skill-progress"
                    style={{ width: "95%" }}
                  ></div>
                </div>
              </div>

              <div className="about-skill">
                <div className="about-skill-header">
                  <span className="about-skill-label">
                    Commercial Architecture
                  </span>
                  <span className="about-text-primary about-font-bold">92%</span>
                </div>
                <div className="about-skill-bar">
                  <div
                    className="about-skill-progress"
                    style={{ width: "92%" }}
                  ></div>
                </div>
              </div>

              <div className="about-skill">
                <div className="about-skill-header">
                  <span className="about-skill-label">
                    Construction Documentation
                  </span>
                  <span className="about-text-primary about-font-bold">96%</span>
                </div>
                <div className="about-skill-bar">
                  <div
                    className="about-skill-progress"
                    style={{ width: "96%" }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="about-fade-in-right"
          >
            <div className="about-stats">
              <div className="about-stat-card">
                <h3 className="about-stat-number">100+</h3>
                <p className="about-stat-label">Custom Designs</p>
              </div>
              <div className="about-stat-card">
                <h3 className="about-stat-number">50+</h3>
                <p className="about-stat-label">Happy Clients</p>
              </div>
              <div className="about-stat-card">
                <h3 className="about-stat-number">15+</h3>
                <p className="about-stat-label">Design Experts</p>
              </div>
              <div className="about-stat-card">
                <h3 className="about-stat-number">5</h3>
                <p className="about-stat-label">Countries Served</p>
              </div>
            </div>

            <div className="about-cta-card about-fade-in-scale about-hover-glow">
              <h3 className="about-cta-title about-text-gradient">Ready to Design Your Dream Home?</h3>
              <p className="about-cta-text about-smooth-text">
                Contact us today to start your custom design journey with Efie Plans.
              </p>
              <a href="/contact" className="about-cta-button about-animate-pulse">
                Start Your Design
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
