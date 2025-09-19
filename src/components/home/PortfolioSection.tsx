import { Link } from 'react-router-dom';
import { FiExternalLink, FiArrowRight } from 'react-icons/fi';
import '../../styles/components/PortfolioSection.css';


const PortfolioSection = () => {
  return (
    <section className="showcase">
  <div className="section-header">
    <h2>Our Showcase</h2>
    <p className='cp'>Where Vision Meets Precision Engineering</p>
  </div>

  <div className="showcase_grid">
    <div className="imagesleft">
      <div className="showcas_img_1">
        <img src='https://res.cloudinary.com/dpzndrhse/image/upload/v1750667823/795d537546404a15a5edb74793570ebe_lvhdqb.jpg' alt="" className='img_1' />
        <div className="image-overlay">
          <h3>Elizabeth</h3>
          <p>Advanced modern Apartments</p>
          <Link to="/projects/2" className="view-link">
            View Details <FiExternalLink />
          </Link>
        </div>
      </div>
      <div className="showcas_img_2">
        <img src='https://res.cloudinary.com/dpzndrhse/image/upload/v1750631768/birdview_mdavmx.jpg' alt="" className='img_2' />
        <div className="image-overlay">
          <h3>Golden Village</h3>
          <p>Eco-friendly engineering solutions</p>
          <Link to="/projects/7" className="view-link">
            View Details <FiExternalLink />
          </Link>
        </div>
      </div>
    </div>

    <div className="imagesright">
      <div className="img_layout1">
        <div className="showcas_img_3">
          <img src='https://res.cloudinary.com/dpzndrhse/image/upload/v1750636901/C1-1_ut1ljv.jpg' alt="" className='img_1' />
          <div className="image-overlay">
            <h3>Iconic</h3>
            <p>Micro-scale components with macro impact</p>
            <Link to="/projects/10" className="view-link">
              View Details <FiExternalLink />
            </Link>
          </div>
        </div>
        <div className="showcas_img_4">
          <img src='https://res.cloudinary.com/dpzndrhse/image/upload/v1750628589/Afari_s_final_lrcjvr.jpg' alt="" className='img_1' />
          <div className="image-overlay">
            <h3>Abode</h3>
            <p>Rapid development solutions</p>
            <Link to="/projects/5" className="view-link">
              View Details <FiExternalLink />
            </Link>
          </div>
        </div>
      </div>

      <div className="img_layout2">
        <div className="showcas_img_5">
          <img src='https://res.cloudinary.com/dpzndrhse/image/upload/v1750628736/old-7_gyprl8.jpg' alt="" className='img_1' />
          <div className="image-overlay">
            <h3>Appease</h3>
            <p>Tailored engineering approaches</p>
            <Link to="/projects/6" className="view-link">
              View Details <FiExternalLink />
            </Link>
          </div>
        </div>
        <div className="showcas_img_6">
          <img src='https://res.cloudinary.com/dpzndrhse/image/upload/v1750631100/a1_j7a7cl.jpg' alt="" className='img_1' />
          <div className="image-overlay">
            <h3>Gecko Lodge</h3>
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
  );
};

export default PortfolioSection;