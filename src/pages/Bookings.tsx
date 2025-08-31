import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, MapPin, User, Search, Filter, Eye, MessageCircle, Star } from 'lucide-react';

type TabType = 'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled';

const Bookings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('all');

  // Mock bookings data
  const bookings = [
    {
      id: 1,
      status: 'confirmed',
      listing: {
        title: "Professional Photography Studio",
        image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=200&h=150&fit=crop",
        category: "Studio Space"
      },
      vendor: {
        name: "Mike Chen Photography",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop"
      },
      date: "March 15, 2024",
      time: "2:00 PM - 6:00 PM",
      total: 430,
      location: "New York, NY",
      guests: 3,
      bookedAt: "March 10, 2024"
    },
    {
      id: 2,
      status: 'pending',
      listing: {
        title: "Wedding Photography Package",
        image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=200&h=150&fit=crop",
        category: "Photography Service"
      },
      vendor: {
        name: "Emma Davis Studios",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b044?w=50&h=50&fit=crop"
      },
      date: "April 20, 2024",
      time: "All Day",
      total: 1200,
      location: "Los Angeles, CA",
      guests: 100,
      bookedAt: "March 8, 2024"
    },
    {
      id: 3,
      status: 'completed',
      listing: {
        title: "Portrait Photography Session",
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200&h=150&fit=crop",
        category: "Photography Service"
      },
      vendor: {
        name: "Alex Rivera Photography",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop"
      },
      date: "February 28, 2024",
      time: "10:00 AM - 12:00 PM",
      total: 250,
      location: "Chicago, IL",
      guests: 2,
      bookedAt: "February 20, 2024",
      canReview: true
    },
    {
      id: 4,
      status: 'cancelled',
      listing: {
        title: "Corporate Event Photography",
        image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=200&h=150&fit=crop",
        category: "Event Photography"
      },
      vendor: {
        name: "Pro Events Photo",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=50&h=50&fit=crop"
      },
      date: "March 5, 2024",
      time: "6:00 PM - 11:00 PM",
      total: 800,
      location: "Miami, FL",
      guests: 50,
      bookedAt: "February 15, 2024",
      cancelledAt: "March 3, 2024"
    }
  ];

 const getStatusColor = (status: string): BadgeVariant => {
  switch (status) {
    case 'confirmed': return 'success';
    case 'pending': return 'warning';
    case 'completed': return 'default';
    case 'cancelled': return 'destructive';
    default: return 'secondary';
  }
};


  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.vendor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || booking.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const bookingCounts = {
    all: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
          <p className="text-muted-foreground">Manage all your service bookings</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{bookingCounts.all}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-warning">{bookingCounts.pending}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-success">{bookingCounts.confirmed}</p>
              <p className="text-sm text-muted-foreground">Confirmed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{bookingCounts.completed}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-destructive">{bookingCounts.cancelled}</p>
              <p className="text-sm text-muted-foreground">Cancelled</p>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as TabType)}
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All ({bookingCounts.all})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({bookingCounts.pending})</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed ({bookingCounts.confirmed})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({bookingCounts.completed})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({bookingCounts.cancelled})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredBookings.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No bookings found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm ? 'Try adjusting your search criteria' : 'You haven\'t made any bookings yet'}
                  </p>
                  <Button asChild>
                    <Link to="/listings">Browse Listings</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <Card key={booking.id} className="overflow-hidden hover-scale">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="flex items-start space-x-4 flex-1">
                          <img
                            src={booking.listing.image}
                            alt={booking.listing.title}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-lg truncate pr-2">
                                {booking.listing.title}
                              </h3>
                           <Badge variant={getStatusColor(booking.status)}>
  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
</Badge>

                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              by {booking.vendor.name}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>{booking.date}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{booking.time}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{booking.location}</span>
                              </div>
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                <span>{booking.guests} guests</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-4">
                          <div className="text-right">
                            <p className="text-2xl font-bold">${booking.total}</p>
                            <p className="text-sm text-muted-foreground">
                              Booked {booking.bookedAt}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button asChild size="sm" variant="outline">
                              <Link to={`/bookings/${booking.id}`}>
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Link>
                            </Button>
                            {booking.status === 'confirmed' && (
                              <Button size="sm" variant="outline">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Message
                              </Button>
                            )}
                            {booking.canReview && (
                              <Button size="sm">
                                <Star className="h-4 w-4 mr-1" />
                                Review
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Bookings;
