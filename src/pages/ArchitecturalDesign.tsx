import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCheckCircle, FaClock, FaUsers, FaAward, FaLightbulb, FaCogs, FaRocket } from 'react-icons/fa';

const ArchitecturalDesign = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 to-orange-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Architectural Design
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Creating innovative and sustainable building solutions that blend functionality,
            aesthetics, and environmental consciousness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Your Project
            </Link>
            <Link
              to="#services"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Service Overview */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Architectural Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From concept to completion, we provide comprehensive architectural design services
              that bring your vision to life with precision and excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-orange-600 mb-4">
                <FaLightbulb size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Conceptual Design</h3>
              <p className="text-gray-600">
                Transform your ideas into detailed architectural concepts that capture the essence
                of your vision while considering functionality and aesthetics.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-blue-600 mb-4">
                <FaCogs size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Technical Drawings</h3>
              <p className="text-gray-600">
                Precise technical drawings and specifications that meet building codes and
                ensure seamless construction execution.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-green-600 mb-4">
                <FaRocket size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Sustainable Design</h3>
              <p className="text-gray-600">
                Eco-friendly architectural solutions that minimize environmental impact while
                maximizing energy efficiency and comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              What sets our architectural design services apart
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">3D Visualization</h3>
                  <p className="text-gray-600">Experience your project before construction begins with detailed 3D renderings and virtual tours.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Code Compliance</h3>
                  <p className="text-gray-600">All designs meet local building codes and regulations, ensuring smooth approval processes.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Cost Optimization</h3>
                  <p className="text-gray-600">Strategic design decisions that balance aesthetics with construction efficiency and budget constraints.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Site Analysis</h3>
                  <p className="text-gray-600">Comprehensive site assessment to maximize natural light, views, and environmental integration.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Material Selection</h3>
                  <p className="text-gray-600">Expert guidance on sustainable and durable materials that enhance both form and function.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Client Collaboration</h3>
                  <p className="text-gray-600">Regular consultations and feedback sessions to ensure your vision is perfectly realized.</p>
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
              A systematic approach to bringing your architectural vision to life
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Consultation</h3>
              <p className="text-gray-600">Understanding your vision, requirements, and budget through detailed discussions.</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Design Development</h3>
              <p className="text-gray-600">Creating initial concepts and refining them based on your feedback and site analysis.</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Technical Documentation</h3>
              <p className="text-gray-600">Developing detailed plans, elevations, and specifications for construction.</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Project Handover</h3>
              <p className="text-gray-600">Delivering complete documentation and supporting you through the construction phase.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Why Choose Our Architectural Services?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the difference that professional architectural design can make
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <FaAward className="text-orange-600 mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Award-Winning Designs</h3>
              <p className="text-gray-600">
                Recognized for innovative and sustainable architectural solutions that push boundaries.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <FaUsers className="text-orange-600 mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Expert Team</h3>
              <p className="text-gray-600">
                Licensed architects with decades of experience in residential and commercial projects.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <FaClock className="text-orange-600 mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">On-Time Delivery</h3>
              <p className="text-gray-600">
                Efficient project management ensuring designs are delivered within agreed timelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Bring Your Vision to Life?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Let's discuss your architectural project and create something truly extraordinary together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              Get Started Today
              <FaArrowRight />
            </Link>
            <Link
              to="/projects"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300"
            >
              View Our Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArchitecturalDesign;