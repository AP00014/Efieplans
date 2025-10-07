import React from 'react';
import Header from '../components/Header';
import './BlogPage.css';

const BlogPage: React.FC = () => {
  return (
    <div className="blog-page">
      <Header />

      <main className="blog-content">
        <div className="container">
          <div className="welcome-section">
            <h1>Welcome to Efie Plans Blog</h1>
            <p className="subtitle">
              Discover our latest insights on architectural design, construction, and interior design
            </p>
          </div>

          <div className="posts-grid">
            <article className="post-card">
              <div className="post-header">
                <h2>Getting Started with React and TypeScript</h2>
                <span className="post-date">March 15, 2024</span>
              </div>
              <p className="post-excerpt">
                Learn how to set up a modern React application with TypeScript, Vite, and the latest best practices for development.
              </p>
              <div className="post-actions">
                <button className="action-button">
                  ❤️ Like
                </button>
                <button className="action-button">
                  💬 Comment
                </button>
              </div>
            </article>

            <article className="post-card">
              <div className="post-header">
                <h2>The Future of Web Development</h2>
                <span className="post-date">March 10, 2024</span>
              </div>
              <p className="post-excerpt">
                Exploring the latest trends and technologies that are shaping the future of web development in 2024.
              </p>
              <div className="post-actions">
                <button className="action-button">
                  ❤️ Like
                </button>
                <button className="action-button">
                  💬 Comment
                </button>
              </div>
            </article>

            <article className="post-card">
              <div className="post-header">
                <h2>Building Modern Authentication Systems</h2>
                <span className="post-date">March 5, 2024</span>
              </div>
              <p className="post-excerpt">
                A deep dive into creating secure and user-friendly authentication systems with modern tools and best practices.
              </p>
              <div className="post-actions">
                <button className="action-button">
                  ❤️ Like
                </button>
                <button className="action-button">
                  💬 Comment
                </button>
              </div>
            </article>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPage;