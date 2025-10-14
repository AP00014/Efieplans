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
import { FiUser, FiMail, FiMessageSquare, FiSend, FiTag } from 'react-icons/fi';
import { supabase } from '../lib/supabase';
import '../styles/pages/contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
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
    if (!formData.service) {
      setError('Please select a service');
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

    try {
      const { error: supabaseError } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: `Service Inquiry: ${formData.service}`,
            message: formData.message,
            phone: formData.phone,
          }
        ]);

      if (supabaseError) {
        setError('There was an error submitting the form. Please try again.');
        console.error('Supabase error:', supabaseError);
      } else {
        // Send notification email after successful database insert
        try {
          await supabase.functions.invoke('send-contact-notification', {
            body: {
              record: {
                name: formData.name,
                email: formData.email,
                subject: `Service Inquiry: ${formData.service}`,
                message: formData.message,
                phone: formData.phone,
              }
            }
          });
        } catch (emailError) {
          console.warn('Email notification failed, but message was saved:', emailError);
          // Don't show error to user since the main action (saving message) succeeded
        }

        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      setError('There was an error submitting the form. Please try again.');
      console.error('Submission error:', error);
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
                <FiMail className="input-icon" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="input-group">
                <FiUser className="input-icon" />
                <input
                  type="tel"
                  placeholder="Phone Number (Optional)"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(255, 140, 0, 0.2)',
                    borderRadius: '12px',
                    padding: '1rem 1rem 1rem 3rem',
                    fontSize: '1rem',
                    color: 'var(--text)',
                    width: '100%',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary)';
                    e.target.style.boxShadow = '0 0 12px rgba(255, 140, 0, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 140, 0, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div className="input-group">
                <FiTag className="input-icon" />
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  required
                  className="form-select"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(255, 140, 0, 0.2)',
                    borderRadius: '12px',
                    padding: '1rem 3rem 1rem 3rem',
                    fontSize: '1rem',
                    color: 'var(--text)',
                    width: '100%',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary)';
                    e.target.style.boxShadow = '0 0 12px rgba(255, 140, 0, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 140, 0, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="">Select a service</option>
                  <option value="construction">🏗️ Building Construction</option>
                  <option value="management">📋 Construction Management</option>
                  <option value="design">🎨 Architectural Design</option>
                  <option value="consultation">💬 Project Consultation</option>
                </select>
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
              whileHover={{
                scale: 1.05,
                boxShadow: "0 16px 40px rgba(255, 140, 0, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              style={{
                width: '100%',
                padding: '1.5rem 2rem',
                background: 'linear-gradient(135deg, #ff8c00 0%, #ff6b35 50%, #3b82f6 100%)',
                color: 'white',
                border: '2px solid transparent',
                borderRadius: '16px',
                fontSize: '1.2rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(255, 140, 0, 0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
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