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
          className="about-text-center about-mb-12"
        >
          <h1 className="about-title">
            About <span className="about-text-primary">Efie Plans</span>
          </h1>
          <p className="about-subtitle">
            Designing luxury homes and commercial buildings for Ghanaians and Africans worldwide.
          </p>
        </motion.div>

        <div className="about-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="about-image-container">
              <img
                src="/images/about-company.jpg"
                alt="Stone-Edge Construction Team"
                className="about-image"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="about-content"
          >
            <h2 className="about-section-title">Our Story</h2>
            <p className="about-text">
              Efie Plans designs luxury homes and commercial buildings for Ghanaians and Africans all over the world.
              At Efie Plans, we pride ourselves on doing more than just designing houses. We help create a home that you have always wanted and reflected your personality.
            </p>
            <p className="about-text">
              We work with you the client, throughout the design process to ensure you are completely satisfied with the schematic design before we move onto the next stage.
              This is done to come up with a design that you, the client is happy with every detail of it.
            </p>
            <p className="about-text">
              The projects we design are custom to suit individual preferences so no two projects are the same and we start from scratch.
              Our attention to detail distinguishes us from the rest as we take into consideration, the surrounding environment to come up with a design that fits into the existing context.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-mission-vision">
        <div className="container-custom">
          <div className="about-mission-vision-grid">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="about-card"
            >
              <div className="about-card-content">
                <h3 className="about-card-title">Our Mission</h3>
                <p className="about-card-description about-mb-4">
                  To create homes that perfectly reflect our clients' personalities and dreams,
                  ensuring complete satisfaction through collaborative design processes and meticulous attention to detail.
                </p>
                <ul className="about-list">
                  <li className="about-list-item">
                    <span className="about-text-primary about-mr-2">✓</span>
                    <span>Client satisfaction at every design stage</span>
                  </li>
                  <li className="about-list-item">
                    <span className="about-text-primary about-mr-2">✓</span>
                    <span>Custom designs tailored to individual preferences</span>
                  </li>
                  <li className="about-list-item">
                    <span className="about-text-primary about-mr-2">✓</span>
                    <span>Comprehensive construction documentation</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="about-card"
            >
              <div className="about-card-content">
                <h3 className="about-card-title">Our Vision</h3>
                <p className="about-card-description about-mb-4">
                  To be the premier architectural design firm serving Ghanaians and Africans worldwide,
                  creating dream homes that perfectly blend personality, environment, and luxury.
                </p>
                <ul className="about-list">
                  <li className="about-list-item">
                    <span className="about-text-primary about-mr-2">✓</span>
                    <span>Global recognition for luxury home design</span>
                  </li>
                  <li className="about-list-item">
                    <span className="about-text-primary about-mr-2">✓</span>
                    <span>Contextual designs that harmonize with surroundings</span>
                  </li>
                  <li className="about-list-item">
                    <span className="about-text-primary about-mr-2">✓</span>
                    <span>Excellence in interior and landscaping design</span>
                  </li>
                </ul>
              </div>
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
          className="about-text-center about-mb-12"
        >
          <h2 className="about-section-title-large">Our Core Values</h2>
          <p className="about-subtitle">
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
              className="about-card about-text-center"
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

      {/* Team Section */}
      <section className="about-team">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="about-text-center about-mb-12"
          >
            <h2 className="about-section-title-large">Our Design Team</h2>
            <p className="about-subtitle">
              Meet the creative professionals behind Efie Plans' exceptional designs.
            </p>
          </motion.div>

          
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
            className="about-experience-content"
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

            <div className="about-cta-card">
              <h3 className="about-cta-title">Ready to Design Your Dream Home?</h3>
              <p className="about-cta-text">
                Contact us today to start your custom design journey with Efie Plans.
              </p>
              <a href="/contact" className="about-cta-button">
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
