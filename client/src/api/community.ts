import api from './api';

export type Post = {
  _id: string;
  username: string;
  avatar: string;
  content: string;
  likes: number;
  comments: number;
  createdAt: string;
  type: 'recipe' | 'tip' | 'achievement';
  images?: string[];
};

// Description: Get community posts
// Endpoint: GET /api/community/posts
// Request: {}
// Response: { posts: Post[] }
export const getPosts = () => {
  return new Promise<{ posts: Post[] }>((resolve) => {
    setTimeout(() => {
      resolve({
        posts: [
          {
            _id: '1',
            username: 'GreenChef',
            avatar: '👩‍🍳',
            content: 'Made an amazing zero-waste meal with leftover vegetables!',
            likes: 24,
            comments: 5,
            createdAt: '2024-03-28T10:00:00Z',
            type: 'recipe',
            images: ['/mock/recipe1.jpg']
          },
          {
            _id: '2',
            username: 'EcoWarrior',
            avatar: '🌱',
            content: 'Tip: Store herbs in water to make them last longer!',
            likes: 15,
            comments: 3,
            createdAt: '2024-03-28T09:00:00Z',
            type: 'tip'
          }
        ]
      });
    }, 500);
  });
};

// Description: Create a new post
// Endpoint: POST /api/community/posts
// Request: { content: string, type: string, images?: string[] }
// Response: { post: Post }
export const createPost = (data: { content: string; type: string; images?: string[] }) => {
  return new Promise<{ post: Post }>((resolve) => {
    setTimeout(() => {
      resolve({
        post: {
          _id: Math.random().toString(),
          username: 'CurrentUser',
          avatar: '🧑',
          content: data.content,
          likes: 0,
          comments: 0,
          createdAt: new Date().toISOString(),
          type: data.type as 'recipe' | 'tip' | 'achievement',
          images: data.images
        }
      });
    }, 500);
  });
};