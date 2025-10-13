import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import { supabase } from '../lib/supabase';
import type { SupabasePost, Profile, SupabaseComment } from '../types/index';
import {
  Heart,
  MessageCircle,
  Share2,
  ChevronLeft,
  ChevronRight,
  User,
  Clock
} from 'lucide-react';
import './BlogPage.css';

interface PostWithMeta extends SupabasePost {
  author: Profile | null;
  likesCount: number;
  commentsCount: number;
  userLiked: boolean;
}

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<PostWithMeta[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setCurrentUser(profile);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts with author info
        const { data: postsData, error: postsError } = await supabase
          .from('posts')
          .select(`
            *,
            profiles: user_id (id, username, full_name, avatar_url)
          `)
          .order('created_at', { ascending: false })
          .limit(20); // Limit initial load to 20 posts

        if (postsError) throw postsError;

        // Get current user for like status
        const { data: { user } } = await supabase.auth.getUser();

        // Fetch likes and comments counts for each post in parallel
        const postsWithMeta = await Promise.all(
          (postsData || []).map(async (post) => {
            const [likesResult, commentsResult, likeStatus] = await Promise.all([
              supabase
                .from('likes')
                .select('*', { count: 'exact', head: true })
                .eq('post_id', post.id),
              supabase
                .from('comments')
                .select('*', { count: 'exact', head: true })
                .eq('post_id', post.id),
              user ? supabase
                .from('likes')
                .select('id')
                .eq('post_id', post.id)
                .eq('user_id', user.id)
                .maybeSingle() : Promise.resolve({ data: null })
            ]);

            return {
              ...post,
              author: post.profiles || null,
              likesCount: likesResult.count || 0,
              commentsCount: commentsResult.count || 0,
              userLiked: !!likeStatus.data
            };
          })
        );

        setPosts(postsWithMeta);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
const filteredPosts = selectedCategories.length === 0 ? posts : posts.filter(post => post.tags?.some((tag: string) => selectedCategories.includes(tag)));


const handleLike = async (postId: string) => {
  if (!currentUser) {
    alert('Please log in to like posts');
    return;
  }

    try {
      const { data: existingLike } = await supabase
        .from('likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', currentUser.id)
        .maybeSingle();

      if (existingLike) {
        // Unlike
        await supabase
          .from('likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', currentUser.id);

        setPosts(prev => prev.map(p =>
          p.id === postId
            ? { ...p, likesCount: p.likesCount - 1, userLiked: false }
            : p
        ));
      } else {
        // Like
        await supabase
          .from('likes')
          .insert({ post_id: postId, user_id: currentUser.id });

        setPosts(prev => prev.map(p =>
          p.id === postId
            ? { ...p, likesCount: p.likesCount + 1, userLiked: true }
            : p
        ));
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleShare = async (post: PostWithMeta) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.content.substring(0, 100) + '...',
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="blog-page">
      <Header />

      <main className="post-content">
        <div className="container">
          <div className="filter-section">
            <button
              className="filter-toggle-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filter Posts
              <span className={`filter-arrow ${showFilters ? 'open' : ''}`}>▼</span>
            </button>

            {showFilters && (
              <div className="filter-dropdown">
                <button
                  className={selectedCategories.length === 0 ? 'active' : ''}
                  onClick={() => setSelectedCategories([])}
                >
                  All Posts
                </button>
                <button
                  className={selectedCategories.includes('architectural design') ? 'active' : ''}
                  onClick={() => {
                    if (selectedCategories.includes('architectural design')) {
                      setSelectedCategories(selectedCategories.filter(c => c !== 'architectural design'));
                    } else {
                      setSelectedCategories([...selectedCategories, 'architectural design']);
                    }
                  }}
                >
                  Architectural Design
                </button>
                <button
                  className={selectedCategories.includes('construction') ? 'active' : ''}
                  onClick={() => {
                    if (selectedCategories.includes('construction')) {
                      setSelectedCategories(selectedCategories.filter(c => c !== 'construction'));
                    } else {
                      setSelectedCategories([...selectedCategories, 'construction']);
                    }
                  }}
                >
                  Construction
                </button>
                <button
                  className={selectedCategories.includes('interior design') ? 'active' : ''}
                  onClick={() => {
                    if (selectedCategories.includes('interior design')) {
                      setSelectedCategories(selectedCategories.filter(c => c !== 'interior design'));
                    } else {
                      setSelectedCategories([...selectedCategories, 'interior design']);
                    }
                  }}
                >
                  Interior Design
                </button>
              </div>
            )}
          </div>

          <div className="posts-feed">
            {loading ? (
              <div className="loading-spinner"></div>
            ) : filteredPosts.length === 0 ? (
              <p className="no-posts">No posts available.</p>
            ) : (
              filteredPosts.map(post => (
                <FacebookPostCard
                  key={post.id}
                  post={post}
                  currentUser={currentUser}
                  onLike={handleLike}
                  onShare={handleShare}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// Facebook-style Post Card Component
const FacebookPostCard: React.FC<{
  post: PostWithMeta;
  currentUser: Profile | null;
  onLike: (postId: string) => void;
  onShare: (post: PostWithMeta) => void;
}> = ({ post, currentUser, onLike, onShare }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<(SupabaseComment & { profiles: Profile | null })[]>([]);
  const [commentText, setCommentText] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  // Parse image URLs from JSON string
  const imageUrls = post.image_url ? JSON.parse(post.image_url) : [];
  const hasMultipleImages = imageUrls.length > 1;

  const fetchComments = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          profiles: user_id (username, full_name, avatar_url)
        `)
        .eq('post_id', post.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }, [post.id]);

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments, fetchComments]);

  const handleAddComment = async () => {
    if (!currentUser || !commentText.trim()) return;

    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          post_id: post.id,
          user_id: currentUser.id,
          content: commentText.trim()
        });

      if (error) throw error;

      setCommentText('');
      fetchComments(); // Refresh comments
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
  };

  const openImageModal = (index: number = 0) => {
    setModalImageIndex(index);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
  };

  const nextModalImage = () => {
    setModalImageIndex((prev) => (prev + 1) % imageUrls.length);
  };

  const prevModalImage = () => {
    setModalImageIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
  };

  return (
    <article className="facebook-post-card">
      {/* Post Header */}
      <div className="post-header">
        <div className="author-info">
          <div className="author-avatar">
            {post.author?.avatar_url ? (
              <img src={post.author.avatar_url} alt={post.author.username} />
            ) : (
              <User size={32} />
            )}
          </div>
          <div className="author-details">
            <h3>{post.author?.full_name || post.author?.username || 'Anonymous'}</h3>
            <span className="post-time">
              <Clock size={14} />
              {new Date(post.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="post-content">
        {post.title && <h4 className="post-title">{post.title}</h4>}
        <p className="post-text">{post.content}</p>
      </div>

      {/* Media Section */}
      {imageUrls.length > 0 && (
        <div className="post-media">
          <div className="media-container">
            <img
              src={imageUrls[currentImageIndex]}
              alt={`Post media ${currentImageIndex + 1}`}
              className="post-media-image"
              onClick={() => openImageModal(currentImageIndex)}
              style={{ cursor: 'pointer' }}
            />

            {hasMultipleImages && (
              <>
                {/* Navigation Arrows */}
                <button className="media-nav prev" onClick={prevImage}>
                  <ChevronLeft size={24} />
                </button>
                <button className="media-nav next" onClick={nextImage}>
                  <ChevronRight size={24} />
                </button>

                {/* Image Indicators */}
                <div className="image-indicators">
                  {imageUrls.map((_: string, index: number) => (
                    <button
                      key={index}
                      className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>

                {/* Image Counter */}
                <div className="image-counter">
                  {currentImageIndex + 1} / {imageUrls.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Video Section */}
      {post.video_url && (
        <div className="post-media">
          <video
            src={post.video_url}
            controls
            className="post-media-video"
            poster={imageUrls.length > 0 ? imageUrls[0] : undefined}
          />
        </div>
      )}

      {/* Tags Section */}
      {post.tags && post.tags.length > 0 && (
        <div className="post-tags">
          {post.tags.map((tag: string, index: number) => (
            <span key={index} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Post Stats */}
      <div className="post-stats">
        <div className="stats-info">
          {post.likesCount > 0 && (
            <span className="likes-count">
              <Heart size={16} fill="currentColor" />
              {post.likesCount}
            </span>
          )}
          {currentUser && post.commentsCount > 0 && (
            <span className="comments-count" onClick={() => setShowComments(!showComments)}>
              {post.commentsCount} comments
            </span>
          )}
          {!currentUser && post.commentsCount > 0 && (
            <span className="comments-count disabled">
              {post.commentsCount} comments
            </span>
          )}
        </div>
      </div>

      {/* Post Actions */}
      <div className="post-actions">
        <button
          className={`action-btn like ${post.userLiked ? 'liked' : ''}`}
          onClick={() => onLike(post.id)}
        >
          <Heart size={18} fill={post.userLiked ? 'currentColor' : 'none'} />
          Like
        </button>
        {currentUser ? (
          <button
            className="action-btn comment"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle size={18} />
            Comment
          </button>
        ) : (
          <button
            className="action-btn comment disabled"
            onClick={() => alert('Please log in to view comments')}
          >
            <MessageCircle size={18} />
            Comment
          </button>
        )}
        <button
          className="action-btn share"
          onClick={() => onShare(post)}
        >
          <Share2 size={18} />
          Share
        </button>
      </div>

      {/* Comments Section */}
      {showComments && currentUser && (
        <div className="comments-section">
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-avatar">
                  {comment.profiles?.avatar_url ? (
                    <img src={comment.profiles.avatar_url} alt={comment.profiles.username} />
                  ) : (
                    <User size={24} />
                  )}
                </div>
                <div className="comment-content">
                  <div className="comment-bubble">
                    <strong>{comment.profiles?.full_name || comment.profiles?.username || 'Anonymous'}</strong>
                    <p>{comment.content}</p>
                  </div>
                  <span className="comment-time">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="add-comment">
            <div className="comment-avatar">
              {currentUser.avatar_url ? (
                <img src={currentUser.avatar_url} alt={currentUser.username} />
              ) : (
                <User size={24} />
              )}
            </div>
            <div className="comment-input-container">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
              />
              <button
                onClick={handleAddComment}
                disabled={!commentText.trim()}
                className="post-comment-btn"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="image-modal-overlay" onClick={closeImageModal}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeImageModal}>×</button>

            <div className="modal-image-container">
              <img
                src={imageUrls[modalImageIndex]}
                alt={`Modal image ${modalImageIndex + 1}`}
                className="modal-image"
              />

              {imageUrls.length > 1 && (
                <>
                  <button className="modal-nav prev" onClick={prevModalImage}>
                    ‹
                  </button>
                  <button className="modal-nav next" onClick={nextModalImage}>
                    ›
                  </button>

                  <div className="modal-indicators">
                    {imageUrls.map((_: string, index: number) => (
                      <button
                        key={index}
                        className={`modal-indicator ${index === modalImageIndex ? 'active' : ''}`}
                        onClick={() => setModalImageIndex(index)}
                      />
                    ))}
                  </div>

                  <div className="modal-counter">
                    {modalImageIndex + 1} / {imageUrls.length}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </article>
  );
};

export default BlogPage;