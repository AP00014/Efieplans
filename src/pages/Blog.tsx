import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaSearch, FaClock } from 'react-icons/fa';

const Blog = () => {
  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Tips for Home Renovation in Ghana",
      excerpt: "Planning a home renovation in Ghana? These essential tips will help you navigate the process smoothly and achieve the best results.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "Renovation",
      author: "John Doe",
      date: "June 15, 2023",
      readTime: "5 min read",
      image: "/images/blog/renovation-tips.jpg",
      featured: true
    },
    {
      id: 2,
      title: "Sustainable Building Practices for Tropical Climates",
      excerpt: "Discover how sustainable building practices can be adapted for Ghana's tropical climate to create eco-friendly and comfortable spaces.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "Sustainability",
      author: "Sarah Johnson",
      date: "May 28, 2023",
      readTime: "7 min read",
      image: "/images/blog/sustainable-building.jpg",
      featured: true
    },
    {
      id: 3,
      title: "How to Choose the Right Construction Company for Your Project",
      excerpt: "Selecting the right construction company is crucial for project success. Learn what factors to consider when making this important decision.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "Tips",
      author: "Michael Smith",
      date: "April 10, 2023",
      readTime: "6 min read",
      image: "/images/blog/choosing-contractor.jpg",
      featured: false
    },
    {
      id: 4,
      title: "Modern Interior Design Trends in Ghana",
      excerpt: "Explore the latest interior design trends that are gaining popularity in Ghana and how to incorporate them into your space.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "Design",
      author: "Emma Wilson",
      date: "March 22, 2023",
      readTime: "4 min read",
      image: "/images/blog/interior-design.jpg",
      featured: false
    },
    {
      id: 5,
      title: "Building Materials: Quality vs. Cost Considerations",
      excerpt: "Finding the right balance between quality and cost when selecting building materials is essential. Here's how to make informed decisions.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "Materials",
      author: "David Brown",
      date: "February 15, 2023",
      readTime: "8 min read",
      image: "/images/blog/building-materials.jpg",
      featured: false
    },
    {
      id: 6,
      title: "Commercial Construction: Key Considerations for Business Owners",
      excerpt: "Planning a commercial construction project? Learn about the key factors business owners should consider for successful outcomes.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "Commercial",
      author: "Robert Johnson",
      date: "January 30, 2023",
      readTime: "6 min read",
      image: "/images/blog/commercial-construction.jpg",
      featured: false
    }
  ];

  // Categories for filter
  const categories = [
    "All",
    "Renovation",
    "Sustainability",
    "Tips",
    "Design",
    "Materials",
    "Commercial"
  ];

  // State for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter posts based on search term and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Get featured posts
  const featuredPosts = blogPosts.filter(post => post.featured);

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
            Construction <span className="text-primary">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Expert insights, tips, and trends in construction and design to help you make informed decisions.
          </p>
        </motion.div>

        {/* Featured Posts */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {featuredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded">
                  FEATURED
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span className="flex items-center mr-4">
                    <FaCalendarAlt className="mr-2" />
                    {post.date}
                  </span>
                  <span className="flex items-center mr-4">
                    <FaUser className="mr-2" />
                    {post.author}
                  </span>
                  <span className="flex items-center">
                    <FaClock className="mr-2" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="bg-primary bg-opacity-10 text-primary text-sm font-medium px-3 py-1 rounded">
                    {post.category}
                  </span>
                  <Link 
                    to={`/blog/${post.id}`} 
                    className="text-primary font-medium hover:underline"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${activeCategory === category ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center mr-3">
                      <FaCalendarAlt className="mr-1" />
                      {post.date}
                    </span>
                    <span className="flex items-center">
                      <FaClock className="mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="bg-primary bg-opacity-10 text-primary text-xs font-medium px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <Link 
                      to={`/blog/${post.id}`} 
                      className="text-primary text-sm font-medium hover:underline"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 dark:text-gray-300 text-lg">No articles found matching your search criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-primary py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Subscribe to Our Newsletter</h2>
            <p className="text-white opacity-90 mb-8">
              Stay updated with the latest construction tips, industry trends, and company news.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg focus:outline-none"
              />
              <button
                type="submit"
                className="bg-gray-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
            <p className="text-white opacity-75 text-sm mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="container-custom py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Popular Topics</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our most popular construction and design topics.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Home Renovation", icon: "🏠", count: 12 },
            { title: "Sustainable Building", icon: "🌱", count: 8 },
            { title: "Interior Design", icon: "🎨", count: 10 },
            { title: "Construction Tips", icon: "🔨", count: 15 },
            { title: "Project Management", icon: "📋", count: 7 },
            { title: "Building Materials", icon: "🧱", count: 9 },
            { title: "Architecture", icon: "🏛️", count: 6 },
            { title: "Cost Estimation", icon: "💰", count: 5 },
          ].map((topic, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-3">{topic.icon}</div>
              <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">{topic.title}</h3>
              <p className="text-primary text-sm font-medium">{topic.count} Articles</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-700 rounded-lg shadow-xl overflow-hidden"
          >
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Have a Construction Project in Mind?</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Our team of experts is ready to help you bring your vision to life. Contact us today for a consultation.
                </p>
                <Link 
                  to="/contact" 
                  className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-dark transition-colors duration-300 inline-block"
                >
                  Get in Touch
                </Link>
              </div>
              <div className="hidden md:block h-full bg-primary">
                <div className="h-full p-12 flex items-center justify-center">
                  <img 
                    src="/images/cta-image.jpg" 
                    alt="Construction Project" 
                    className="rounded-lg shadow-lg max-h-80 object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;