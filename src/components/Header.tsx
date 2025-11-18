import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import UserAvatar from './UserAvatar';
import { supabase } from '../lib/supabase';
import { useTheme } from '../hooks/useTheme';
import type { User } from '@supabase/supabase-js';
import { UserPlus, Sun, Moon, Search, X } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  showSearch?: boolean;
  searchQuery?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearchBlur?: () => void;
  showSuggestions?: boolean;
  onSuggestionClick?: (suggestion: string) => void;
  filteredSuggestions?: string[];
  selectedSuggestionIndex?: number;
  onSuggestionMouseEnter?: (index: number) => void;
  onClearSearch?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  showSearch = false,
  searchQuery = '',
  onSearchChange,
  onSearchKeyDown,
  onSearchBlur,
  showSuggestions = false,
  onSuggestionClick,
  filteredSuggestions = [],
  selectedSuggestionIndex = -1,
  onSuggestionMouseEnter,
  onClearSearch
}) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    // Get initial user
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event);
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);


  return (
    <>
      <header className="header">
        <div className="header-content">
           <Link to="/" className="navbar-logo">
             <img
               src="https://res.cloudinary.com/dpzndrhse/image/upload/v1750667944/efieplans_logo_edited_kq1tmo.avif"
               alt="Efie plans Construction Logo"
               className="navbar-logo-image"
             />
           </Link>

           {showSearch && (
             <div className="header-search-container">
               <div className="header-search">
                 <Search size={20} className="search-icon" />
                 <input
                   type="text"
                   placeholder="Search posts..."
                   value={searchQuery}
                   onChange={onSearchChange}
                   onKeyDown={onSearchKeyDown}
                   onBlur={onSearchBlur}
                   className="header-search-input"
                   autoComplete="off"
                 />
                 {searchQuery && (
                   <button
                     className="clear-search-btn"
                     onClick={onClearSearch}
                     aria-label="Clear search"
                   >
                     <X size={16} />
                   </button>
                 )}

                 {showSuggestions && filteredSuggestions.length > 0 && (
                   <div className="header-suggestions-dropdown">
                     {filteredSuggestions.map((suggestion, index) => (
                       <button
                         key={suggestion}
                         className={`suggestion-item ${index === selectedSuggestionIndex ? 'selected' : ''}`}
                         onClick={() => onSuggestionClick?.(suggestion)}
                         onMouseEnter={() => onSuggestionMouseEnter?.(index)}
                       >
                         <Search size={14} />
                         <span>{suggestion}</span>
                       </button>
                     ))}
                   </div>
                 )}
               </div>
             </div>
           )}

           <div className="header-actions">
             {user ? (
               <div className="user-section">
                 <UserAvatar />
               </div>
             ) : (
               <div className="header-controls">
                 <button
                   className="theme-toggle-btn"
                   onClick={() => {
                     console.log('Header theme toggle clicked');
                     toggleTheme();
                   }}
                   title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                 >
                   {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                 </button>
                 <button
                   className="auth-button"
                   onClick={() => setIsAuthModalOpen(true)}
                 >
                   <UserPlus size={20} />
                   <span>Get Started</span>
                 </button>
               </div>
             )}
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