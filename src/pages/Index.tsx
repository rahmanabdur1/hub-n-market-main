import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, ShoppingBag, Users, MapPin, Star, Heart } from 'lucide-react';

const Index = () => {
  const featuredListings = [
    {
      id: 1,
      title: "Cozy Mountain Cabin",
      location: "Aspen, Colorado",
      price: "$150/night",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=300&fit=crop",
      category: "Vacation Rental"
    },
    {
      id: 2,
      title: "Downtown Loft",
      location: "New York, NY",
      price: "$200/night",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=300&fit=crop",
      category: "Apartment"
    },
    {
      id: 3,
      title: "Beach House",
      location: "Malibu, CA",
      price: "$300/night",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1520637836862-4d197d17c0a4?w=500&h=300&fit=crop",
      category: "Beach House"
    }
  ];

  const recentPosts = [
    {
      id: 1,
      user: "Sarah M.",
      content: "Just discovered this amazing local cafe! Perfect for remote work 💻☕",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop",
      likes: 24,
      timeAgo: "2h"
    },
    {
      id: 2,
      user: "Mike R.",
      content: "Weekend hiking trip to the mountains was incredible! 🏔️",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      likes: 31,
      timeAgo: "4h"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Welcome to Your Community
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up">
            Discover amazing places, buy & sell locally, connect with neighbors
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button size="lg" variant="secondary" asChild className="hover-lift">
              <Link to="/listings">
                <Search className="mr-2 h-5 w-5" />
                Browse Listings
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-primary hover-lift">
              <Link to="/marketplace">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Explore Marketplace
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-lift cursor-pointer group">
              <Link to="/listings">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Search className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle>Browse Listings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    Find amazing places to stay, unique experiences, and local services
                  </p>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover-lift cursor-pointer group">
              <Link to="/marketplace">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <ShoppingBag className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <CardTitle>Marketplace</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    Buy and sell items locally within your community
                  </p>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover-lift cursor-pointer group">
              <Link to="/community">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Users className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle>Community Feed</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    Connect with neighbors and share your experiences
                  </p>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Listings</h2>
            <Button variant="outline" asChild>
              <Link to="/listings">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredListings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden hover-lift cursor-pointer">
                <Link to={`/listings/${listing.id}`}>
                  <div className="relative">
                    <img 
                      src={listing.image} 
                      alt={listing.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-background/90 text-foreground">
                      {listing.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{listing.title}</h3>
                      <div className="flex items-center text-sm">
                        <Star className="h-4 w-4 fill-warning text-warning mr-1" />
                        {listing.rating}
                      </div>
                    </div>
                    <div className="flex items-center text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{listing.location}</span>
                    </div>
                    <p className="font-semibold text-primary text-lg">{listing.price}</p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Community Posts */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Community Highlights</h2>
            <Button variant="outline" asChild>
              <Link to="/community">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {recentPosts.map((post) => (
              <Card key={post.id} className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-semibold text-sm">
                        {post.user.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">{post.user}</p>
                      <p className="text-sm text-muted-foreground">{post.timeAgo} ago</p>
                    </div>
                  </div>
                  <p className="mb-4">{post.content}</p>
                  <img 
                    src={post.image} 
                    alt="Post content"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Heart className="h-4 w-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      Comment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;