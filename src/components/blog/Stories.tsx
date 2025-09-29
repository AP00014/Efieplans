import React from 'react';

interface Story {
  id: string;
  username: string;
  avatar: string;
  hasNewStory?: boolean;
}

interface StoriesProps {
  stories: Story[];
  onStoryClick?: (storyId: string) => void;
}

const Stories: React.FC<StoriesProps> = ({ stories, onStoryClick }) => {
  return (
    <div className="stories-bar">
      {stories.map((story) => (
        <div
          key={story.id}
          className="story-item"
          onClick={() => onStoryClick?.(story.id)}
        >
          <div className="story-avatar">
            <img src={story.avatar} alt={story.username} />
          </div>
          <span className="story-username">{story.username}</span>
        </div>
      ))}
    </div>
  );
};

export default Stories;