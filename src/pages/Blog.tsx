
import { mockBlogArticles } from '../data';
import Post from '../components/blog/Post';
import Stories from '../components/blog/Stories';
import '../styles/pages/blog.css';

const Blog = () => {
  const handleLike = (articleId: string) => {
    // In a real app, this would update the backend
    console.log('Liked article:', articleId);
  };

  const handleComment = (articleId: string) => {
    // In a real app, this would open a comment modal or navigate to article detail
    console.log('Comment on article:', articleId);
  };

  const handleSignUp = () => {
    // In a real app, this would navigate to sign up page or open modal
    console.log('Sign Up clicked');
  };

  const handleLogin = () => {
    // In a real app, this would navigate to login page or open modal
    console.log('Login clicked');
  };

  const handleGoogleSignIn = () => {
    // In a real app, this would trigger Google OAuth
    console.log('Google Sign In clicked');
  };

  return (
    <div className="blog-container">
      {/* User Account Avatar */}
      <Stories
        userAvatar="https://res.cloudinary.com/dpzndrhse/image/upload/v1750667823/795d537546404a15a5edb74793570ebe_lvhdqb.jpg"
        onSignUp={handleSignUp}
        onLogin={handleLogin}
        onGoogleSignIn={handleGoogleSignIn}
      />

      {/* Posts Grid */}
      <div className="posts-grid">
        {mockBlogArticles.map((article) => (
          <Post
            key={article.id}
            article={article}
            onLike={handleLike}
            onComment={handleComment}
          />
        ))}
      </div>
    </div>
  );
};

export default Blog;