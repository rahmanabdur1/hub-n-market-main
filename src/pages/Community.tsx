import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import CommentSection from '@/components/comments/CommentSection';
import { Heart, Share2, Image as ImageIcon, MapPin } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { apiFetch } from '@/lib/api';

const Community = () => {
  const { user, isAuthenticated } = useAuth();
  const [newPost, setNewPost] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [openComments, setOpenComments] = useState<number | null>(null);

  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await apiFetch<any[]>('/posts');
        setPosts(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const handleCreatePost = async () => {
    if (!newPost.trim()) return;
    try {
      await apiFetch('/posts', { method: 'POST', body: { caption: newPost } });
      const data = await apiFetch<any[]>('/posts');
      setPosts(data);
      setNewPost('');
      setShowCreatePost(false);
      toast({ title: 'Post created!', description: 'Your post has been shared.' });
    } catch (e) {
      console.error(e);
    }
  };

  const handleLike = (postId: number) => {
    toast({
      title: "Post liked!",
      description: "Your reaction has been added.",
    });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Community Feed</h1>
          <p className="text-muted-foreground">Connect with neighbors and share your experiences</p>
        </div>

        {/* Create Post */}
        {isAuthenticated && (
          <Card className="mb-8">
            <CardContent className="p-6">
              {!showCreatePost ? (
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                      {user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    variant="outline" 
                    className="flex-1 justify-start text-muted-foreground"
                    onClick={() => setShowCreatePost(true)}
                  >
                    What's happening in your community?
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                        {user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{user?.name}</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  
                  <Textarea
                    placeholder="Share what's happening in your community..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="min-h-[100px]"
                  />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Photo
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        Location
                      </Button>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="ghost" onClick={() => setShowCreatePost(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreatePost} disabled={!newPost.trim()}>
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post: any) => (
            <Card key={post._id} className="hover-lift">
              <CardContent className="p-6">
                {/* Post Header */}
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar>
                    <AvatarImage src={''} alt={''} />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                      {String(post.authorId).slice(-1)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold">User {String(post.authorId).slice(-6)}</p>
                      <p className="text-sm text-muted-foreground">•</p>
                      <span className="text-muted-foreground">•</span>
                      <p className="text-sm text-muted-foreground">{new Date(post.createdAt).toLocaleString()}</p>
                    </div>
                    {post.locationText && (
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {post.locationText}
                      </div>
                    )}
                  </div>
                </div>

                {/* Post Content */}
                <p className="mb-4 text-foreground leading-relaxed">{post.caption}</p>

                {/* Post Image */}
                {post.imageUrl && (
                  <div className="mb-4">
                    <img 
                      src={post.imageUrl}
                      alt="Post content"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex space-x-6">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`flex items-center space-x-2 ${post.isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span>{post.likes}</span>
                    </Button>
                    
                    <CommentSection
                      postId={post.id}
                      comments={post.commentsList}
                      isOpen={openComments === post.id}
                      onToggle={() => setOpenComments(openComments === post.id ? null : post.id)}
                    />
                    
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-muted-foreground">
                      <Share2 className="h-4 w-4" />
                      <span>{post.shares}</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline">
            Load More Posts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Community;