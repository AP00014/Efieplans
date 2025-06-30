import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaUserCircle, FaSignOutAlt, FaCrown } from 'react-icons/fa';
import { useAuth } from '../../contexts/Authcontext';
import './styles/Blog.css';

const Blog = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { user, loading, login, logout } = useAuth();

  const getDisplayName = () => {
    if (user?.full_name) return user.full_name;
    if (user?.username) return `@${user.username}`;
    return user?.email?.split('@')[0] || 'User';
  };

  return (
    <div className="main_blog">
      <div className="bar">
        <div className="blog_logo">EfiePlans.<span>Social</span></div>
        
        <div className="right-section">
          <button 
            className="avatar-btn"
            onClick={() => setShowPopup(!showPopup)}
            disabled={loading}
          >
            {user?.avatar_url ? (
              <img src={user.avatar_url} alt="Avatar" className="avatar" />
            ) : (
              <FaUserCircle className="avatar fallback" />
            )}
            {user?.role === 'admin' && (
              <span className="admin-badge">
                <FaCrown />
              </span>
            )}
          </button>

          {showPopup && (
            <div className="profile-popup">
              {user ? (
                <>
                  <div className="profile-info">
                    {user.avatar_url && (
                      <img src={user.avatar_url} alt="Avatar" className="popup-avatar" />
                    )}
                    <h3>{getDisplayName()}</h3>
                    {user.username && <p className="username">@{user.username}</p>}
                    {user.email && <p className="email">{user.email}</p>}
                    <div className="account-info">
                      <span className="role-badge">
                        {user.role}
                        {user.role === 'admin' && <FaCrown className="role-icon" />}
                      </span>
                      <span className="join-date">
                        Joined: {new Date(user.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <button 
                    className="signout-btn" 
                    onClick={logout}
                    disabled={loading}
                  >
                    <FaSignOutAlt /> {loading ? 'Signing Out...' : 'Sign Out'}
                  </button>
                </>
              ) : (
                <div className="auth-options">
                  <button 
                    className="google-btn"
                    onClick={() => login('google')}
                    disabled={loading}
                  >
                    <FcGoogle className="icon" />
                    {loading ? 'Signing In...' : 'Continue with Google'}
                  </button>
                  <button 
                    className="facebook-btn"
                    onClick={() => login('facebook')}
                    disabled={loading}
                  >
                    <FaFacebook className="icon" />
                    {loading ? 'Signing In...' : 'Continue with Facebook'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;