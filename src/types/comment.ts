// types/comment.ts
export interface Comment {
  id: number;
  authorId?: string | number;   // optional if needed
  content: string;
  createdAt?: string;           // optional if needed
  timeAgo: string;
  likes: number;
  isLiked: boolean;
  user: {
    name: string;
    username?: string;  // optional if API doesn't always return it
    avatar?: string;
  };
}
