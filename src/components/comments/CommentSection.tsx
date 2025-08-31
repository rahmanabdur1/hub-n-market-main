import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { MessageCircle, Send, Heart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Comment {
  id: number;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  timeAgo: string;
  likes: number;
  isLiked: boolean;
}

interface CommentSectionProps {
  postId: number;
  comments: Comment[];
  isOpen: boolean;
  onToggle: () => void;
}

const CommentSection = ({ postId: _postId, comments: initialComments, isOpen, onToggle }: CommentSectionProps) => {
  const { user, isAuthenticated } = useAuth();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim() || !isAuthenticated) return;
    
    const comment: Comment = {
      id: Date.now(),
      user: {
        name: user?.name || '',
        username: user?.email || '',
        avatar: user?.avatar || ''
      },
      content: newComment,
      timeAgo: 'Just now',
      likes: 0,
      isLiked: false
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
    
    toast({
      title: "Comment added!",
      description: "Your comment has been posted.",
    });
  };

  const handleLikeComment = (commentId: number) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            isLiked: !comment.isLiked, 
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1 
          }
        : comment
    ));
  };

  return (
    <div className="space-y-4">
      {/* Comment Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center space-x-2 text-muted-foreground"
        onClick={onToggle}
      >
        <MessageCircle className="h-4 w-4" />
        <span>{comments.length} comments</span>
      </Button>

      {/* Comments Section */}
      {isOpen && (
        <Card>
          <CardContent className="p-4 space-y-4">
            {/* Add Comment */}
            {isAuthenticated && (
              <div className="flex space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                    {user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <Input
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                  />
                  <Button 
                    size="sm" 
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                  >
                    <Send className="h-4 w-4 mr-1" />
                    Comment
                  </Button>
                </div>
              </div>
            )}

            {!isAuthenticated && (
              <div className="text-center py-4 text-muted-foreground">
                <p>Please log in to comment</p>
              </div>
            )}

            <Separator />

            {/* Comments List */}
            <div className="space-y-4">
              {comments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No comments yet. Be the first to comment!</p>
                </div>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                        {comment.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-sm">{comment.user.name}</p>
                          <p className="text-xs text-muted-foreground">@{comment.user.username}</p>
                          <span className="text-xs text-muted-foreground">•</span>
                          <p className="text-xs text-muted-foreground">{comment.timeAgo}</p>
                        </div>
                        <p className="text-sm mt-1">{comment.content}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`flex items-center space-x-1 h-6 px-2 ${comment.isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
                        onClick={() => handleLikeComment(comment.id)}
                      >
                        <Heart className={`h-3 w-3 ${comment.isLiked ? 'fill-current' : ''}`} />
                        {comment.likes > 0 && <span className="text-xs">{comment.likes}</span>}
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CommentSection;