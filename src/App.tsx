import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import ScrollToTop from './hooks/useScrollToTop';
import './App.css';

// Layout
import Layout from './components/layout/Layout';


// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import ArchitecturalDesign from './pages/ArchitecturalDesign';
import InteriorDesign from './pages/InteriorDesign';
import Construction from './pages/Construction';
import AdminPage from './pages/AdminPage';
import BlogPage from './pages/BlogPage';


function App() {
  console.log('App.tsx: App component rendering');

  return (
    <ThemeProvider>
      <Router basename="/Efieplans/">
      <ScrollToTop />
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/services/architectural-design" element={<Layout><ArchitecturalDesign /></Layout>} />
        <Route path="/services/interior-design" element={<Layout><InteriorDesign /></Layout>} />
        <Route path="/services/construction" element={<Layout><Construction /></Layout>} />
        <Route path="/projects" element={<Layout><Portfolio /></Layout>} />
        <Route path="/projects/:id" element={<Layout><ProjectDetail /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/posts" element={<Layout><BlogPage /></Layout>} />
        <Route path="*" element={<Layout><div className="container-custom py-20 text-center"><h1 className="text-3xl font-bold mb-4">Page Not Found</h1><p>The page you are looking for doesn't exist or has been moved.</p></div></Layout>} />
      </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
