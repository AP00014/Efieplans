
import { mockBlogArticles } from '../data';
import Post from '../components/blog/Post';
import Stories from '../components/blog/Stories';
import '../styles/pages/blog.css';

const Blog = () => {
  // Mock stories data - in a real app, this would come from an API
  const stories = [
    {
      id: '1',
      username: 'efie_architect',
      avatar: 'https://res.cloudinary.com/dpzndrhse/image/upload/v1750667823/795d537546404a15a5edb74793570ebe_lvhdqb.jpg'
    },
    {
      id: '2',
      username: 'design_guru',
      avatar: 'https://res.cloudinary.com/dpzndrhse/image/upload/v1750628589/Afari_s_final_lrcjvr.jpg'
    },
    {
      id: '3',
      username: 'luxury_living',
      avatar: 'https://res.cloudinary.com/dpzndrhse/image/upload/v1750629085/c2_z8gijk.jpg'
    },
    {
      id: '4',
      username: 'urban_planner',
      avatar: 'https://res.cloudinary.com/dpzndrhse/image/upload/v1750631768/birdview_mdavmx.jpg'
    },
    {
      id: '5',
      username: 'green_build',
      avatar: 'https://res.cloudinary.com/dpzndrhse/image/upload/v1750631103/b_kp9qn6.jpg'
    }
  ];

  const handleLike = (articleId: string) => {
    // In a real app, this would update the backend
    console.log('Liked article:', articleId);
  };

  const handleComment = (articleId: string) => {
    // In a real app, this would open a comment modal or navigate to article detail
    console.log('Comment on article:', articleId);
  };

  const handleStoryClick = (storyId: string) => {
    // In a real app, this would open the story viewer
    console.log('Clicked story:', storyId);
  };

  return (
    <div className="blog-container">
      {/* Stories Bar */}
      <Stories stories={stories} onStoryClick={handleStoryClick} />

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