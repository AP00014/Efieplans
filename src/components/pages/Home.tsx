// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiArrowRight, FiExternalLink } from 'react-icons/fi';
import Slider from 'react-slick';
import { FaQuoteLeft, FaHardHat, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './styles/Home.css';

import image1 from '../../../public/Images/81945302_2141154495987458_8142382399708200960_n.jpg'
import image2 from '../../../public/Images/img3.jpg'
import image3 from '../../../public/Images/81836978_2141186975984210_991424691258261504_n.jpg'
import image4 from '../../../public/Images/interor.jpg'
import image5 from '../../../public/Images/82604517_2141155279320713_5725934327536025600_n.jpg'
import imageCaption1 from '../../../public/Images/istockphoto-2117759132-612x612.jpg'
import Video from '../../../public/videos/02673085c141fa1529b528534962bf26.mp4'
import showcaseimg1 from '../../../public/Images/the-worlds-25-tallest-buildings-currently-under-construction_25.jpg'
import showcaseimg2 from '../../../public/Images/1739391434290.jpg'
import showcaseimg3 from '../../../public/Images/img2.jpg'
import showcaseimg4 from '../../../public/Images/1723475669104.jpg'




const TestimonialsSection = () => {
  const sliderRef = React.useRef<Slider>(null); // Corrected useRef import

  // Slider configuration
  const sliderSettings = { // Renamed to match usage
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    swipe: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };



const testimonials = [
    {
      id: 1,
      text: "The construction quality exceeded our expectations. Their team delivered our project ahead of schedule while maintaining strict safety standards.",
      author: "Michael Johnson",
      role: "CEO, Urban Developments Ltd.",
      companyLogo: <FaHardHat className="company-icon" />
    },
    {
      id: 2,
      text: "From concept to completion, the professionalism and attention to detail was exceptional. Truly a partner we can rely on for complex projects.",
      author: "Sarah Wilson",
      role: "Project Manager, Skyline Corp",
      companyLogo: <FaHardHat className="company-icon" />
    },
    // Add more testimonials as needed
  ];

  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        <div className="testimonial-header">
          <h2 className="testimonial-title">Client Success Stories</h2>
          <p className="testimonial-subtitle">Building Trust Through Excellence</p>
          <div className="testimonial-controls">
            <button 
              className="testimonial-control-btn"
              onClick={() => sliderRef.current?.slickPrev()}
            >
              <FaArrowLeft />
            </button>
            <button 
              className="testimonial-control-btn"
              onClick={() => sliderRef.current?.slickNext()}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

        <Slider ref={sliderRef} {...sliderSettings} className="testimonial-slider">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card-container">
              <div className="testimonial-card">
                <FaQuoteLeft className="testimonial-quote-icon" />
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-client-info">
                  <div className="testimonial-client-details">
                    <h3 className="testimonial-client-name">{testimonial.author}</h3>
                    <p className="testimonial-client-role">{testimonial.role}</p>
                  </div>
                  <div className="testimonial-company-logo">
                    {testimonial.companyLogo}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};










const Home = () => {
const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const totalSlides = 5; // Now fixed since we're not using array

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlay) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 7000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };


  return (
    <>
 <section className="hero-slider" 
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        <div 
          className={`slide ${0 === currentSlide ? 'active' : 'hidden'}`}
          style={{ backgroundImage: `url(${image1})` }}
        >
          <div className="slide-content">
            <div className={`text-container ${0 === currentSlide ? 'animate' : ''}`}>
              <h1 className="slide-title">Complete Project Management</h1>
              <p className="slide-description">Seamless execution from concept to completion</p>
              <Link to="/projects" className="slide-button">
                Explore Projects
                <FiArrowRight className="button-icon" />
              </Link>
            </div>
          </div>
        </div>

        {/* Slide 2 - Innovations */}
        <div 
          className={`slide ${1 === currentSlide ? 'active' : 'hidden'}`}
          style={{ backgroundImage: `url(${image2})` }}
        >
          <div className="slide-content">
            <div className={`text-container ${1 === currentSlide ? 'animate' : ''}`}>
              <h1 className="slide-title">Innovative Building Solutions</h1>
              <p className="slide-description">Transforming visions into architectural masterpieces</p>
              <Link to="../architectural" className="slide-button">
                Explore Innovations
                <FiArrowRight className="button-icon" />
              </Link>
            </div>
          </div>
        </div>

        {/* Slide 3 - Services */}
        <div 
          className={`slide ${2 === currentSlide ? 'active' : 'hidden'}`}
          style={{ backgroundImage: `url(${image3})` }}
        >
          <div className="slide-content">
            <div className={`text-container ${2 === currentSlide ? 'animate' : ''}`}>
              <h1 className="slide-title">Premium Construction Services</h1>
              <p className="slide-description">Excellence in every brick laid</p>
              <Link to="../contruction" className="slide-button">
                View Services
                <FiArrowRight className="button-icon" />
              </Link>
            </div>
          </div>
        </div>

        {/* Slide 4 - Designs */}
        <div 
          className={`slide ${3 === currentSlide ? 'active' : 'hidden'}`}
          style={{ backgroundImage: `url(${image4})` }}
        >
          <div className="slide-content">
            <div className={`text-container ${3 === currentSlide ? 'animate' : ''}`}>
              <h1 className="slide-title">Modern Interior Designs</h1>
              <p className="slide-description">Creating inspiring spaces</p>
              <Link to="../interior" className="slide-button">
                See Designs
                <FiArrowRight className="button-icon" />
              </Link>
            </div>
          </div>
        </div>

        {/* Slide 5 - Renovations */}
        <div 
          className={`slide ${4 === currentSlide ? 'active' : 'hidden'}`}
          style={{ backgroundImage: `url(${image5})` }}
        >
          <div className="slide-content">
            <div className={`text-container ${4 === currentSlide ? 'animate' : ''}`}>
              <h1 className="slide-title">Sustainable Renovations</h1>
              <p className="slide-description">Responsible structural transformations</p>
              <Link to="../renovation" className="slide-button">
                Explore Renovations
                <FiArrowRight className="button-icon" />
              </Link>
            </div>
          </div>
        </div>

        <div className="nav-buttons-container">
          <button className="nav-button prev" onClick={prevSlide}>
            <FiChevronLeft size={20} />
          </button>
          <button className="nav-button next" onClick={nextSlide}>
            <FiChevronRight size={20} />
          </button>
        </div>
        
        <div className="pagination">
          {[0, 1, 2, 3, 4].map((index) => (
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
          <source src={Video} type="video/mp4" />
        </video>
        <div className="parallax-content">
          <h2>Architectural Mastery That Redefines Boundaries – From Concept to Skyline </h2>
          <p>Transform Spaces into Masterpieces: Tailored Designs for Homeowners, Developers, and Businesses.</p>
         <Link to="../Architectural" className="c-button">
  View Architectural designs <FiArrowRight />
</Link>
        </div>
      </section>
<section className="showcase">
  <div className="section-header">
    <h2>Our Showcase</h2>
    <p className='cp'>Where Vision Meets Precision Engineering</p>
  </div>

  <div className="showcase_grid">
    <div className="imagesleft">
      <div className="showcas_img_1">
        <img src={image1} alt="" className='img_1' />
        <div className="image-overlay">
          <h3>Industrial Solutions</h3>
          <p>Advanced manufacturing processes for modern industry</p>
          <Link to="/projects/1" className="view-link">
            View Details <FiExternalLink />
          </Link>
        </div>
      </div>
      <div className="showcas_img_2">
        <img src={image2} alt="" className='img_2' />
        <div className="image-overlay">
          <h3>Sustainable Design</h3>
          <p>Eco-friendly engineering solutions</p>
          <Link to="/projects/2" className="view-link">
            View Details <FiExternalLink />
          </Link>
        </div>
      </div>
    </div>

    <div className="imagesright">
      <div className="img_layout1">
        <div className="showcas_img_3">
          <img src={showcaseimg1} alt="" className='img_1' />
          <div className="image-overlay">
            <h3>Precision Engineering</h3>
            <p>Micro-scale components with macro impact</p>
            <Link to="/projects/3" className="view-link">
              View Details <FiExternalLink />
            </Link>
          </div>
        </div>
        <div className="showcas_img_4">
          <img src={showcaseimg2} alt="" className='img_1' />
          <div className="image-overlay">
            <h3>Advanced Prototyping</h3>
            <p>Rapid development solutions</p>
            <Link to="/projects/4" className="view-link">
              View Details <FiExternalLink />
            </Link>
          </div>
        </div>
      </div>

      <div className="img_layout2">
        <div className="showcas_img_5">
          <img src={showcaseimg3} alt="" className='img_1' />
          <div className="image-overlay">
            <h3>Custom Solutions</h3>
            <p>Tailored engineering approaches</p>
            <Link to="/projects/5" className="view-link">
              View Details <FiExternalLink />
            </Link>
          </div>
        </div>
        <div className="showcas_img_6">
          <img src={showcaseimg4} alt="" className='img_1' />
          <div className="image-overlay">
            <h3>Quality Assurance</h3>
            <p>Rigorous testing protocols</p>
            <Link to="/projects/6" className="view-link">
              View Details <FiExternalLink />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="showcase-button-container">
    <Link to="/projects" className="showcase-button">
      View All Projects <FiArrowRight />
    </Link>
  </div>
</section>


  <TestimonialsSection />
</>
  );
};

export default Home;