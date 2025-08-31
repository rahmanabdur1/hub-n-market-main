import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Star, Flag, ThumbsUp, MessageCircle } from 'lucide-react';

interface Review {
  id: number;
  bookingId: number;
  reviewer: {
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  listing: string;
  date: string;
  helpful: number;
  response?: {
    author: string;
    content: string;
    date: string;
  };
}

const Reviews = () => {
  const { user } = useAuth();
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  // Mock data for reviews
  const receivedReviews: Review[] = [
    {
      id: 1,
      bookingId: 101,
      reviewer: {
        name: 'Sarah Wilson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
      },
      rating: 5,
      comment: 'Amazing photography session! Very professional and creative. The photos turned out exactly as I imagined.',
      listing: 'Professional Photography Services',
      date: '2 days ago',
      helpful: 12,
      response: {
        author: 'Demo User',
        content: 'Thank you so much Sarah! It was a pleasure working with you.',
        date: '1 day ago'
      }
    },
    {
      id: 2,
      bookingId: 102,
      reviewer: {
        name: 'Mike Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike'
      },
      rating: 4,
      comment: 'Great camera equipment and smooth rental process. Equipment was in excellent condition.',
      listing: 'Camera Equipment Rental',
      date: '1 week ago',
      helpful: 8
    }
  ];

  const givenReviews: Review[] = [
    {
      id: 3,
      bookingId: 103,
      reviewer: {
        name: 'Demo User',
        avatar: user?.avatar || ''
      },
      rating: 5,
      comment: 'Excellent service! The yoga instructor was very knowledgeable and patient.',
      listing: 'Private Yoga Sessions',
      date: '3 days ago',
      helpful: 5
    }
  ];

  const pendingReviews = [
    {
      id: 104,
      listing: 'Art Workshop',
      vendor: 'Emily Davis',
      completedDate: '2 days ago',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=150&fit=crop'
    }
  ];

  const renderStars = (rating: number, onRate?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 cursor-pointer transition-colors ${
              star <= rating 
                ? 'fill-warning text-warning' 
                : 'text-muted-foreground hover:text-warning'
            }`}
            onClick={() => onRate && onRate(star)}
          />
        ))}
      </div>
    );
  };

  const handleSubmitReview = (bookingId: number) => {
    if (selectedRating === 0 || !reviewText.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both rating and review comment.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Review Submitted",
      description: "Thank you for your review! It helps improve our community.",
    });

    setSelectedRating(0);
    setReviewText('');
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Reviews & Ratings</h1>
          <p className="text-muted-foreground">Manage your reviews and feedback</p>
        </div>

        <Tabs defaultValue="received" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="received">Received Reviews</TabsTrigger>
            <TabsTrigger value="given">Given Reviews</TabsTrigger>
            <TabsTrigger value="pending">Pending Reviews</TabsTrigger>
          </TabsList>

          {/* Received Reviews */}
          <TabsContent value="received">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Reviews About You</CardTitle>
                  <CardDescription>See what customers are saying about your services</CardDescription>
                </CardHeader>
              </Card>

              {receivedReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={review.reviewer.avatar} alt={review.reviewer.name} />
                          <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                            {review.reviewer.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{review.reviewer.name}</p>
                          <p className="text-sm text-muted-foreground">{review.listing}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {renderStars(review.rating)}
                        <p className="text-sm text-muted-foreground mt-1">{review.date}</p>
                      </div>
                    </div>

                    <p className="text-sm mb-4">{review.comment}</p>

                    {review.response && (
                      <div className="bg-accent p-4 rounded-lg mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={user?.avatar} alt={review.response.author} />
                            <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">
                              {review.response.author.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <p className="text-sm font-medium">{review.response.author}</p>
                          <span className="text-xs text-muted-foreground">{review.response.date}</span>
                        </div>
                        <p className="text-sm">{review.response.content}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {review.helpful} helpful
                        </Button>
                        {!review.response && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Respond
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Respond to Review</DialogTitle>
                                <DialogDescription>
                                  Respond to {review.reviewer.name}'s review
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <Textarea
                                  placeholder="Write your response..."
                                  rows={4}
                                />
                                <Button className="w-full">
                                  Send Response
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                      <Button variant="ghost" size="sm">
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Given Reviews */}
          <TabsContent value="given">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Reviews You've Given</CardTitle>
                  <CardDescription>Your feedback about services you've used</CardDescription>
                </CardHeader>
              </Card>

              {givenReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-medium">{review.listing}</p>
                        <p className="text-sm text-muted-foreground">Booking #{review.bookingId}</p>
                      </div>
                      <div className="text-right">
                        {renderStars(review.rating)}
                        <p className="text-sm text-muted-foreground mt-1">{review.date}</p>
                      </div>
                    </div>
                    <p className="text-sm">{review.comment}</p>
                    <div className="flex items-center justify-between mt-4">
                      <Badge variant="outline">{review.helpful} found helpful</Badge>
                      <Button variant="ghost" size="sm">
                        Edit Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Pending Reviews */}
          <TabsContent value="pending">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Reviews</CardTitle>
                  <CardDescription>Services you've completed but haven't reviewed yet</CardDescription>
                </CardHeader>
              </Card>

              {pendingReviews.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={booking.image} 
                        alt={booking.listing}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{booking.listing}</h3>
                        <p className="text-sm text-muted-foreground">by {booking.vendor}</p>
                        <p className="text-sm text-muted-foreground">Completed {booking.completedDate}</p>
                        
                        <div className="mt-4 space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Rate your experience</label>
                            {renderStars(selectedRating, setSelectedRating)}
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium mb-2 block">Write a review</label>
                            <Textarea
                              placeholder="Share your experience..."
                              value={reviewText}
                              onChange={(e) => setReviewText(e.target.value)}
                              rows={3}
                            />
                          </div>
                          
                          <Button 
                            onClick={() => handleSubmitReview(booking.id)}
                            disabled={selectedRating === 0 || !reviewText.trim()}
                          >
                            Submit Review
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {pendingReviews.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <Star className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                    <h3 className="font-medium mb-2">No pending reviews</h3>
                    <p className="text-sm text-muted-foreground">You're all caught up with your reviews!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reviews;