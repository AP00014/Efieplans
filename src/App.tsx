import { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Projects from './components/pages/Projects';
import Contact from './components/pages/contact';
import ProjectDetail from './components/ProjectDetail';

import ArchitecturalPortfolio from './components/Architectural';
import ConstructionPage from './components/Construction';
import InteriorDesignPage from './components/Interor';
import RenovationPage from './components/Renovation';
import './App.css';



function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <Router>
      <div className={`app-container ${darkTheme ? 'dark-theme' : 'light-theme'}`}>
        <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
          <ScrollToTop />
        <main className="main-content">
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="About" element={<About />} />
            <Route path="Projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/slides/:id" element={<ProjectDetail />} />
            <Route path="Architectural" element={<ArchitecturalPortfolio/>} />
            <Route path='Contruction' element={< ConstructionPage/>}/>
            <Route path='Interior' element={<InteriorDesignPage/>}/>
            <Route path="Renovation" element={<RenovationPage />} />
            <Route path="Contact" element={<Contact />} />
           
          </Routes>
          </main>

        <Footer  />
      </div>
    </Router>
  );
}

export default App;