import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaSearch, FaClock } from 'react-icons/fa';
import '../styles/pages/blog.css';

const Blog = () => {
  // Sample blog posts data
  const blogPosts = [
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
    <div className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="blog-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="blog-hero-content"
          >
            <h1 className="blog-hero-title">
              Construction <span>Blog</span>
            </h1>
            <p className="blog-hero-subtitle">
              Expert insights, tips, and trends in construction and design to help you make informed decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="blog-featured">
        <div className="blog-container">
          <div className="blog-featured-grid">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="blog-featured-card"
              >
                <div className="blog-featured-image">
                  <img
                    src={post.image}
                    alt={post.title}
                  />
                  <div className="blog-featured-badge">
                    FEATURED
                  </div>
                </div>
                <div className="blog-featured-content">
                  <div className="blog-featured-meta">
                    <span className="blog-featured-meta-item">
                      <FaCalendarAlt />
                      {post.date}
                    </span>
                    <span className="blog-featured-meta-item">
                      <FaUser />
                      {post.author}
                    </span>
                    <span className="blog-featured-meta-item">
                      <FaClock />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="blog-featured-title">{post.title}</h2>
                  <p className="blog-featured-excerpt">{post.excerpt}</p>
                  <div className="blog-featured-footer">
                    <span className="blog-featured-category">
                      {post.category}
                    </span>
                    <Link
                      to={`/blog/${post.id}`}
                      className="blog-featured-link"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="blog-controls">
        <div className="blog-search">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="blog-search-input"
          />
          <FaSearch className="blog-search-icon" />
        </div>

        <div className="blog-categories">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`blog-category-btn ${activeCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="blog-posts">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="blog-post-card"
            >
              <div className="blog-post-image">
                <img
                  src={post.image}
                  alt={post.title}
                />
              </div>
              <div className="blog-post-content">
                <div className="blog-post-meta">
                  <span className="blog-post-meta-item">
                    <FaCalendarAlt />
                    {post.date}
                  </span>
                  <span className="blog-post-meta-item">
                    <FaClock />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="blog-post-title">{post.title}</h3>
                <p className="blog-post-excerpt">{post.excerpt}</p>
                <div className="blog-post-footer">
                  <span className="blog-post-category">
                    {post.category}
                  </span>
                  <Link
                    to={`/blog/${post.id}`}
                    className="blog-post-link"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="blog-no-results">
            No articles found matching your search criteria.
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="blog-newsletter">
        <div className="blog-container">
          <div className="blog-newsletter-content">
            <h2 className="blog-newsletter-title">Subscribe to Our Newsletter</h2>
            <p className="blog-newsletter-subtitle">
              Stay updated with the latest construction tips, industry trends, and company news.
            </p>
            <form className="blog-newsletter-form">
              <input
                type="email"
                placeholder="Your email address"
                className="blog-newsletter-input"
              />
              <button
                type="submit"
                className="blog-newsletter-btn"
              >
                Subscribe
              </button>
            </form>
            <p className="blog-newsletter-privacy">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="blog-topics">
        <div className="blog-container">
          <div className="blog-topics-header">
            <h2 className="blog-topics-title">Popular Topics</h2>
            <p className="blog-topics-subtitle">
              Explore our most popular construction and design topics.
            </p>
          </div>

          <div className="blog-topics-grid">
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
                className="blog-topic-card"
              >
                <div className="blog-topic-icon">{topic.icon}</div>
                <h3 className="blog-topic-title">{topic.title}</h3>
                <p className="blog-topic-count">{topic.count} Articles</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="blog-cta">
        <div className="blog-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="blog-cta-card"
          >
            <div className="blog-cta-content">
              <div className="blog-cta-text">
                <h2 className="blog-cta-title">Have a Construction Project in Mind?</h2>
                <p className="blog-cta-description">
                  Our team of experts is ready to help you bring your vision to life. Contact us today for a consultation.
                </p>
                <Link
                  to="/contact"
                  className="blog-cta-button"
                >
                  Get in Touch
                </Link>
              </div>
              <div className="blog-cta-image">
                <img
                  src="/images/cta-image.jpg"
                  alt="Construction Project"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;