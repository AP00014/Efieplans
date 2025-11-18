import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import ScrollToTop from './hooks/useScrollToTop';
import { registerServiceWorker } from './utils/swRegistration';
import './App.css';

// Layout
import Layout from './components/layout/Layout';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const ArchitecturalDesign = lazy(() => import('./pages/ArchitecturalDesign'));
const InteriorDesign = lazy(() => import('./pages/InteriorDesign'));
const Construction = lazy(() => import('./pages/Construction'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="loading-spinner"></div>
    <span className="ml-3 text-lg">Loading...</span>
  </div>
);


function App() {
  console.log('App.tsx: App component rendering');

  // Register service worker for caching and performance
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <ThemeProvider>
      <Router basename="/Efieplans/">
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/settings" element={<Layout><SettingsPage /></Layout>} />
            <Route path="/" element={<Layout><Home /></Layout>} />

            <Route path="/services" element={<Layout><Services /></Layout>} />
            <Route path="/architectural-design" element={<Layout><ArchitecturalDesign /></Layout>} />
            <Route path="/interior-design" element={<Layout><InteriorDesign /></Layout>} />
            <Route path="/construction" element={<Layout><Construction /></Layout>} />
            <Route path="/projects" element={<Layout><Portfolio /></Layout>} />
            <Route path="/projects/:id" element={<Layout><ProjectDetail /></Layout>} />

            <Route path="/posts" element={<Layout><BlogPage /></Layout>} />
            <Route path="*" element={<Layout><div className="container-custom py-20 text-center"><h1 className="text-3xl font-bold mb-4">Page Not Found</h1><p>The page you are looking for doesn't exist or has been moved.</p></div></Layout>} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  )
}

export default App
