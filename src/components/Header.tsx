import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import { UserPlus } from 'lucide-react';
import './Header.css';

const Header: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo-link">
            <div className="logo">
              <h1>Efie Plans</h1>
            </div>
          </Link>

          <div className="header-actions">
            <button
              className="auth-button"
              onClick={() => setIsAuthModalOpen(true)}
            >
              <UserPlus size={20} />
              <span>Get Started</span>
            </button>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Header;