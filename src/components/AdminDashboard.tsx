import React, { useState } from 'react';
import { Users, Shield } from 'lucide-react';
import type { Post } from '../types/index';
import './AdminDashboard.css';

interface UserStats {
  total_users: number;
  admin_count: number;
  user_count: number;
}

const AdminDashboard: React.FC = () => {
  const [userStats] = useState<UserStats>({
    total_users: 10,
    admin_count: 2,
    user_count: 8,
  });

  const [posts, setPosts] = useState<Post[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: [''],
    videos: [''],
    categories: [] as string[]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      categories: checked
        ? [...prev.categories, category]
        : prev.categories.filter(c => c !== category)
    }));
  };

  const addImage = () => {
    setFormData(prev => ({ ...prev, images: [...prev.images, ''] }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const updateImage = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }));
  };

  const addVideo = () => {
    setFormData(prev => ({ ...prev, videos: [...prev.videos, ''] }));
  };

  const removeVideo = (index: number) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index)
    }));
  };

  const updateVideo = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.map((vid, i) => i === index ? value : vid)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: Post = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      images: formData.images.filter(img => img.trim() !== ''),
      videos: formData.videos.filter(vid => vid.trim() !== ''),
      categories: formData.categories,
      likes: 0,
      comments: []
    };
    setPosts(prev => [...prev, newPost]);
    setFormData({
      title: '',
      description: '',
      images: [''],
      videos: [''],
      categories: []
    });
  };

  const mockUsers = [
    {
      id: '1',
      username: 'admin',
      full_name: 'Admin User',
      avatar_url: '/images/avatars/admin.jpg',
      is_admin: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      username: 'user1',
      full_name: 'Regular User',
      avatar_url: '/images/avatars/user.jpg',
      is_admin: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage your blog platform and users</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Users</h3>
            <p className="stat-value">{userStats.total_users}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Shield size={24} />
          </div>
          <div className="stat-content">
            <h3>Admins</h3>
            <p className="stat-value">{userStats.admin_count}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>Regular Users</h3>
            <p className="stat-value">{userStats.user_count}</p>
          </div>
        </div>
      </div>

      <div className="admin-section">
        <h2>User Management</h2>
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.full_name}</td>
                  <td>{user.username}</td>
                  <td>{user.is_admin ? 'Admin' : 'User'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="admin-section">
        <h2>Content Management</h2>
        <form onSubmit={handleSubmit} className="content-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Images (URLs)</label>
            {formData.images.map((image, index) => (
              <div key={index} className="input-group">
                <input
                  type="url"
                  value={image}
                  onChange={(e) => updateImage(index, e.target.value)}
                  placeholder="Image URL"
                />
                {formData.images.length > 1 && (
                  <button type="button" onClick={() => removeImage(index)}>Remove</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addImage}>Add Image</button>
          </div>
          <div className="form-group">
            <label>Videos (URLs)</label>
            {formData.videos.map((video, index) => (
              <div key={index} className="input-group">
                <input
                  type="url"
                  value={video}
                  onChange={(e) => updateVideo(index, e.target.value)}
                  placeholder="Video URL"
                />
                {formData.videos.length > 1 && (
                  <button type="button" onClick={() => removeVideo(index)}>Remove</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addVideo}>Add Video</button>
          </div>
          <div className="form-group">
            <label>Categories</label>
            {['Architecture', 'Interior Design', 'Construction'].map(category => (
              <label key={category} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.categories.includes(category)}
                  onChange={(e) => handleCategoryChange(category, e.target.checked)}
                />
                {category}
              </label>
            ))}
          </div>
          <button type="submit">Create Post</button>
        </form>
        {posts.length > 0 && (
          <div className="posts-list">
            <h3>Created Posts</h3>
            {posts.map(post => (
              <div key={post.id} className="post-item">
                <h4>{post.title}</h4>
                <p>{post.description}</p>
                <p>Categories: {post.categories.join(', ')}</p>
                {post.images.length > 0 && <p>Images: {post.images.length}</p>}
                {post.videos.length > 0 && <p>Videos: {post.videos.length}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;