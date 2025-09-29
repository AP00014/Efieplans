import React, { useState } from 'react';
import { FaUser, FaGoogle } from 'react-icons/fa';

interface StoriesProps {
  userAvatar?: string;
  onSignUp?: () => void;
  onLogin?: () => void;
  onGoogleSignIn?: () => void;
}

const Stories: React.FC<StoriesProps> = ({
  userAvatar = '/images/avatars/default.jpg',
  onSignUp,
  onLogin,
  onGoogleSignIn
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignUp = () => {
    setIsDropdownOpen(false);
    onSignUp?.();
  };

  const handleLogin = () => {
    setIsDropdownOpen(false);
    onLogin?.();
  };

  const handleGoogleSignIn = () => {
    setIsDropdownOpen(false);
    onGoogleSignIn?.();
  };

  return (
    <div className="user-account-container">
      <div className="user-avatar-wrapper">
        <button
          className="user-avatar-button"
          onClick={toggleDropdown}
          aria-label="User account menu"
        >
          <div className="avatar-container">
            <img
              src={userAvatar}
              alt="User avatar"
              className="user-avatar"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="avatar-fallback">
              <FaUser className="avatar-icon" />
            </div>
            <div className="avatar-ring"></div>
          </div>
        </button>

        {isDropdownOpen && (
          <div className="user-dropdown">
            <button
              className="dropdown-item"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
            <button
              className="dropdown-item"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className="dropdown-item google-signin"
              onClick={handleGoogleSignIn}
            >
              <FaGoogle className="google-icon" />
              Sign In with Google
            </button>
          </div>
        )}
      </div>

      {/* Overlay to close dropdown when clicking outside */}
      {isDropdownOpen && (
        <div
          className="dropdown-overlay"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default Stories;