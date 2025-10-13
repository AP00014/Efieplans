import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Profile, PostWithProfile, SupabaseComment } from '../types/index';
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Settings,
  Menu,
  X,
  Shield,
  Upload,
  Plus,
  Tag,
  Image,
  Video,
  LogOut,
  Home,
  Search
} from 'lucide-react';
import './AdminPage.css';

interface UserActivity {
  username: string;
  created_at: string;
}

interface PostActivity {
  title: string;
  created_at: string;
  user_id: string;
}

interface DashboardStats {
  totalUsers: number;
  totalAdmins: number;
  totalPosts: number;
  totalLikes: number;
  totalComments: number;
  recentUsers: UserActivity[];
  recentPosts: PostActivity[];
}

const AdminPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  useEffect(() => {
    const checkAdminAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/');
        return;
      }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('id, username, role, created_at, updated_at')
        .eq('id', user.id)
        .single();

      if (!profileData || profileData.role !== 'admin') {
        navigate('/');
        return;
      }

      setProfile(profileData);
      setLoading(false);
    };

    checkAdminAccess();
  }, [navigate]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'create-post', label: 'Create Post', icon: FileText },
    { id: 'posts', label: 'Post Management', icon: FileText },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'home', label: 'Main Site', icon: Home },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardContent />;
      case 'create-post':
        return <CreatePostContent />;
      case 'posts':
        return <PostManagement />;
      case 'users':
        return <UserManagement />;
      case 'analytics':
        return <AnalyticsContent />;
      case 'settings':
        return <SettingsContent />;
      case 'home':
        navigate('/blog');
        return <DashboardContent />;
      default:
        return <DashboardContent />;
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Verifying admin access...</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      {/* Mobile menu button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Shield size={32} className="admin-icon" />
          <h2>Admin Panel</h2>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <p>Logged in as: {profile?.username}</p>
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        <div className="admin-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

// Create Post Component
const CreatePostContent: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    images: [] as string[],
    video_url: '',
    tags: [] as string[],
    category: '' as string
  });
  const [tagInput, setTagInput] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addImageUrl = () => {
    if (imageUrlInput.trim() && formData.images.length < 4) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageUrlInput.trim()]
      }));
      setImageUrlInput('');
    } else if (formData.images.length >= 4) {
      alert('Maximum 4 images allowed');
    }
  };

  const addVideoUrl = () => {
    if (videoUrlInput.trim()) {
      setFormData(prev => ({
        ...prev,
        video_url: videoUrlInput.trim()
      }));
      setVideoUrlInput('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('posts')
        .insert({
          user_id: user.id,
          title: formData.title,
          content: formData.content,
          image_url: formData.images.length > 0 ? JSON.stringify(formData.images) : null,
          video_url: formData.video_url || null,
          tags: formData.tags,
          category: formData.category
        });

      if (error) throw error;

      alert('Post created successfully!');
      setFormData({
        title: '',
        content: '',
        images: [],
        video_url: '',
        tags: [],
        category: ''
      });
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-section">
      <div className="section-header">
        <h1>Create New Post</h1>
        <p>Share your thoughts and media with the community</p>
      </div>

      <form onSubmit={handleSubmit} className="create-post-form">
        <div className="form-grid">
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="title">Post Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter an engaging title..."
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Write your post content here..."
                required
                rows={8}
                className="form-textarea"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                required
                className="form-input"
              >
                <option value="">Select a category</option>
                <option value="architectural design">Architectural Design</option>
                <option value="construction">Construction</option>
                <option value="interior design">Interior Design</option>
              </select>
            </div>

            <div className="form-group">
              <label>Tags</label>
              <div className="tag-input-group">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag..."
                  className="form-input"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <button type="button" onClick={addTag} className="add-tag-btn">
                  <Plus size={16} />
                  Add
                </button>
              </div>
              <div className="tags-display">
                {formData.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    <Tag size={12} />
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="remove-tag">
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="form-group">
              <label>Media URLs</label>

              <div className="media-upload-section">
                <div className="upload-group">
                  <label className="upload-label">
                    <Image size={20} />
                    Image URLs ({formData.images.length}/4)
                  </label>
                  <div className="url-input-group">
                    <input
                      type="url"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      placeholder="Enter image URL..."
                      className="form-input"
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addImageUrl())}
                    />
                    <button type="button" onClick={addImageUrl} className="add-url-btn">
                      Add Image
                    </button>
                  </div>
                  {formData.images.map((image: string, index: number) => (
                    <div key={index} className="media-preview">
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        className="preview-image"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.add('error');
                        }}
                        onLoad={(e) => {
                          e.currentTarget.style.display = 'block';
                        }}
                      />
                      <div className="image-error" style={{ display: 'none' }}>
                        Failed to load image
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          images: prev.images.filter((_: string, i: number) => i !== index)
                        }))}
                        className="remove-media"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="upload-group">
                  <label className="upload-label">
                    <Video size={20} />
                    Video URL
                  </label>
                  <div className="url-input-group">
                    <input
                      type="url"
                      value={videoUrlInput}
                      onChange={(e) => setVideoUrlInput(e.target.value)}
                      placeholder="Enter video URL..."
                      className="form-input"
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addVideoUrl())}
                    />
                    <button type="button" onClick={addVideoUrl} className="add-url-btn">
                      Add Video
                    </button>
                  </div>
                  {formData.video_url && (
                    <div className="media-preview">
                      <video src={formData.video_url} className="preview-video" controls />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, video_url: '' }))}
                        className="remove-media"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <>
                <div className="loading-spinner small"></div>
                Creating Post...
              </>
            ) : (
              <>
                <Upload size={16} />
                Create Post
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

// Dashboard Component
const DashboardContent: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalAdmins: 0,
    totalPosts: 0,
    totalLikes: 0,
    totalComments: 0,
    recentUsers: [],
    recentPosts: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch all stats in parallel for better performance
        const [
          totalUsersResult,
          totalAdminsResult,
          totalPostsResult,
          totalLikesResult,
          totalCommentsResult,
          recentUsersResult,
          recentPostsResult
        ] = await Promise.all([
          supabase.from('profiles').select('*', { count: 'exact', head: true }),
          supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'admin'),
          supabase.from('posts').select('*', { count: 'exact', head: true }),
          supabase.from('likes').select('*', { count: 'exact', head: true }),
          supabase.from('comments').select('*', { count: 'exact', head: true }),
          supabase.from('profiles').select('username, created_at').order('created_at', { ascending: false }).limit(5),
          supabase.from('posts').select('title, created_at, user_id').order('created_at', { ascending: false }).limit(5)
        ]);

        setStats({
          totalUsers: totalUsersResult.count || 0,
          totalAdmins: totalAdminsResult.count || 0,
          totalPosts: totalPostsResult.count || 0,
          totalLikes: totalLikesResult.count || 0,
          totalComments: totalCommentsResult.count || 0,
          recentUsers: recentUsersResult.data || [],
          recentPosts: recentPostsResult.data || []
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="content-section">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="content-section">
      <div className="section-header">
        <h1>Dashboard Overview</h1>
        <p>Monitor your platform's performance and user activity</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon users">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Users</h3>
            <p className="stat-value">{stats.totalUsers}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon admins">
            <Shield size={24} />
          </div>
          <div className="stat-content">
            <h3>Administrators</h3>
            <p className="stat-value">{stats.totalAdmins}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon posts">
            <FileText size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Posts</h3>
            <p className="stat-value">{stats.totalPosts}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon likes">
            <BarChart3 size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Likes</h3>
            <p className="stat-value">{stats.totalLikes}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon comments">
            <BarChart3 size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Comments</h3>
            <p className="stat-value">{stats.totalComments}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="recent-activity">
          <h2>Recent Users</h2>
          <div className="activity-list">
            {stats.recentUsers.map((user, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">
                  <Users size={16} />
                </div>
                <div className="activity-content">
                  <p>{user.username} joined</p>
                  <span>{new Date(user.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="recent-activity">
          <h2>Recent Posts</h2>
          <div className="activity-list">
            {stats.recentPosts.map((post, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">
                  <FileText size={16} />
                </div>
                <div className="activity-content">
                  <p>{post.title}</p>
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// User Management Component
const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Failed to update user role');
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="content-section">
        <div className="loading-spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="content-section">
      <div className="section-header">
        <h1>User Management</h1>
        <p>Manage user accounts and permissions</p>
      </div>

      <div className="management-controls">
        <div className="search-container">
          <button
            className="search-toggle-btn"
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            aria-label="Toggle search"
          >
            <Search size={20} />
          </button>
          <input
            type="text"
            placeholder="Search users by name, username, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`search-input ${isSearchExpanded ? 'expanded' : ''}`}
          />
          {searchTerm && (
            <button
              className="clear-search-btn"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <div className="stats-summary">
          <span>Total Users: {users.length}</span>
          <span>Admins: {users.filter(u => u.role === 'admin').length}</span>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="data-table-container desktop-table">
        <table className="data-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.full_name || 'N/A'}</td>
                <td>{user.email || 'N/A'}</td>
                <td>
                  <select
                    value={user.role || 'user'}
                    onChange={(e) => updateUserRole(user.id, e.target.value)}
                    className="role-select"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                <td>
                  <button
                    className="action-btn delete"
                    onClick={() => deleteUser(user.id)}
                    disabled={user.role === 'admin'} // Prevent deleting other admins
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="mobile-cards-view">
        {filteredUsers.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-card-header">
              <div className="user-avatar-large">
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt={user.username} />
                ) : (
                  <div className="default-avatar-large">👤</div>
                )}
              </div>
              <div className="user-card-info">
                <h3 className="user-card-username">{user.username}</h3>
                <p className="user-card-name">{user.full_name || 'No full name'}</p>
                <div className="user-role-badge">
                  <span className={`role-badge ${user.role || 'user'}`}>
                    {user.role === 'admin' ? 'Administrator' : 'User'}
                  </span>
                </div>
              </div>
            </div>

            <div className="user-card-details">
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{user.email || 'Not provided'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Joined:</span>
                <span className="detail-value">{new Date(user.created_at).toLocaleDateString()}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Bio:</span>
                <span className="detail-value">{user.bio || 'No bio available'}</span>
              </div>
            </div>

            <div className="user-card-actions">
              <div className="role-selector-mobile">
                <label>Role:</label>
                <select
                  value={user.role || 'user'}
                  onChange={(e) => updateUserRole(user.id, e.target.value)}
                  className="role-select-mobile"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button
                className="action-btn delete-mobile"
                onClick={() => deleteUser(user.id)}
                disabled={user.role === 'admin'}
              >
                Delete User
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Post Management Component
const PostManagement: React.FC = () => {
  const [posts, setPosts] = useState<PostWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [editingPost, setEditingPost] = useState<PostWithProfile | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [modalPost, setModalPost] = useState<PostWithProfile | null>(null);

  interface LikeWithProfile {
    user_id: string;
    profiles: {
      username: string;
      full_name?: string;
      avatar_url?: string;
    } | null;
  }

  interface CommentWithProfile extends SupabaseComment {
    profiles: {
      username: string;
      full_name?: string;
      avatar_url?: string;
    } | null;
  }

  const [likesUsers, setLikesUsers] = useState<LikeWithProfile[]>([]);
  const [commentsData, setCommentsData] = useState<CommentWithProfile[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  // Auto-refresh posts every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchPosts();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles: user_id (username, full_name)
        `)
        .order('created_at', { ascending: false })
        .limit(50); // Limit to 50 posts for admin view

      if (error) throw error;

      // Fetch likes and comments count in parallel for better performance
      const postsWithCounts = await Promise.all(
        (data || []).map(async (post) => {
          const [likesResult, commentsResult] = await Promise.all([
            supabase
              .from('likes')
              .select('*', { count: 'exact', head: true })
              .eq('post_id', post.id),
            supabase
              .from('comments')
              .select('*', { count: 'exact', head: true })
              .eq('post_id', post.id)
          ]);

          return {
            ...post,
            likes: likesResult.count || 0,
            comments: commentsResult.count || 0
          };
        })
      );

      setPosts(postsWithCounts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;
      fetchPosts(); // Refresh the list
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  const handleEditPost = (post: PostWithProfile) => {
    setEditingPost(post);
    setShowEditModal(true);
  };

  const handleSaveEdit = async (updatedPost: PostWithProfile) => {
    try {
      const { error } = await supabase
        .from('posts')
        .update({
          title: updatedPost.title,
          content: updatedPost.content,
          image_url: updatedPost.image_url,
          video_url: updatedPost.video_url,
          tags: updatedPost.tags,
          category: updatedPost.category,
          updated_at: new Date().toISOString()
        })
        .eq('id', updatedPost.id);

      if (error) throw error;

      setShowEditModal(false);
      setEditingPost(null);
      fetchPosts(); // Refresh the list
      alert('Post updated successfully!');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post');
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingPost(null);
  };

  const handleShowLikes = async (post: PostWithProfile) => {
    try {
      const { data, error } = await supabase
        .from('likes')
        .select(`
          user_id,
          profiles: user_id (username, full_name, avatar_url)
        `)
        .eq('post_id', post.id);

      if (error) throw error;
      setLikesUsers((data || []) as unknown as LikeWithProfile[]);
      setModalPost(post);
      setShowLikesModal(true);
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  const handleShowComments = async (post: PostWithProfile) => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          profiles: user_id (username, full_name, avatar_url)
        `)
        .eq('post_id', post.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCommentsData((data || []) as unknown as CommentWithProfile[]);
      setModalPost(post);
      setShowCommentsModal(true);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const closeModals = () => {
    setShowLikesModal(false);
    setShowCommentsModal(false);
    setModalPost(null);
    setLikesUsers([]);
    setCommentsData([]);
  };

  const filteredPosts = posts.filter(post =>
    post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.profiles?.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="content-section">
        <div className="loading-spinner"></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="content-section">
      <div className="section-header">
        <h1>Post Management</h1>
        <p>Manage blog posts and content</p>
      </div>

      <div className="management-controls">
        <div className="search-container">
          <button
            className="search-toggle-btn"
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            aria-label="Toggle search"
          >
            <Search size={20} />
          </button>
          <input
            type="text"
            placeholder="Search posts by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`search-input ${isSearchExpanded ? 'expanded' : ''}`}
          />
          {searchTerm && (
            <button
              className="clear-search-btn"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <div className="stats-summary">
          <span>Total Posts: {posts.length}</span>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="data-table-container desktop-table">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Author</th>
              <th>Created</th>
              <th>Likes</th>
              <th>Comments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td className="post-description">
                  {post.content ? post.content.substring(0, 50) + (post.content.length > 50 ? '...' : '') : 'No description'}
                </td>
                <td>{post.profiles?.username || 'Unknown'}</td>
                <td>{new Date(post.created_at).toLocaleDateString()}</td>
                <td>
                  <button
                    className="stat-link"
                    onClick={() => handleShowLikes(post)}
                  >
                    {post.likes || 0} likes
                  </button>
                </td>
                <td>
                  <button
                    className="stat-link"
                    onClick={() => handleShowComments(post)}
                  >
                    {post.comments || 0} comments
                  </button>
                </td>
                <td>
                  <button
                    className="action-btn edit"
                    onClick={() => handleEditPost(post)}
                  >
                    Edit
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => deletePost(post.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="mobile-cards-view">
        {filteredPosts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-card-header">
              <h3 className="post-card-title">{post.title}</h3>
              <div className="post-card-meta">
                <span className="post-author">{post.profiles?.username || 'Unknown'}</span>
                <span className="post-date">{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="post-card-content">
              <p className="post-description">
                {post.content ? post.content.substring(0, 100) + (post.content.length > 100 ? '...' : '') : 'No description'}
              </p>
            </div>

            <div className="post-card-stats">
              <div className="stat-item">
                <span className="stat-icon">❤️</span>
                <button
                  className="stat-link-mobile"
                  onClick={() => handleShowLikes(post)}
                >
                  {post.likes || 0} likes
                </button>
              </div>
              <div className="stat-item">
                <span className="stat-icon">💬</span>
                <button
                  className="stat-link-mobile"
                  onClick={() => handleShowComments(post)}
                >
                  {post.comments || 0} comments
                </button>
              </div>
            </div>

            <div className="post-card-actions">
              <button
                className="action-btn edit"
                onClick={() => handleEditPost(post)}
              >
                Edit
              </button>
              <button
                className="action-btn delete"
                onClick={() => deletePost(post.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Post Modal */}
      {showEditModal && editingPost && (
        <EditPostModal
          post={editingPost}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}

      {/* Likes Modal */}
      {showLikesModal && modalPost && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content likes-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Likes for "{modalPost.title}"</h2>
              <button className="close-btn" onClick={closeModals}>×</button>
            </div>
            <div className="modal-body">
              {likesUsers.length === 0 ? (
                <p className="no-data">No likes yet</p>
              ) : (
                <div className="likes-list">
                  {likesUsers.map((like, index) => (
                    <div key={index} className="like-item">
                      <div className="user-avatar">
                        {like.profiles?.avatar_url ? (
                          <img src={like.profiles.avatar_url} alt={like.profiles.username} />
                        ) : (
                          <div className="default-avatar">👤</div>
                        )}
                      </div>
                      <div className="user-info">
                        <span className="username">
                          {like.profiles?.full_name || like.profiles?.username || 'Anonymous'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Comments Modal */}
      {showCommentsModal && modalPost && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content comments-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Comments for "{modalPost.title}"</h2>
              <button className="close-btn" onClick={closeModals}>×</button>
            </div>
            <div className="modal-body">
              {commentsData.length === 0 ? (
                <p className="no-data">No comments yet</p>
              ) : (
                <div className="comments-list">
                  {commentsData.map((comment) => (
                    <div key={comment.id} className="comment-item">
                      <div className="user-avatar">
                        {comment.profiles?.avatar_url ? (
                          <img src={comment.profiles.avatar_url} alt={comment.profiles.username} />
                        ) : (
                          <div className="default-avatar">👤</div>
                        )}
                      </div>
                      <div className="comment-content">
                        <div className="comment-header">
                          <span className="username">
                            {comment.profiles?.full_name || comment.profiles?.username || 'Anonymous'}
                          </span>
                          <span className="comment-date">
                            {new Date(comment.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="comment-text">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Edit Post Modal Component
const EditPostModal: React.FC<{
  post: PostWithProfile;
  onSave: (post: PostWithProfile) => void;
  onCancel: () => void;
}> = ({ post, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: post.title || '',
    content: post.content,
    images: post.image_url ? JSON.parse(post.image_url) : [],
    video_url: post.video_url || '',
    tags: post.tags || [],
    category: post.category || ''
  });
  const [tagInput, setTagInput] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addImageUrl = () => {
    if (imageUrlInput.trim() && formData.images.length < 4) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageUrlInput.trim()]
      }));
      setImageUrlInput('');
    } else if (formData.images.length >= 4) {
      alert('Maximum 4 images allowed');
    }
  };

  const addVideoUrl = () => {
    if (videoUrlInput.trim()) {
      setFormData(prev => ({
        ...prev,
        video_url: videoUrlInput.trim()
      }));
      setVideoUrlInput('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedPost: PostWithProfile = {
        ...post,
        title: formData.title,
        content: formData.content,
        image_url: formData.images.length > 0 ? JSON.stringify(formData.images) : undefined,
        video_url: formData.video_url || undefined,
        tags: formData.tags,
        category: formData.category
      };

      onSave(updatedPost);
    } catch (error) {
      console.error('Error preparing post update:', error);
      alert('Failed to prepare post update');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content edit-post-modal">
        <div className="modal-header">
          <h2>Edit Post</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="edit-post-form">
          <div className="form-grid">
            <div className="form-section">
              <div className="form-group">
                <label htmlFor="edit-title">Post Title</label>
                <input
                  type="text"
                  id="edit-title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter an engaging title..."
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-content">Content</label>
                <textarea
                  id="edit-content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Write your post content here..."
                  required
                  rows={8}
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-category">Category</label>
                <select
                  id="edit-category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                >
                  <option value="">Select a category</option>
                  <option value="architectural design">Architectural Design</option>
                  <option value="construction">Construction</option>
                  <option value="interior design">Interior Design</option>
                </select>
              </div>

              <div className="form-group">
                <label>Tags</label>
                <div className="tag-input-group">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag..."
                    className="form-input"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <button type="button" onClick={addTag} className="add-tag-btn">
                    <Plus size={16} />
                    Add
                  </button>
                </div>
                <div className="tags-display">
                  {formData.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      <Tag size={12} />
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="remove-tag">
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-group">
                <label>Media URLs</label>

                <div className="media-upload-section">
                  <div className="upload-group">
                    <label className="upload-label">
                      <Image size={20} />
                      Image URLs ({formData.images.length}/4)
                    </label>
                    <div className="url-input-group">
                      <input
                        type="url"
                        value={imageUrlInput}
                        onChange={(e) => setImageUrlInput(e.target.value)}
                        placeholder="Enter image URL..."
                        className="form-input"
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addImageUrl())}
                      />
                      <button type="button" onClick={addImageUrl} className="add-url-btn">
                        Add Image
                      </button>
                    </div>
                    {formData.images.map((image: string, index: number) => (
                      <div key={index} className="media-preview">
                        <img
                          src={image}
                          alt={`Preview ${index + 1}`}
                          className="preview-image"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.add('error');
                          }}
                          onLoad={(e) => {
                            e.currentTarget.style.display = 'block';
                          }}
                        />
                        <div className="image-error" style={{ display: 'none' }}>
                          Failed to load image
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            images: prev.images.filter((_: string, i: number) => i !== index)
                          }))}
                          className="remove-media"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="upload-group">
                    <label className="upload-label">
                      <Video size={20} />
                      Video URL
                    </label>
                    <div className="url-input-group">
                      <input
                        type="url"
                        value={videoUrlInput}
                        onChange={(e) => setVideoUrlInput(e.target.value)}
                        placeholder="Enter video URL..."
                        className="form-input"
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addVideoUrl())}
                      />
                      <button type="button" onClick={addVideoUrl} className="add-url-btn">
                        Add Video
                      </button>
                    </div>
                    {formData.video_url && (
                      <div className="media-preview">
                        <video src={formData.video_url} className="preview-video" controls />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, video_url: '' }))}
                          className="remove-media"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <div className="loading-spinner small"></div>
                  Updating Post...
                </>
              ) : (
                <>
                  <Upload size={16} />
                  Update Post
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AnalyticsContent: React.FC = () => (
  <div className="content-section">
    <h1>Analytics</h1>
    <p>Analytics content coming soon...</p>
  </div>
);

const SettingsContent: React.FC = () => (
  <div className="content-section">
    <h1>Settings</h1>
    <p>Settings content coming soon...</p>
  </div>
);

export default AdminPage;