import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useTheme } from '../hooks/useTheme';
import { 
  ArrowLeft, 
  User, 
  Upload, 
  X, 
  Check, 
  Camera, 
  Loader2,
  Save,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import './SettingsPage.css';

interface Profile {
  id: string;
  username: string;
  full_name?: string;
  email?: string;
  avatar_url?: string;
  role?: string;
}

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [removeAvatar, setRemoveAvatar] = useState(false);

  useEffect(() => {
    const checkAuthAndLoadProfile = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !user) {
          navigate('/');
          return;
        }

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('id, username, full_name, email, avatar_url, role')
          .eq('id', user.id)
          .single();

        if (profileError) {
          setError('Failed to load profile');
          setLoading(false);
          return;
        }

        if (profileData) {
          setProfile(profileData);
          setFullName(profileData.full_name || '');
          setUsername(profileData.username || '');
          setAvatarPreview(profileData.avatar_url || null);
          setRemoveAvatar(false);
        }
      } catch (err) {
        console.error('Error loading profile:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndLoadProfile();
  }, [navigate]);

  const validateFile = (file: File): boolean => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
      return false;
    }

    if (file.size > maxSize) {
      setError('Image size must be less than 5MB');
      return false;
    }

    return true;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateFile(file)) {
      return;
    }

    setSelectedFile(file);
    setRemoveAvatar(false); // Reset remove flag when selecting a new file
    setError(null);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const uploadAvatar = async (file: File): Promise<string> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('You must be logged in to upload files');
    }

    // Delete all old avatars in user's folder to keep storage clean
    try {
      const { data: oldFiles } = await supabase.storage
        .from('avatar')
        .list(user.id);

      if (oldFiles && oldFiles.length > 0) {
        const filesToDelete = oldFiles.map(file => `${user.id}/${file.name}`);
        await supabase.storage
          .from('avatar')
          .remove(filesToDelete);
      }
    } catch (err) {
      console.error('Error deleting old avatars:', err);
      // Continue even if deletion fails - might be first upload
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('avatar')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from('avatar').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('You must be logged in to save changes');
        setSaving(false);
        return;
      }

      // Validate username
      if (!username.trim()) {
        setError('Username is required');
        setSaving(false);
        return;
      }

      if (username.trim().length < 3) {
        setError('Username must be at least 3 characters long');
        setSaving(false);
        return;
      }

      const usernameRegex = /^[a-zA-Z0-9_]+$/;
      if (!usernameRegex.test(username.trim())) {
        setError('Username can only contain letters, numbers, and underscores');
        setSaving(false);
        return;
      }

      // Check if username is taken (by another user)
      if (username.trim() !== profile?.username) {
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id')
          .eq('username', username.trim())
          .neq('id', user.id)
          .single();

        if (existingProfile) {
          setError('Username is already taken. Please choose a different one.');
          setSaving(false);
          return;
        }
      }

      let avatarUrl = profile?.avatar_url;

      // Remove avatar if requested
      if (removeAvatar) {
        try {
          const { data: { user: currentUser } } = await supabase.auth.getUser();
          if (currentUser) {
            // Delete all avatars in user's folder
            const { data: oldFiles } = await supabase.storage
              .from('avatar')
              .list(currentUser.id);

            if (oldFiles && oldFiles.length > 0) {
              const filesToDelete = oldFiles.map(file => `${currentUser.id}/${file.name}`);
              await supabase.storage
                .from('avatar')
                .remove(filesToDelete);
            }
          }
          avatarUrl = null;
          setRemoveAvatar(false);
        } catch (err) {
          console.error('Error removing avatar:', err);
          // Continue even if deletion fails
        }
      } else if (selectedFile) {
        // Upload avatar if a new file is selected
        setUploading(true);
        try {
          avatarUrl = await uploadAvatar(selectedFile);
          setSelectedFile(null);
        } catch (uploadErr: any) {
          setError(uploadErr.message || 'Failed to upload avatar');
          setUploading(false);
          setSaving(false);
          return;
        }
        setUploading(false);
      }

      // Update profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          username: username.trim(),
          full_name: fullName.trim() || null,
          avatar_url: avatarUrl || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (updateError) {
        setError(updateError.message || 'Failed to update profile');
        setSaving(false);
        return;
      }

      setSuccess('Profile updated successfully!');
      const updatedProfile = {
        ...profile!,
        username: username.trim(),
        full_name: fullName.trim() || null,
        avatar_url: avatarUrl || null
      };
      setProfile(updatedProfile);
      
      // Update preview to reflect changes
      if (removeAvatar) {
        setAvatarPreview(null);
      } else if (avatarUrl) {
        setAvatarPreview(avatarUrl);
      } else {
        setAvatarPreview(null);
      }

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err: any) {
      console.error('Error saving profile:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveAvatar = async () => {
    setSelectedFile(null);
    setAvatarPreview(null);
    setRemoveAvatar(true);
    setError(null);
    
    // Update preview to show initials placeholder
    if (profile) {
      // Preview will show placeholder on next render
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="settings-page">
        <div className="settings-loading">
          <Loader2 className="loading-spinner" size={48} />
          <p>Loading settings...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="settings-page">
        <div className="settings-error">
          <AlertCircle size={48} />
          <p>Failed to load profile</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="settings-header">
          <button 
            className="back-button" 
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="header-content">
            <h1>Settings</h1>
            <p>Manage your profile and preferences</p>
          </div>
        </div>

        {error && (
          <div className="alert alert-error">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <CheckCircle2 size={20} />
            <span>{success}</span>
          </div>
        )}

        <div className="settings-content">
          <div className="settings-section">
            <div className="section-header">
              <h2>Profile Picture</h2>
              <p>Upload a new avatar image (max 5MB)</p>
            </div>

            <div className="avatar-upload-section">
              <div className="avatar-preview-container">
                {avatarPreview && !removeAvatar ? (
                  <div className="avatar-preview-wrapper">
                    <img 
                      src={avatarPreview} 
                      alt="Avatar preview" 
                      className="avatar-preview"
                    />
                    <button
                      className="remove-avatar-btn"
                      onClick={handleRemoveAvatar}
                      aria-label="Remove avatar"
                      title="Remove avatar"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="avatar-placeholder">
                    {profile.full_name || profile.username ? (
                      <span className="avatar-initials">
                        {getInitials(profile.full_name || profile.username)}
                      </span>
                    ) : (
                      <User size={48} />
                    )}
                  </div>
                )}
              </div>

              <div className="upload-controls">
                <label htmlFor="avatar-upload" className="upload-button">
                  <Camera size={20} />
                  <span>{(avatarPreview && !removeAvatar) || selectedFile ? 'Change Avatar' : 'Upload Avatar'}</span>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    onChange={handleFileSelect}
                    className="file-input"
                    disabled={saving || uploading}
                  />
                </label>
                {selectedFile && (
                  <p className="file-info">
                    Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
                {removeAvatar && !selectedFile && (
                  <p className="file-info" style={{ color: 'var(--color-error)' }}>
                    Avatar will be removed when you save
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="settings-section">
            <div className="section-header">
              <h2>Profile Information</h2>
              <p>Update your personal information</p>
            </div>

            <div className="form-group">
              <label htmlFor="username">
                <User size={18} />
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="form-input"
                disabled={saving || uploading}
              />
              <p className="form-hint">
                Username must be at least 3 characters and can only contain letters, numbers, and underscores.
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="fullName">
                <User size={18} />
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="form-input"
                disabled={saving || uploading}
              />
              <p className="form-hint">
                Your display name (optional)
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <User size={18} />
                Email
              </label>
              <input
                id="email"
                type="email"
                value={profile.email || ''}
                placeholder="Email address"
                className="form-input"
                disabled
              />
              <p className="form-hint">
                Email cannot be changed from here. Contact support if you need to change it.
              </p>
            </div>
          </div>

          <div className="settings-actions">
            <button
              className="btn-secondary"
              onClick={() => navigate(-1)}
              disabled={saving || uploading}
            >
              Cancel
            </button>
            <button
              className="btn-primary"
              onClick={handleSave}
              disabled={saving || uploading || (username.trim() === profile.username && fullName.trim() === (profile.full_name || '') && !selectedFile && !removeAvatar)}
            >
              {saving || uploading ? (
                <>
                  <Loader2 className="spinner" size={20} />
                  {uploading ? 'Uploading...' : 'Saving...'}
                </>
              ) : (
                <>
                  <Save size={20} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

