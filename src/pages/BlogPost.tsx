import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaTag, FaClock, FaArrowLeft, FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  
  // Sample blog posts data - in a real application, this would be fetched from an API
  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Tips for Home Renovation in Ghana",
      excerpt: "Planning a home renovation in Ghana? These essential tips will help you navigate the process smoothly and achieve the best results.",
      content: `
        <p>Home renovation projects in Ghana require careful planning and consideration of local factors. Here are ten essential tips to ensure your renovation project is successful:</p>
        
        <h3>1. Set a Realistic Budget</h3>
        <p>Before starting any renovation project, establish a clear budget that includes a 15-20% contingency for unexpected expenses. Material costs in Ghana can fluctuate, so research current prices thoroughly.</p>
        
        <h3>2. Hire Reputable Professionals</h3>
        <p>Work with licensed contractors who have experience with similar projects. Ask for references and view their previous work. A good contractor will understand local building codes and regulations.</p>
        
        <h3>3. Obtain Necessary Permits</h3>
        <p>Ensure all required permits are obtained before beginning work. This prevents potential legal issues and ensures your renovation meets safety standards.</p>
        
        <h3>4. Consider the Climate</h3>
        <p>Ghana's tropical climate requires specific considerations for materials and design. Choose materials that can withstand high humidity and heat, and incorporate proper ventilation into your design.</p>
        
        <h3>5. Prioritize Energy Efficiency</h3>
        <p>Incorporate energy-efficient features such as proper insulation, energy-saving appliances, and solar panels to reduce long-term utility costs.</p>
        
        <h3>6. Plan for Water Management</h3>
        <p>Given Ghana's seasonal heavy rainfall, ensure proper drainage systems are included in your renovation plans to prevent water damage.</p>
        
        <h3>7. Source Quality Materials</h3>
        <p>Invest in quality materials that will withstand Ghana's climate conditions. While imported materials might be appealing, locally sourced materials are often more suitable and cost-effective.</p>
        
        <h3>8. Create a Realistic Timeline</h3>
        <p>Develop a timeline that accounts for potential delays due to weather, material availability, or labor issues. Be flexible and patient throughout the process.</p>
        
        <h3>9. Focus on Functional Improvements</h3>
        <p>Prioritize renovations that improve functionality and comfort, such as better space utilization, improved ventilation, and updated plumbing and electrical systems.</p>
        
        <h3>10. Document Everything</h3>
        <p>Keep detailed records of all agreements, expenses, and changes to the original plan. This documentation is invaluable if disputes arise and helps track your budget.</p>
        
        <p>By following these tips, you'll be better prepared to navigate the challenges of home renovation in Ghana and achieve the results you desire.</p>
      `,
      category: "Renovation",
      author: "John Doe",
      authorTitle: "Senior Project Manager",
      authorBio: "John has over 15 years of experience in construction and renovation projects across West Africa.",
      authorImage: "/images/team/john-doe.jpg",
      date: "June 15, 2023",
      readTime: "5 min read",
      image: "/images/blog/renovation-tips.jpg",
      tags: ["Renovation", "Home Improvement", "Construction Tips", "Ghana"],
      featured: true
    },
    {
      id: 2,
      title: "Sustainable Building Practices for Tropical Climates",
      excerpt: "Discover how sustainable building practices can be adapted for Ghana's tropical climate to create eco-friendly and comfortable spaces.",
      content: `
        <p>Sustainable building in tropical climates like Ghana presents unique challenges and opportunities. This article explores effective practices for creating environmentally friendly buildings that are well-suited to local conditions.</p>
        
        <h3>Understanding Tropical Climate Considerations</h3>
        <p>Ghana's climate is characterized by high temperatures, significant humidity, and distinct wet and dry seasons. Sustainable building practices must address these factors to create comfortable, energy-efficient spaces.</p>
        
        <h3>Passive Cooling Strategies</h3>
        <p>Incorporating passive cooling techniques can significantly reduce energy consumption:</p>
        <ul>
          <li>Strategic building orientation to minimize sun exposure</li>
          <li>Cross-ventilation through thoughtful window placement</li>
          <li>High ceilings to allow hot air to rise away from living spaces</li>
          <li>Shaded outdoor areas and verandas</li>
          <li>Light-colored exterior surfaces to reflect heat</li>
        </ul>
        
        <h3>Local and Sustainable Materials</h3>
        <p>Using locally sourced materials reduces transportation emissions and supports the local economy:</p>
        <ul>
          <li>Compressed earth blocks (CEBs)</li>
          <li>Bamboo for structural elements and finishes</li>
          <li>Reclaimed or sustainably harvested timber</li>
          <li>Natural insulation materials</li>
        </ul>
        
        <h3>Water Conservation and Management</h3>
        <p>Effective water systems are crucial in tropical environments:</p>
        <ul>
          <li>Rainwater harvesting systems</li>
          <li>Greywater recycling for irrigation</li>
          <li>Water-efficient fixtures and appliances</li>
          <li>Permeable paving to reduce runoff</li>
        </ul>
        
        <h3>Renewable Energy Integration</h3>
        <p>Ghana's abundant sunshine makes solar power an excellent option:</p>
        <ul>
          <li>Photovoltaic panels for electricity generation</li>
          <li>Solar water heating systems</li>
          <li>Battery storage solutions for energy independence</li>
        </ul>
        
        <h3>Biophilic Design Elements</h3>
        <p>Connecting buildings with nature improves well-being and environmental performance:</p>
        <ul>
          <li>Living walls and green roofs</li>
          <li>Indoor gardens and courtyards</li>
          <li>Natural ventilation and lighting</li>
          <li>Views of natural landscapes</li>
        </ul>
        
        <h3>Case Study: Sustainable Housing Project in Accra</h3>
        <p>A recent housing development in Accra demonstrates how these principles can be applied effectively. The project features:</p>
        <ul>
          <li>Homes oriented to maximize cross-ventilation and minimize direct sun exposure</li>
          <li>Rainwater harvesting systems that supply 60% of water needs during the rainy season</li>
          <li>Solar panels that generate sufficient power for basic household needs</li>
          <li>Construction using compressed earth blocks manufactured on-site</li>
          <li>Landscaping with native, drought-resistant plants</li>
        </ul>
        
        <p>By implementing these sustainable building practices, construction in Ghana can become more environmentally friendly while creating spaces that are naturally comfortable and resilient to climate challenges.</p>
      `,
      category: "Sustainability",
      author: "Sarah Johnson",
      authorTitle: "Sustainable Design Specialist",
      authorBio: "Sarah specializes in eco-friendly construction techniques for tropical climates with a focus on reducing environmental impact.",
      authorImage: "/images/team/sarah-johnson.jpg",
      date: "May 28, 2023",
      readTime: "7 min read",
      image: "/images/blog/sustainable-building.jpg",
      tags: ["Sustainability", "Green Building", "Tropical Design", "Eco-friendly"],
      featured: true
    },
    {
      id: 3,
      title: "How to Choose the Right Construction Company for Your Project",
      excerpt: "Selecting the right construction company is crucial for project success. Learn what factors to consider when making this important decision.",
      content: `
        <p>Choosing the right construction company is one of the most critical decisions you'll make for your building project. The quality, timeline, and cost of your project all depend on the contractor you select. Here's a comprehensive guide to help you make an informed decision.</p>
        
        <h3>Assess Your Project Needs</h3>
        <p>Before beginning your search, clearly define your project requirements:</p>
        <ul>
          <li>Project scope and complexity</li>
          <li>Approximate budget</li>
          <li>Timeline constraints</li>
          <li>Specific expertise needed (residential, commercial, renovation, etc.)</li>
        </ul>
        
        <h3>Verify Credentials and Experience</h3>
        <p>Ensure any company you consider has the proper qualifications:</p>
        <ul>
          <li>Valid business license and registration</li>
          <li>Appropriate insurance coverage (liability and workers' compensation)</li>
          <li>Industry certifications and memberships</li>
          <li>Years of experience in the industry</li>
          <li>Experience with projects similar to yours</li>
        </ul>
        
        <h3>Review Past Projects and References</h3>
        <p>A reputable construction company should be able to provide:</p>
        <ul>
          <li>Portfolio of completed projects</li>
          <li>Client testimonials and references</li>
          <li>Before and after photos</li>
          <li>Site visits to completed projects (for major investments)</li>
        </ul>
        
        <h3>Evaluate Communication and Professionalism</h3>
        <p>Pay attention to how the company interacts with you:</p>
        <ul>
          <li>Promptness in responding to inquiries</li>
          <li>Clarity and thoroughness in explanations</li>
          <li>Willingness to answer questions</li>
          <li>Professionalism of staff at all levels</li>
          <li>Transparency about processes and challenges</li>
        </ul>
        
        <h3>Compare Detailed Quotes</h3>
        <p>Request comprehensive quotes from multiple companies:</p>
        <ul>
          <li>Itemized breakdown of costs</li>
          <li>Clear scope of work</li>
          <li>Timeline projections</li>
          <li>Payment schedule</li>
          <li>Warranty information</li>
        </ul>
        
        <h3>Understand the Contract</h3>
        <p>Before signing, ensure the contract includes:</p>
        <ul>
          <li>Detailed project specifications</li>
          <li>Clear payment terms</li>
          <li>Change order process</li>
          <li>Dispute resolution procedures</li>
          <li>Project timeline with milestones</li>
          <li>Termination clauses</li>
        </ul>
        
        <h3>Red Flags to Watch For</h3>
        <p>Be cautious if a construction company:</p>
        <ul>
          <li>Requires large upfront payments</li>
          <li>Pressures you to make immediate decisions</li>
          <li>Cannot provide references or examples of past work</li>
          <li>Offers significantly lower prices than competitors</li>
          <li>Has numerous complaints or negative reviews</li>
          <li>Lacks proper insurance or licensing</li>
        </ul>
        
        <p>Taking the time to thoroughly research and select the right construction company will save you stress, time, and money in the long run. Remember that the lowest bid isn't always the best value—quality, reliability, and expertise are worth investing in for a successful construction project.</p>
      `,
      category: "Tips",
      author: "Michael Smith",
      authorTitle: "Construction Consultant",
      authorBio: "Michael has advised on hundreds of construction projects and helps clients navigate the contractor selection process.",
      authorImage: "/images/team/michael-smith.jpg",
      date: "April 10, 2023",
      readTime: "6 min read",
      image: "/images/blog/choosing-contractor.jpg",
      tags: ["Contractor Selection", "Project Planning", "Construction Tips", "Hiring Guide"],
      featured: false
    },
    {
      id: 4,
      title: "Modern Interior Design Trends in Ghana",
      excerpt: "Explore the latest interior design trends that are gaining popularity in Ghana and how to incorporate them into your space.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "Design",
      author: "Emma Wilson",
      authorTitle: "Interior Designer",
      authorBio: "Emma specializes in blending contemporary design with traditional African elements to create unique living spaces.",
      authorImage: "/images/team/emma-wilson.jpg",
      date: "March 22, 2023",
      readTime: "4 min read",
      image: "/images/blog/interior-design.jpg",
      tags: ["Interior Design", "Design Trends", "Home Decor", "Ghana"],
      featured: false
    },
    {
      id: 5,
      title: "Building Materials: Quality vs. Cost Considerations",
      excerpt: "Finding the right balance between quality and cost when selecting building materials is essential. Here's how to make informed decisions.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "Materials",
      author: "David Brown",
      authorTitle: "Materials Specialist",
      authorBio: "David has extensive experience in sourcing and evaluating construction materials for projects of all sizes.",
      authorImage: "/images/team/david-brown.jpg",
      date: "February 15, 2023",
      readTime: "8 min read",
      image: "/images/blog/building-materials.jpg",
      tags: ["Building Materials", "Cost Analysis", "Quality Control", "Construction"],
      featured: false
    },
    {
      id: 6,
      title: "Commercial Construction: Key Considerations for Business Owners",
      excerpt: "Planning a commercial construction project? Learn about the key factors business owners should consider for successful outcomes.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "Commercial",
      author: "Robert Johnson",
      authorTitle: "Commercial Construction Director",
      authorBio: "Robert specializes in commercial construction projects and has overseen the development of numerous business facilities.",
      authorImage: "/images/team/robert-johnson.jpg",
      date: "January 30, 2023",
      readTime: "6 min read",
      image: "/images/blog/commercial-construction.jpg",
      tags: ["Commercial Construction", "Business Facilities", "Project Management", "Planning"],
      featured: false
    }
  ];

  // Find the current blog post
  const post = blogPosts.find(post => post.id === parseInt(id || '1'));

  // Related posts (excluding current post)
  const relatedPosts = blogPosts
    .filter(p => p.id !== post?.id && p.category === post?.category)
    .slice(0, 3);

  if (!post) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Blog Post Not Found</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
        <Link to="/blog" className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-dark transition-colors duration-300 inline-block">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        {/* Back to Blog */}
        <Link 
          to="/blog" 
          className="inline-flex items-center text-primary font-medium mb-8 hover:underline"
        >
          <FaArrowLeft className="mr-2" />
          Back to Blog
        </Link>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="relative rounded-xl overflow-hidden mb-8">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-4 gap-4">
              <span className="flex items-center">
                <FaCalendarAlt className="mr-2" />
                {post.date}
              </span>
              <span className="flex items-center">
                <FaUser className="mr-2" />
                {post.author}
              </span>
              <span className="flex items-center">
                <FaTag className="mr-2" />
                {post.category}
              </span>
              <span className="flex items-center">
                <FaClock className="mr-2" />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-primary bg-opacity-10 text-primary text-sm font-medium px-3 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div 
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-a:text-primary prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Link 
                    key={index}
                    to={`/blog?tag=${tag}`}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Share This Article</h3>
              <div className="flex gap-3">
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-[#3b5998] text-white flex items-center justify-center hover:opacity-90 transition-opacity duration-300"
                >
                  <FaFacebookF />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-[#1da1f2] text-white flex items-center justify-center hover:opacity-90 transition-opacity duration-300"
                >
                  <FaTwitter />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:opacity-90 transition-opacity duration-300"
                >
                  <FaLinkedinIn />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-[#e60023] text-white flex items-center justify-center hover:opacity-90 transition-opacity duration-300"
                >
                  <FaPinterestP />
                </a>
              </div>
            </div>

            {/* Author */}
            <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <img 
                  src={post.authorImage} 
                  alt={post.author} 
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{post.author}</h3>
                  <p className="text-primary font-medium mb-3">{post.authorTitle}</p>
                  <p className="text-gray-600 dark:text-gray-300">{post.authorBio}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            {/* Related Posts */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Related Articles</h3>
              <div className="space-y-6">
                {relatedPosts.length > 0 ? (
                  relatedPosts.map((relatedPost) => (
                    <div key={relatedPost.id} className="flex gap-4">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title} 
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">
                          <Link to={`/blog/${relatedPost.id}`} className="hover:text-primary transition-colors duration-300">
                            {relatedPost.title}
                          </Link>
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{relatedPost.date}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">No related articles found.</p>
                )}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Categories</h3>
              <div className="space-y-3">
                {[
                  { name: "Renovation", count: 8 },
                  { name: "Sustainability", count: 5 },
                  { name: "Tips", count: 12 },
                  { name: "Design", count: 7 },
                  { name: "Materials", count: 6 },
                  { name: "Commercial", count: 4 },
                ].map((category, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <Link 
                      to={`/blog?category=${category.name}`}
                      className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-300"
                    >
                      {category.name}
                    </Link>
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm px-2 py-1 rounded">
                      {category.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Construction", "Renovation", "Design", "Architecture", "Sustainability", 
                  "Interior", "Materials", "Project Management", "Ghana", "Commercial", 
                  "Residential", "Tips", "Green Building"
                ].map((tag, index) => (
                  <Link 
                    key={index}
                    to={`/blog?tag=${tag}`}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-primary rounded-xl overflow-hidden shadow-xl"
        >
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-4 text-white">Ready to Start Your Construction Project?</h2>
              <p className="text-white text-opacity-90 mb-6">
                Our team of experts is ready to help you bring your vision to life. Contact us today for a consultation.
              </p>
              <Link 
                to="/contact" 
                className="bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300 inline-block"
              >
                Get in Touch
              </Link>
            </div>
            <div className="hidden md:block h-full bg-primary-dark">
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
    </div>
  );
};

export default BlogPost;