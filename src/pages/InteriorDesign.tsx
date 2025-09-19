
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCheckCircle, FaPalette, FaHome, FaMagic, FaLightbulb, FaCouch, FaPaintBrush } from 'react-icons/fa';

const InteriorDesign = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-purple-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Interior Design
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Transform your spaces into personalized sanctuaries that reflect your style,
            enhance functionality, and create lasting impressions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Your Design
            </Link>
            <Link
              to="#services"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300"
            >
              Explore Services
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Service Overview */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Interior Design Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From concept to completion, we create interior spaces that are both beautiful
              and functional, tailored to your unique lifestyle and preferences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-purple-600 mb-4">
                <FaPalette size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Space Planning</h3>
              <p className="text-gray-600">
                Optimize your space utilization with thoughtful layout design that maximizes
                functionality and flow throughout your home or office.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-pink-600 mb-4">
                <FaPaintBrush size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Color Consultation</h3>
              <p className="text-gray-600">
                Expert color selection and application that creates mood, enhances space perception,
                and complements your existing decor.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-indigo-600 mb-4">
                <FaCouch size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Furniture Selection</h3>
              <p className="text-gray-600">
                Curated furniture pieces that blend style, comfort, and practicality,
                sourced from premium manufacturers and artisans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Design Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              What makes our interior design services exceptional
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Personalized Approach</h3>
                  <p className="text-gray-600">Every design is tailored to your lifestyle, preferences, and personality for truly unique spaces.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">3D Visualization</h3>
                  <p className="text-gray-600">Experience your new space before implementation with detailed 3D renderings and mood boards.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Budget Management</h3>
                  <p className="text-gray-600">Transparent pricing and strategic sourcing to maximize value while staying within your budget.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Material Expertise</h3>
                  <p className="text-gray-600">Knowledge of premium materials, textiles, and finishes that enhance durability and aesthetics.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Lighting Design</h3>
                  <p className="text-gray-600">Strategic lighting solutions that create ambiance, functionality, and visual interest.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Project Management</h3>
                  <p className="text-gray-600">End-to-end coordination ensuring seamless execution from concept to completion.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Design Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A collaborative journey to create your perfect interior space
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Discovery</h3>
              <p className="text-gray-600">Understanding your style preferences, lifestyle needs, and project goals through detailed consultation.</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Concept Development</h3>
              <p className="text-gray-600">Creating initial design concepts with mood boards, color palettes, and preliminary layouts.</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Design Refinement</h3>
              <p className="text-gray-600">Refining designs based on your feedback, selecting materials, and finalizing specifications.</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Implementation</h3>
              <p className="text-gray-600">Coordinating with vendors and overseeing installation to ensure flawless execution.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-purple-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Why Choose Our Interior Design Services?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the transformation that professional interior design brings
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <FaHome className="text-purple-600 mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Functional Beauty</h3>
              <p className="text-gray-600">
                Spaces that are both aesthetically pleasing and highly functional for modern living.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <FaMagic className="text-purple-600 mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Creative Vision</h3>
              <p className="text-gray-600">
                Innovative design solutions that reflect your personality and enhance your lifestyle.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <FaLightbulb className="text-purple-600 mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Expert Guidance</h3>
              <p className="text-gray-600">
                Professional advice on trends, materials, and design principles that stand the test of time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Let's create an interior design that perfectly captures your vision and enhances your daily life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              Begin Your Design
              <FaArrowRight />
            </Link>
            <Link
              to="/projects"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InteriorDesign;