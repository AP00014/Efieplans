import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useTheme } from "../hooks/useTheme";
import {
  LogOut,
  Settings,
  User,
  Mail,
  UserCheck,
  Shield,
  Sun,
  Moon,
} from "lucide-react";
import "./UserAvatar.css";

interface Profile {
  id: string;
  username: string;
  full_name?: string;
  email?: string;
  avatar_url?: string;
  role?: string;
}

const UserAvatar: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profileData, error } = await supabase
          .from("profiles")
          .select("id, username, full_name, email, avatar_url, role")
          .eq("id", user.id)
          .single();

        if (!error && profileData) {
          setProfile(profileData);
        }
      }

      setLoading(false);
    };

    getProfile();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data: profileData, error } = await supabase
          .from("profiles")
          .select("id, username, full_name, email, avatar_url, role")
          .eq("id", session.user.id)
          .single();

        if (!error && profileData) {
          setProfile(profileData);
        } else {
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return <div className="user-avatar loading">...</div>;
  }

  if (!profile) {
    return null;
  }

  const initials = (profile.full_name || profile.username || "U")
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsDropdownOpen(false);
  };

  return (
    <div className="user-avatar-container" ref={dropdownRef}>
      <button className="avatar-button" onClick={toggleDropdown}>
        {profile.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt={profile.username}
            className="avatar-image"
          />
        ) : (
          <div className="avatar-initials">{initials}</div>
        )}
        {profile.role === "admin" && <div className="admin-indicator">A</div>}
      </button>
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <div className="user-info">
              <div className="info-item">
                <UserCheck size={14} className="info-icon" />
                <div className="info-content">
                  <span className="info-label">Username</span>
                  <span className="info-value">{profile.username}</span>
                </div>
              </div>
              <div className="info-item">
                <User size={14} className="info-icon" />
                <div className="info-content">
                  <span className="info-label">Full Name</span>
                  <span className="info-value">
                    {profile.full_name || "Not set"}
                  </span>
                </div>
              </div>
              <div className="info-item">
                <Mail size={14} className="info-icon" />
                <div className="info-content">
                  <span className="info-label">Email</span>
                  <span className="info-value">
                    {profile.email || "Not set"}
                  </span>
                </div>
              </div>
              <div className="info-item">
                <Shield size={14} className="info-icon" />
                <div className="info-content">
                  <span className="info-label">Role</span>
                  <span className="info-value">{profile.role || "user"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown-divider"></div>
          <button
            className="dropdown-item theme-toggle"
            onClick={() => {
              console.log("UserAvatar theme toggle clicked");
              toggleTheme();
            }}
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
          <div className="dropdown-divider"></div>
          {profile.role === "admin" && (
            <Link to="/admin" className="dropdown-item admin-link">
              <Shield size={16} />
              Admin Dashboard
            </Link>
          )}
          <button
            className="dropdown-item"
            onClick={() => {
              setIsDropdownOpen(false);
              navigate("/settings");
            }}
          >
            <Settings size={16} />
            Settings
          </button>
          <button className="dropdown-item sign-out" onClick={handleLogout}>
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
