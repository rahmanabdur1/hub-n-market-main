import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Home, ShoppingBag, MessageCircle, Star, Plus, Edit, Trash2, Eye } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const myListings = [
    {
      id: 1,
      title: "Cozy Beach House",
      price: "$200/night",
      status: "Active",
      views: 45,
      bookings: 3,
      image: "https://images.unsplash.com/photo-1520637836862-4d197d17c0a4?w=200&h=150&fit=crop"
    },
    {
      id: 2,
      title: "Downtown Apartment",
      price: "$150/night",
      status: "Pending Review",
      views: 12,
      bookings: 0,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&h=150&fit=crop"
    }
  ];

  const myItems = [
    {
      id: 1,
      title: "Vintage Camera",
      price: "$300",
      status: "Sold",
      views: 28,
      inquiries: 5,
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=200&h=150&fit=crop"
    },
    {
      id: 2,
      title: "MacBook Pro",
      price: "$1,200",
      status: "Active",
      views: 67,
      inquiries: 12,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=150&fit=crop"
    }
  ];

  const myPosts = [
    {
      id: 1,
      content: "Amazing sunset at the beach today! 🌅",
      likes: 24,
      comments: 8,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop",
      timeAgo: "2 hours ago"
    },
    {
      id: 2,
      content: "Local farmers market was fantastic this weekend!",
      likes: 18,
      comments: 5,
      image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=200&h=150&fit=crop",
      timeAgo: "1 day ago"
    }
  ];

  const bookingRequests = [
    {
      id: 1,
      listing: "Cozy Beach House",
      guest: "John Doe",
      dates: "Dec 15-18, 2024",
      amount: "$600",
      status: "Pending"
    },
    {
      id: 2,
      listing: "Downtown Apartment",
      guest: "Sarah Wilson",
      dates: "Dec 20-22, 2024",
      amount: "$450",
      status: "Approved"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Pending Review': return 'warning';
      case 'Sold': return 'destructive';
      case 'Pending': return 'warning';
      case 'Approved': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your listings, items, and activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Home className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{myListings.length}</p>
                  <p className="text-sm text-muted-foreground">Active Listings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-8 w-8 text-secondary" />
                <div>
                  <p className="text-2xl font-bold">{myItems.length}</p>
                  <p className="text-sm text-muted-foreground">Marketplace Items</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold">{myPosts.length}</p>
                  <p className="text-sm text-muted-foreground">Community Posts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Star className="h-8 w-8 text-warning" />
                <div>
                  <p className="text-2xl font-bold">4.8</p>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="items">My Items</TabsTrigger>
            <TabsTrigger value="posts">My Posts</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="listings">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>My Listings</CardTitle>
                    <CardDescription>Manage your property listings</CardDescription>
                  </div>
                  <Button asChild>
                    <Link to="/create-listing">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Listing
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myListings.map((listing) => (
                    <div key={listing.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img 
                        src={listing.image} 
                        alt={listing.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{listing.title}</h3>
                        <p className="text-sm text-muted-foreground">{listing.price}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-muted-foreground">{listing.views} views</span>
                          <span className="text-sm text-muted-foreground">{listing.bookings} bookings</span>
                        </div>
                      </div>
                      <Badge variant={getStatusColor(listing.status) as any}>
                        {listing.status}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="items">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>My Items</CardTitle>
                    <CardDescription>Manage your marketplace items</CardDescription>
                  </div>
                  <Button asChild>
                    <Link to="/create-item">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Item
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.price}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-muted-foreground">{item.views} views</span>
                          <span className="text-sm text-muted-foreground">{item.inquiries} inquiries</span>
                        </div>
                      </div>
                      <Badge variant={getStatusColor(item.status) as any}>
                        {item.status}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="posts">
            <Card>
              <CardHeader>
                <CardTitle>My Posts</CardTitle>
                <CardDescription>Manage your community posts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myPosts.map((post) => (
                    <div key={post.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img 
                        src={post.image} 
                        alt="Post"
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{post.content}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-muted-foreground">{post.likes} likes</span>
                          <span className="text-sm text-muted-foreground">{post.comments} comments</span>
                          <span className="text-sm text-muted-foreground">{post.timeAgo}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Booking Requests</CardTitle>
                <CardDescription>Manage incoming booking requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookingRequests.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{booking.listing}</h3>
                        <p className="text-sm text-muted-foreground">Guest: {booking.guest}</p>
                        <p className="text-sm text-muted-foreground">Dates: {booking.dates}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold">{booking.amount}</span>
                        <Badge variant={getStatusColor(booking.status) as any}>
                          {booking.status}
                        </Badge>
                        {booking.status === 'Pending' && (
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">Approve</Button>
                            <Button size="sm" variant="destructive">Decline</Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;