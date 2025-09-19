import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real application, you would send the form data to a server here
    // For now, we'll simulate a successful submission
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    });

    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });

    // Reset form status after 5 seconds
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        success: false,
        message: ''
      });
    }, 5000);
  };

  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="container-custom mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Contact <span className="text-primary">Us</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get in touch with our team to discuss your construction needs or request a quote.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-full mr-4">
                    <FaMapMarkerAlt className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Our Location</h3>
                    <p className="text-gray-600 dark:text-gray-300">123 Construction Avenue, Accra, Ghana</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-full mr-4">
                    <FaPhone className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Phone Number</h3>
                    <p className="text-gray-600 dark:text-gray-300">+233 20 123 4567</p>
                    <p className="text-gray-600 dark:text-gray-300">+233 30 987 6543</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-full mr-4">
                    <FaEnvelope className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Email Address</h3>
                    <p className="text-gray-600 dark:text-gray-300">info@stone-edge.com</p>
                    <p className="text-gray-600 dark:text-gray-300">projects@stone-edge.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-full mr-4">
                    <FaClock className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Working Hours</h3>
                    <p className="text-gray-600 dark:text-gray-300">Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p className="text-gray-600 dark:text-gray-300">Saturday: 9:00 AM - 1:00 PM</p>
                    <p className="text-gray-600 dark:text-gray-300">Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-bold mb-4 text-gray-900 dark:text-white">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-primary text-white p-3 rounded-full hover:bg-primary-dark transition-colors duration-300">
                    <FaFacebookF />
                  </a>
                  <a href="#" className="bg-primary text-white p-3 rounded-full hover:bg-primary-dark transition-colors duration-300">
                    <FaTwitter />
                  </a>
                  <a href="#" className="bg-primary text-white p-3 rounded-full hover:bg-primary-dark transition-colors duration-300">
                    <FaInstagram />
                  </a>
                  <a href="#" className="bg-primary text-white p-3 rounded-full hover:bg-primary-dark transition-colors duration-300">
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send Us a Message</h2>
              
              {formStatus.submitted && (
                <div className={`p-4 mb-6 rounded-lg ${formStatus.success ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100' : 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100'}`}>
                  {formStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">Your Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 mb-2">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-dark transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="container-custom mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Location</h2>
          </div>
          <div className="h-96 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            {/* In a real application, you would embed a Google Map here */}
            <div className="text-center p-6">
              <p className="text-gray-600 dark:text-gray-300 mb-4">Google Map would be embedded here</p>
              <p className="text-gray-600 dark:text-gray-300">123 Construction Avenue, Accra, Ghana</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="bg-primary bg-opacity-10 dark:bg-gray-800 py-16">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Find answers to common questions about our services and processes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "What areas in Ghana do you serve?",
                answer: "We provide our construction services throughout Ghana, with a primary focus on Accra, Kumasi, Takoradi, and Cape Coast. However, we are open to projects in other regions as well."
              },
              {
                question: "How do I request a quote for my project?",
                answer: "You can request a quote by filling out our contact form, calling our office, or sending us an email with details about your project. We'll get back to you within 24-48 hours to discuss your needs."
              },
              {
                question: "What types of projects do you handle?",
                answer: "We handle a wide range of construction projects including residential buildings, commercial facilities, industrial structures, renovations, and more. No project is too big or too small for our team."
              },
              {
                question: "How long does a typical construction project take?",
                answer: "The timeline varies depending on the scope and complexity of the project. A small renovation might take a few weeks, while a large commercial building could take several months. We provide detailed timelines during the planning phase."
              },
              {
                question: "Do you offer design services?",
                answer: "Yes, we offer architectural design services as part of our comprehensive construction solutions. Our team can help you design your dream space or work with your existing plans."
              },
              {
                question: "What sets Stone-Edge apart from other construction companies?",
                answer: "Our international experience, particularly in Japan, gives us a unique perspective on quality and precision. We combine this with local knowledge and a client-centered approach to deliver exceptional results."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-primary rounded-lg shadow-xl overflow-hidden"
        >
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-4 text-white">Ready to Transform Your Space?</h2>
              <p className="text-white opacity-90 mb-6">
                Contact us today to schedule a consultation with our expert team. Let's bring your construction vision to life.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a 
                  href="tel:+233201234567" 
                  className="bg-white text-primary font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-300 text-center"
                >
                  Call Us Now
                </a>
                <a 
                  href="mailto:info@stone-edge.com" 
                  className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-300 text-center"
                >
                  Email Us
                </a>
              </div>
            </div>
            <div className="hidden md:block bg-primary-dark h-full">
              <div className="h-full flex items-center justify-center p-12">
                <div className="text-center">
                  <div className="text-white text-6xl font-bold mb-4">20+</div>
                  <div className="text-white text-xl">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;