import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Star, Filter, Plus } from 'lucide-react';
import api from '../lib/api';

// Define proper types for listings
interface Listing {
  _id: string;
  title: string;
  category: string;
  location: string;
  price: number;
  currency: string;
  status: 'ACTIVE' | 'INACTIVE';
  images?: string[];
  rating?: number;
  reviews?: number;
  vendorId: string;
}

const Listings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [location, setLocation] = useState('');
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get<Listing[]>('/listings');
        setListings(response.data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || listing.category === category;
    const matchesLocation = !location || listing.location.toLowerCase().includes(location.toLowerCase());

    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Browse Listings</h1>
            <p className="text-muted-foreground">Discover amazing places to stay and experiences to book</p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link to="/create-listing">
              <Plus className="mr-2 h-4 w-4" />
              Create Listing
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search listings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Vacation Rental">Vacation Rental</SelectItem>
                  <SelectItem value="Apartment">Apartment</SelectItem>
                  <SelectItem value="Beach House">Beach House</SelectItem>
                  <SelectItem value="Studio">Studio</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Location..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredListings.length} of {listings.length} listings
          </p>
        </div>

        {/* Listings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing._id} className="overflow-hidden hover-lift cursor-pointer">
              <Link to={`/listings/${listing._id}`}>
                <div className="relative">
                  <img src={listing.images?.[0]} alt={listing.title} className="w-full h-48 object-cover" />
                  <Badge
                    className="absolute top-3 left-3 bg-background/90 text-foreground"
                    variant={listing.status === 'ACTIVE' ? 'default' : 'destructive'}
                  >
                    {listing.status === 'ACTIVE' ? listing.category : 'Unavailable'}
                  </Badge>
                  <div className="absolute top-3 right-3 bg-background/90 rounded-full p-1">
                    <div className="flex items-center text-sm px-2 py-1">
                      <Star className="h-3 w-3 fill-warning text-warning mr-1" />
                      <span className="font-medium">{listing.rating ?? '—'}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{listing.title}</h3>

                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{listing.location}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-primary text-lg">
                        {listing.price} {listing.currency}
                      </p>
                      <p className="text-sm text-muted-foreground">{listing.reviews ?? 0} reviews</p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Hosted by</p>
                      <p className="text-sm font-medium">{listing.vendorId.slice(-6)}</p>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No listings found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Listings;
