// src/pages/Home.tsx
import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './styles/Home.css';
import image1 from '../../../public/Images/81945302_2141154495987458_8142382399708200960_n.jpg'
import image2 from '../../../public/Images/img3.jpg'
import image3 from '../../../public/Images/81836978_2141186975984210_991424691258261504_n.jpg'
import image4 from '../../../public/Images/interor.jpg'
import image5 from '../../../public/Images/82604517_2141155279320713_5725934327536025600_n.jpg'
import imageCaption1 from '../../../public/Images/istockphoto-2117759132-612x612.jpg'


const slides = [
  
    {
        image: [image1],
        title: 'Complete Project Management',
        description: 'Seamless execution from concept to completion',
        button: 'Get Started'
      },
    {
    image: [image2],
    title: 'Innovative Building Solutions',
    description: 'Transforming visions into architectural masterpieces with cutting-edge technology',
    button: 'Explore Projects'
  },
  {
    image: [image3],
    title: 'Premium Construction Services',
    description: 'From foundation to finish - excellence in every brick laid',
    button: 'View Services'
  },
  {
    image: [image4],
    title: 'Modern Interior Designs',
    description: 'Creating spaces that inspire and elevate lifestyles',
    button: 'See Designs'
  },
  {
    image: [image5],
    title: 'Sustainable Renovations',
    description: 'Breathing new life into existing structures responsibly',
    button: 'Learn More'
  },
 
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlay) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 7000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>

    <section className="hero-slider" 
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="slide-content">
            <div className={`text-container ${index === currentSlide ? 'animate' : ''}`}>
              <h1 className="slide-title">{slide.title}</h1>
              <p className="slide-description">{slide.description}</p>
              <button className="slide-button">
                {slide.button}
                <FiArrowRight className="button-icon" />
              </button>
            </div>
          </div>
        </div>
      ))}

<div className="nav-buttons-container">
  <button className="nav-button prev" onClick={prevSlide}>
    <FiChevronLeft size={20} />
  </button>
  <button className="nav-button next" onClick={nextSlide}>
    <FiChevronRight size={20} />
  </button>
</div>
      <div className="pagination">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`pagination-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>

    <section className="innovation-showcase">
  <div className="section-header">
    <h2>Transformative Building Solutions for Discerning Clients</h2>
    <p className='cp'>Where Vision Meets Precision Engineering</p>
  </div>

  <div className="features-container">
    {/* Primary Showcase Row */}
    <div className="feature-row">
      <div className="feature-image">
        <img src={imageCaption1} alt="Next-Gen Construction" />
      </div>
      <div className="feature-content">

        <h3>Your Vision, Perfected Through Innovation</h3>
        <p className="super-text">
        Trusted construction experts delivering quality, precision, and on-time results for every project. From dream 
        homes to commercial spaces – we turn blueprints into reality.
        </p>
        
        <ul className="value-proposition-list">
          <li>
            🚀 <strong>Smart Construction:</strong> Real-time IoT monitoring & predictive analytics 
            ensuring 98.7% project accuracy
          </li>
          <li>
            🏆 <strong>Luxury Assurance:</strong> Bespoke interiors featuring smart home integration 
            and premium material curation
          </li>
        </ul>

      </div>
    </div>

  </div>

</section>



      <section className="video-parallax">
        <div className="parallax-overlay"></div>
        <video autoPlay muted loop className="parallax-video">
          <source src="../public/videos/02673085c141fa1529b528534962bf26.mp4" type="video/mp4" />
        </video>
        <div className="parallax-content">
          <h2>Building the Future</h2>
          <p>Witness our transformational approach to modern construction</p>
          <button className="c-button">
            View Portfolio <FiArrowRight />
          </button>
        </div>
      </section>

      <section className="project-showcase">
        <div className="masonry-grid">
          <div className="masonry-item tall">
            <img src="./Images/img1.jpg" alt="Urban Development" />
            <div className="project-infos">
              <h3>Skyline Tower</h3>
              <p>50-story mixed-use development in city center</p>
            </div>
          </div>
          <div className="masonry-item">
            <img src="./Images/img2.jpg" alt="Residential Complex" />
            <div className="project-infos">
              <h3>Lakeside Residences</h3>
              <p>Sustainable waterfront community</p>
            </div>
          </div>
          <div className="masonry-item wide">
            <img src="./Images/img3.jpg" alt="Commercial Hub" />
            <div className="project-infos">
              <h3>Innovation District</h3>
              <p>Tech-focused commercial ecosystem</p>
            </div>
          </div>
          <div className="masonry-item wide">
            <img src="./Images/img3.jpg" alt="Commercial Hub" />
            <div className="project-infos">
              <h3>Innovation District</h3>
              <p>Tech-focused commercial ecosystem</p>
            </div>
          </div>

          <div className="masonry-item wide">
            <img src="./Images/img3.jpg" alt="Commercial Hub" />
            <div className="project-infos">
              <h3>Innovation District</h3>
              <p>Tech-focused commercial ecosystem</p>
            </div>
          </div>

          <div className="masonry-item wide">
            <img src="./Images/img3.jpg" alt="Commercial Hub" />
            <div className="project-infos">
              <h3>Innovation District</h3>
              <p>Tech-focused commercial ecosystem</p>
            </div>
          </div>


        </div>

        <Link className="c-link" to="/projects">
            View Portfolio <FiArrowRight />
          </Link>

      </section>




</>
  );
};

export default Home;