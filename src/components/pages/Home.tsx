// src/pages/Home.tsx
import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './styles/Home.css';

const slides = [
  
    {
        image: 'src/components/pages/Images/81945302_2141154495987458_8142382399708200960_n.jpg',
        title: 'Complete Project Management',
        description: 'Seamless execution from concept to completion',
        button: 'Get Started'
      },
    {
    image: 'src/components/pages/Images/img3.jpg',
    title: 'Innovative Building Solutions',
    description: 'Transforming visions into architectural masterpieces with cutting-edge technology',
    button: 'Explore Projects'
  },
  {
    image: 'src/components/pages/Images/81836978_2141186975984210_991424691258261504_n.jpg',
    title: 'Premium Construction Services',
    description: 'From foundation to finish - excellence in every brick laid',
    button: 'View Services'
  },
  {
    image: 'src/components/pages/Images/interor.jpg',
    title: 'Modern Interior Designs',
    description: 'Creating spaces that inspire and elevate lifestyles',
    button: 'See Designs'
  },
  {
    image: 'src/components/pages/Images/82604517_2141155279320713_5725934327536025600_n.jpg',
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
          <h2>Redefining Construction Excellence</h2>
          <p className='cp'>Where Vision Meets Precision Engineering</p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="card-content">
              <div className="card-number">01</div>
              <h3>Smart Construction Tech</h3>
              <p>AI-powered project management and real-time site monitoring</p>
              <div className="card-hover-content">
                <video autoPlay muted loop className="hover-video">
                  <source src="/construction-tech.mp4" type="video/mp4" />
                </video>
                <button className="explore-btn">
                  Explore Tech <FiArrowRight />
                </button>
              </div>
            </div>
          </div>

          <div className="feature-card">
            <div className="card-content">
              <div className="card-number">02</div>
              <h3>Sustainable Solutions</h3>
              <p>Net-zero energy buildings with eco-friendly materials</p>
             
            </div>
          </div>

          <div className="feature-card">
            <div className="card-content">
              <div className="card-number">03</div>
              <h3>Luxury Interiors</h3>
              <p>Bespoke designs blending comfort with cutting-edge aesthetics</p>
              <div className="card-hover-content">
              </div>
            </div>
          </div>
        </div>

        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">250+</div>
            <div className="stat-label">Projects Completed</div>
            <div className="stat-bar"></div>
          </div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">Client Satisfaction</div>
            <div className="stat-bar"></div>
          </div>
          <div className="stat-item">
            <div className="stat-number">15+</div>
            <div className="stat-label">Industry Awards</div>
            <div className="stat-bar"></div>
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