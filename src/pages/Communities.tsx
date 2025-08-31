import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Star, Search, Plus, Filter } from 'lucide-react';

const Communities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const communities = [
    {
      id: 1,
      name: "Photography Hub NYC",
      slug: "photography-nyc",
      description: "Professional photographers and enthusiasts in New York City",
      location: "New York, NY",
      memberCount: 1250,
      listingCount: 89,
      categories: ["Photography", "Equipment Rental", "Studio Space"],
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1554048612-b6a482b224b6?w=400&h=200&fit=crop",
      featured: true
    },
    {
      id: 2,
      name: "Home Services LA",
      slug: "home-services-la",
      description: "Trusted home services and contractors in Los Angeles",
      location: "Los Angeles, CA",
      memberCount: 890,
      listingCount: 156,
      categories: ["Home Repair", "Cleaning", "Landscaping"],
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop",
      featured: false
    },
    {
      id: 3,
      name: "Tech Tutors Chicago",
      slug: "tech-tutors-chicago",
      description: "Learn coding, design, and digital skills from local experts",
      location: "Chicago, IL",
      memberCount: 567,
      listingCount: 78,
      categories: ["Programming", "Web Design", "Data Science"],
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=200&fit=crop",
      featured: true
    },
    {
      id: 4,
      name: "Vacation Rentals Miami",
      slug: "vacation-rentals-miami",
      description: "Premium vacation rentals and experiences in Miami",
      location: "Miami, FL",
      memberCount: 2100,
      listingCount: 234,
      categories: ["Vacation Rentals", "Experiences", "Boat Rentals"],
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop",
      featured: true
    }
  ];

  const featuredCommunities = communities.filter(c => c.featured);
  const allCommunities = communities.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    c.location.toLowerCase().includes(locationFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Discover Communities
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join local communities of trusted service providers, vendors, and enthusiasts
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search communities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filter by location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Featured Communities */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Communities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCommunities.map((community) => (
              <Card key={community.id} className="overflow-hidden hover-scale group">
                <div className="relative">
                  <img 
                    src={community.image} 
                    alt={community.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-gradient-primary">
                    Featured
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{community.name}</CardTitle>
                      <div className="flex items-center text-muted-foreground mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{community.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-warning mr-1" />
                      <span className="text-sm font-medium">{community.rating}</span>
                    </div>
                  </div>
                  <CardDescription className="mt-2">
                    {community.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{community.memberCount.toLocaleString()} members</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {community.listingCount} listings
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {community.categories.slice(0, 2).map((category) => (
                      <Badge key={category} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                    {community.categories.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{community.categories.length - 2} more
                      </Badge>
                    )}
                  </div>
                  
                  <Button asChild className="w-full">
                    <Link to={`/communities/${community.slug}`}>
                      Explore Community
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Communities */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">All Communities</h2>
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Request New Community
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCommunities.map((community) => (
              <Card key={community.id} className="overflow-hidden hover-scale">
                <div className="relative">
                  <img 
                    src={community.image} 
                    alt={community.name}
                    className="w-full h-32 object-cover"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{community.name}</CardTitle>
                      <div className="flex items-center text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="text-sm">{community.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-warning mr-1" />
                      <span className="text-sm">{community.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {community.description}
                  </p>
                  
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-xs text-muted-foreground">
                      {community.memberCount.toLocaleString()} members
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {community.listingCount} listings
                    </div>
                  </div>
                  
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to={`/communities/${community.slug}`}>
                      View Community
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Create Community CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-primary/10 border border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Start Your Own Community</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Build a thriving community of service providers and customers in your area
              </p>
              <Button size="lg" className="bg-gradient-primary">
                Apply to Create Community
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Communities;