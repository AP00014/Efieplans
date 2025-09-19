import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

// Layout
import Layout from './components/layout/Layout';

// Scroll to Top Component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import ArchitecturalDesign from './pages/ArchitecturalDesign';
import InteriorDesign from './pages/InteriorDesign';
import Construction from './pages/Construction';


function App() {
  console.log('App.tsx: App component rendering');

  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/architectural-design" element={<ArchitecturalDesign />} />
            <Route path="/services/interior-design" element={<InteriorDesign />} />
            <Route path="/services/construction" element={<Construction />} />
            <Route path="/projects" element={<Portfolio />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<div className="container-custom py-20 text-center"><h1 className="text-3xl font-bold mb-4">Page Not Found</h1><p>The page you are looking for doesn't exist or has been moved.</p></div>} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
