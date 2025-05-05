// src/components/ScrollToTop.tsx
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './scroll.css'

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;