import { Link } from 'react-router-dom';
import { FaArrowRight, FaCheckCircle, FaHardHat, FaTools, FaShieldAlt, FaAward, FaWrench, FaBuilding } from 'react-icons/fa';

const Construction = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Construction Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Building excellence with precision, quality, and safety at the forefront.
            From foundation to finish, we deliver exceptional construction services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Your Project
            </Link>
            <Link
              to="#services"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Our Expertise
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Service Overview */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Construction Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive construction solutions from residential to commercial projects,
              delivered with uncompromising quality and professional expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-blue-600 mb-4">
                <FaBuilding size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Residential Construction</h3>
              <p className="text-gray-600">
                Custom home building and additions with attention to detail
                and superior craftsmanship for your dream living spaces.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-green-600 mb-4">
                <FaHardHat size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Commercial Projects</h3>
              <p className="text-gray-600">
                Office buildings, retail spaces, and commercial facilities built to meet
                business needs with efficiency and modern design standards.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-orange-600 mb-4">
                <FaWrench size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Renovations & Remodeling</h3>
              <p className="text-gray-600">
                Transform existing spaces with expert construction services that modernize
                and enhance functionality while preserving character.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Why Choose Our Construction Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              What sets our construction services apart from the competition
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Licensed & Insured</h3>
                  <p className="text-gray-600">Fully licensed contractors with comprehensive insurance coverage for your peace of mind.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality Materials</h3>
                  <p className="text-gray-600">Premium materials and finishes that ensure durability, beauty, and long-term value.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">On-Time Delivery</h3>
                  <p className="text-gray-600">Efficient project management with realistic timelines and reliable completion dates.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Safety First</h3>
                  <p className="text-gray-600">OSHA-compliant safety protocols and trained professionals ensuring a secure work environment.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Transparent Communication</h3>
                  <p className="text-gray-600">Regular updates, clear communication, and detailed progress reports throughout the project.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Warranty & Support</h3>
                  <p className="text-gray-600">Comprehensive warranties and ongoing support to ensure your satisfaction long after completion.</p>
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
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Construction Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A systematic approach ensuring quality construction from start to finish
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Planning & Design</h3>
              <p className="text-gray-600">Detailed project planning, permitting, and finalizing construction documents and schedules.</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Foundation & Structure</h3>
              <p className="text-gray-600">Expert foundation work and structural framing ensuring stability and code compliance.</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Finishing & Details</h3>
              <p className="text-gray-600">Quality finishing work including electrical, plumbing, HVAC, and interior/exterior finishes.</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Final Inspection</h3>
              <p className="text-gray-600">Comprehensive inspection, final walkthrough, and project handover with all documentation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Why Choose Our Construction Services?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the reliability and quality that define our construction excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <FaShieldAlt className="text-blue-600 mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Safety Certified</h3>
              <p className="text-gray-600">
                OSHA certified with comprehensive safety protocols ensuring a secure construction environment.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <FaTools className="text-blue-600 mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Modern Equipment</h3>
              <p className="text-gray-600">
                State-of-the-art construction equipment and tools for efficient and precise project execution.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <FaAward className="text-blue-600 mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Quality Assurance</h3>
              <p className="text-gray-600">
                Rigorous quality control processes ensuring every project meets the highest industry standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Build Your Vision?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Let's discuss your construction project and build something exceptional together.
            From concept to completion, we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              Get Started Today
              <FaArrowRight />
            </Link>
            <Link
              to="/projects"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300"
            >
              View Our Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Construction;