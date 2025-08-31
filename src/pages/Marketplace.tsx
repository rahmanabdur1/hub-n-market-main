import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Plus, Filter, DollarSign } from 'lucide-react';
import api from '../lib/api';

// Define proper type for marketplace items
interface MarketplaceItem {
  _id: string;
  title: string;
  category: string;
  type: string;
  location: string;
  price: number;
  currency: string;
  vendorId: string;
  images?: string[];
  createdAt: string;
}

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [location, setLocation] = useState('');
  const [items, setItems] = useState<MarketplaceItem[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get<MarketplaceItem[]>('/marketplace');
        setItems(response.data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const filteredItems = items.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || item.category === category;
    const matchesLocation = !location || item.location.toLowerCase().includes(location.toLowerCase());

    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
            <p className="text-muted-foreground">Buy and sell items locally within your community</p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link to="/create-item">
              <Plus className="mr-2 h-4 w-4" />
              Sell Item
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
                  placeholder="Search items..."
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
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Furniture">Furniture</SelectItem>
                  <SelectItem value="Vehicles">Vehicles</SelectItem>
                  <SelectItem value="Services">Services</SelectItem>
                  <SelectItem value="Clothing">Clothing</SelectItem>
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
            Showing {filteredItems.length} of {items.length} items
          </p>
        </div>

        {/* Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <Card key={item._id} className="overflow-hidden hover-lift cursor-pointer">
              <Link to={`/marketplace/${item._id}`}>
                <div className="relative">
                  <img src={item.images?.[0]} alt={item.title} className="w-full h-48 object-cover" />
                  <Badge className="absolute top-3 left-3 bg-background/90 text-foreground">
                    {item.category}
                  </Badge>
                  <Badge className="absolute top-3 right-3 bg-success/90 text-success-foreground" variant="default">
                    {item.type}
                  </Badge>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{item.location}</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-success mr-1" />
                      <span className="font-bold text-xl text-success">
                        {item.price} {item.currency}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Seller</p>
                      <p className="text-sm font-medium">{item.vendorId.slice(-6)}</p>
                    </div>
                    <Button size="sm" variant="outline">Contact</Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No items found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
