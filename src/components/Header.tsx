import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import UserAvatar from './UserAvatar';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';
import { UserPlus } from 'lucide-react';
import './Header.css';

const Header: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

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
  
           <div className="header-actions">
             {user ? (
               <div className="user-section">
                 <UserAvatar />
               </div>
             ) : (
               <button
                 className="auth-button"
                 onClick={() => setIsAuthModalOpen(true)}
               >
                 <UserPlus size={20} />
                 <span>Get Started</span>
               </button>
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