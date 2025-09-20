import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaWhatsapp, 
  FaFacebook, 
  FaTwitter, 
  FaTiktok, 
  FaLinkedin, 
  FaSnapchat, 
  FaYoutube,
} from 'react-icons/fa';
import { FiUser, FiPhone, FiMail, FiMessageSquare, FiSend } from 'react-icons/fi';
import '../styles/pages/contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const socialLinks = [
    { icon: FaWhatsapp, url: '#', color: '#25D366' },
    { icon: FaFacebook, url: '#', color: '#1877F2' },
    { icon: FaTwitter, url: '#', color: '#1DA1F2' },
    { icon: FaTiktok, url: '#', color: '#FF0050' },
    { icon: FaLinkedin, url: '#', color: '#0A66C2' },
    { icon: FaSnapchat, url: '#', color: '#FFFC00' },
    { icon: FaYoutube, url: '#', color: '#FF0000' },
  ];

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Please enter your full name');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!/^\+?[1-9]\d{1,14}$/.test(formData.mobile)) {
      setError('Please enter a valid mobile number');
      return false;
    }
    if (!formData.message.trim()) {
      setError('Please enter your message');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const formPayload = {
      access_key: '1f7e12ba-66e5-454e-b758-59b18cc50237',
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      message: formData.message,
      subject: 'New Contact Form Submission',
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formPayload)
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccess(true);
        setFormData({ name: '', mobile: '', email: '', message: '' });
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(data.message || 'There was an error submitting the form');
      }
    } catch {
      setError('There was an error submitting the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section">
      <motion.div 
        className="contact-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="contact-header">
          <motion.h2 
            className="section-title"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            Get in Touch
          </motion.h2>
          <p className="section-subtitle">
            We'd love to hear from you! Please fill out the form below.
          </p>
        </div>

        <div className="contact-content">
          <div className="social-section">
          
          <div className="social-grid">
              {socialLinks.map(({ icon: Icon, color, url }, index) => (
                <motion.a
                  key={index}
                  href={url}
                  className="social-icon"
                  style={{ background: color }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>

            <div className="contact-info">
              <motion.div 
                className="info-card"
                whileHover={{ scale: 1.02 }}
              >
                <h3>📍 Visit Us</h3>
                <p>123 Business Street<br />New York, NY 10001</p>
              </motion.div>

              <motion.div 
                className="info-card"
                whileHover={{ scale: 1.02 }}
              >
                <h3>📞 Call Us</h3>
                <p>+1 (555) 123-4567</p>
              </motion.div>
            </div>

          </div>

          <form className="form-section" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="input-group">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="input-group">
                <FiPhone className="input-icon" />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  required
                  pattern="^\+?[1-9]\d{1,14}$"
                />
              </div>

              <div className="input-group">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <FiMessageSquare className="input-icon" />
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                minLength={10}
              />
            </div>

            {error && (
              <motion.div
                className="error-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              {loading ? (
                'Sending...'
              ) : (
                <>
                  Send Message <FiSend />
                </>
              )}
            </motion.button>

            {success && (
              <motion.div
                className="success-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Message sent successfully! 🎉
              </motion.div>
            )}
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;