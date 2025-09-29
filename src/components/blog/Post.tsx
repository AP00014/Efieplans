import React, { useState } from 'react';
import type { Article } from '../../types';

interface PostProps {
  article: Article;
  onLike?: (articleId: string) => void;
  onComment?: (articleId: string) => void;
}

const Post: React.FC<PostProps> = ({ article, onLike, onComment }) => {
  const [isLiked, setIsLiked] = useState(article.is_liked || false);
  const [likesCount, setLikesCount] = useState(article.likes_count || 0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike?.(article.id);
  };

  const handleComment = () => {
    onComment?.(article.id);
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'now';
    if (diffInHours < 24) return `${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d`;
    return date.toLocaleDateString();
  };

  return (
    <div className="post-card">
      {/* Post Header */}
      <div className="post-header">
        <img
          src={article.author?.avatar_url || '/images/avatars/default.jpg'}
          alt={article.author?.username || 'User'}
          className="post-avatar"
        />
        <div className="post-user-info">
          <p className="post-username">{article.author?.username || 'Anonymous'}</p>
          {article.category && (
            <p className="post-location">{article.category}</p>
          )}
        </div>
        <button className="post-menu">⋯</button>
      </div>

      {/* Post Image */}
      {article.image_url && (
        <img
          src={article.image_url}
          alt={article.title}
          className="post-image"
        />
      )}

      {/* Post Actions */}
      <div className="post-actions">
        <button
          className={`action-button ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
          aria-label={isLiked ? 'Unlike' : 'Like'}
        >
          {isLiked ? '❤️' : '🤍'}
        </button>
        <button
          className="action-button"
          onClick={handleComment}
          aria-label="Comment"
        >
          💬
        </button>
        <button className="action-button" aria-label="Share">
          ➤
        </button>
      </div>

      {/* Likes Count */}
      {likesCount > 0 && (
        <p className="post-likes">{likesCount.toLocaleString()} likes</p>
      )}

      {/* Caption */}
      <div className="post-caption">
        <span className="username">{article.author?.username || 'Anonymous'}</span>{' '}
        {article.excerpt || article.title}
      </div>

      {/* Comments */}
      {article.comments_count && article.comments_count > 0 && (
        <p className="post-comments">
          View all {article.comments_count} comments
        </p>
      )}

      {/* Time */}
      <p className="post-time">
        {article.published_at ? formatTimeAgo(article.published_at) : 'Recently'}
      </p>
    </div>
  );
};

export default Post;