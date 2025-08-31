import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Users, Star, MessageCircle, Heart, Share2, Calendar, Filter } from 'lucide-react';

const CommunityDetails = () => {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState('listings');

  // Mock community data
  const community = {
    id: 1,
    name: "Photography Hub NYC",
    slug: "photography-nyc",
    description: "Professional photographers and enthusiasts in New York City. We offer equipment rentals, studio spaces, and expert photography services for all occasions.",
    location: "New York, NY",
    memberCount: 1250,
    listingCount: 89,
    categories: ["Photography", "Equipment Rental", "Studio Space", "Event Photography"],
    rating: 4.8,
    reviewCount: 342,
    image: "https://images.unsplash.com/photo-1554048612-b6a482b224b6?w=800&h=400&fit=crop",
    manager: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b044?w=100&h=100&fit=crop",
      role: "Community Manager"
    }
  };

  const featuredListings = [
    {
      id: 1,
      title: "Professional Photography Studio",
      price: "$85/hour",
      rating: 4.9,
      reviewCount: 45,
      vendor: "Mike Chen Photography",
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300&h=200&fit=crop",
      verified: true
    },
    {
      id: 2,
      title: "Wedding Photography Package",
      price: "$1,200/event",
      rating: 4.8,
      reviewCount: 89,
      vendor: "Emma Davis Studios",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300&h=200&fit=crop",
      verified: true
    },
    {
      id: 3,
      title: "Canon 5D Mark IV Rental",
      price: "$45/day",
      rating: 4.7,
      reviewCount: 23,
      vendor: "NYC Camera Rentals",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=200&fit=crop",
      verified: false
    }
  ];

  const topVendors = [
    {
      id: 1,
      name: "Mike Chen Photography",
      specialties: ["Portrait", "Wedding", "Commercial"],
      rating: 4.9,
      completedJobs: 156,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      verified: true
    },
    {
      id: 2,
      name: "Emma Davis Studios",
      specialties: ["Wedding", "Event", "Fashion"],
      rating: 4.8,
      completedJobs: 89,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b044?w=100&h=100&fit=crop",
      verified: true
    },
    {
      id: 3,
      name: "NYC Camera Rentals",
      specialties: ["Equipment", "Lighting", "Drone"],
      rating: 4.7,
      completedJobs: 234,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      verified: true
    }
  ];

  const recentPosts = [
    {
      id: 1,
      author: "Alex Rivera",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop",
      content: "Just finished an amazing rooftop photoshoot in Manhattan! The golden hour was perfect 📸✨",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      author: "Lisa Park",
      authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop",
      content: "Looking for a reliable makeup artist for upcoming wedding shoots. Any recommendations?",
      timestamp: "4 hours ago",
      likes: 12,
      comments: 15
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80">
        <img 
          src={community.image} 
          alt={community.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between">
              <div className="text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{community.name}</h1>
                <div className="flex items-center gap-4 text-white/80">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{community.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{community.memberCount.toLocaleString()} members</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    <span>{community.rating} ({community.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button variant="secondary" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Follow
                </Button>
                <Button variant="secondary" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Community Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>About This Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{community.description}</p>
                <div className="flex flex-wrap gap-2">
                  {community.categories.map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Community Manager</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={community.manager.avatar} alt={community.manager.name} />
                    <AvatarFallback>{community.manager.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{community.manager.name}</p>
                    <p className="text-sm text-muted-foreground">{community.manager.role}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Manager
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Listings</span>
                  <span className="font-medium">{community.listingCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Vendors</span>
                  <span className="font-medium">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">This Month</span>
                  <span className="font-medium">156 bookings</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          {/* Listings Tab */}
          <TabsContent value="listings" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Featured Listings</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button asChild size="sm">
                  <Link to="/listings">View All</Link>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden hover-scale">
                  <div className="relative">
                    <img 
                      src={listing.image} 
                      alt={listing.title}
                      className="w-full h-48 object-cover"
                    />
                    {listing.verified && (
                      <Badge className="absolute top-2 right-2 bg-success">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{listing.title}</CardTitle>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-semibold">{listing.price}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-warning mr-1" />
                        <span className="text-sm">{listing.rating} ({listing.reviewCount})</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">by {listing.vendor}</p>
                    <Button asChild className="w-full">
                      <Link to={`/listings/${listing.id}`}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Vendors Tab */}
          <TabsContent value="vendors" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Top Vendors</h3>
              <Button asChild size="sm">
                <Link to="/vendors">View All Vendors</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topVendors.map((vendor) => (
                <Card key={vendor.id} className="hover-scale">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={vendor.avatar} alt={vendor.name} />
                        <AvatarFallback>{vendor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold flex items-center">
                          {vendor.name}
                          {vendor.verified && (
                            <Badge variant="outline" className="ml-2 text-xs">
                              Verified
                            </Badge>
                          )}
                        </h4>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-warning mr-1" />
                          <span className="text-sm">{vendor.rating} • {vendor.completedJobs} jobs</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {vendor.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Recent Posts</h3>
              <Button asChild size="sm">
                <Link to="/community">View All Posts</Link>
              </Button>
            </div>
            
            <div className="space-y-6">
              {recentPosts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={post.authorAvatar} alt={post.author} />
                        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{post.author}</p>
                        <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                      </div>
                    </div>
                    
                    <p className="mb-4">{post.content}</p>
                    
                    {post.image && (
                      <img 
                        src={post.image} 
                        alt="Post content"
                        className="w-full max-w-md h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <button className="flex items-center hover:text-primary">
                        <Heart className="h-4 w-4 mr-1" />
                        {post.likes} likes
                      </button>
                      <button className="flex items-center hover:text-primary">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {post.comments} comments
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="mt-6">
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Upcoming Events</h3>
              <p className="text-muted-foreground mb-4">
                Stay tuned for community events and workshops
              </p>
              <Button variant="outline">
                Suggest an Event
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CommunityDetails;