import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Settings, Users, Home, ShoppingBag, MessageCircle, CheckCircle, XCircle, Search, TrendingUp } from 'lucide-react';

const AdminPanel = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  console.log(user,'user')

  // Mock data for admin panel
  const pendingListings = [
    {
      id: 1,
      title: "Downtown Loft",
      user: "John Doe",
      category: "Apartment",
      price: "$200/night",
      submittedAt: "2 hours ago",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&h=150&fit=crop"
    },
    {
      id: 2,
      title: "Beach House",
      user: "Sarah Wilson",
      category: "Vacation Rental",
      price: "$300/night",
      submittedAt: "1 day ago",
      image: "https://images.unsplash.com/photo-1520637836862-4d197d17c0a4?w=200&h=150&fit=crop"
    }
  ];

  const pendingItems = [
    {
      id: 1,
      title: "Gaming Laptop",
      user: "Mike Chen",
      category: "Electronics",
      price: "$800",
      condition: "Like New",
      submittedAt: "3 hours ago",
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=200&h=150&fit=crop"
    },
    {
      id: 2,
      title: "Dining Table Set",
      user: "Emily Davis",
      category: "Furniture",
      price: "$450",
      condition: "Good",
      submittedAt: "5 hours ago",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=150&fit=crop"
    }
  ];

  const pendingPosts = [
    {
      id: 1,
      user: "Alex Johnson",
      content: "Amazing community event this weekend! 🎉",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&h=150&fit=crop",
      submittedAt: "1 hour ago"
    },
    {
      id: 2,
      user: "Lisa Brown",
      content: "Local farmers market was fantastic today!",
      image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=200&h=150&fit=crop",
      submittedAt: "4 hours ago"
    }
  ];

  const userStats = {
    totalUsers: 1234,
    activeUsers: 856,
    newUsersToday: 23,
    totalListings: 456,
    totalItems: 789,
    totalPosts: 2340
  };

  const handleApprove = (type: string, id: number) => {
    toast({
      title: "Approved!",
      description: `${type} has been approved and is now live.`,
    });
  };

  const handleReject = (type: string, id: number) => {
    toast({
      title: "Rejected",
      description: `${type} has been rejected and removed.`,
      variant: "destructive",
    });
  };

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="text-center p-8">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You don't have permission to access the admin panel.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Manage your community platform</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{userStats.totalUsers}</p>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-success" />
                <div>
                  <p className="text-2xl font-bold">{userStats.activeUsers}</p>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-accent" />
                <div>
                  <p className="text-2xl font-bold">{userStats.newUsersToday}</p>
                  <p className="text-sm text-muted-foreground">New Today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Home className="h-6 w-6 text-secondary" />
                <div>
                  <p className="text-2xl font-bold">{userStats.totalListings}</p>
                  <p className="text-sm text-muted-foreground">Listings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-6 w-6 text-warning" />
                <div>
                  <p className="text-2xl font-bold">{userStats.totalItems}</p>
                  <p className="text-sm text-muted-foreground">Items</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{userStats.totalPosts}</p>
                  <p className="text-sm text-muted-foreground">Posts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="listings">Pending Listings</TabsTrigger>
            <TabsTrigger value="items">Pending Items</TabsTrigger>
            <TabsTrigger value="posts">Pending Posts</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Pending Listings */}
          <TabsContent value="listings">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Pending Listings</CardTitle>
                    <CardDescription>Review and approve new listings</CardDescription>
                  </div>
                  <Badge variant="secondary">{pendingListings.length} Pending</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingListings.map((listing) => (
                    <div key={listing.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img 
                        src={listing.image} 
                        alt={listing.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{listing.title}</h3>
                        <p className="text-sm text-muted-foreground">by {listing.user}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <Badge variant="secondary">{listing.category}</Badge>
                          <span className="text-sm font-medium">{listing.price}</span>
                          <span className="text-sm text-muted-foreground">{listing.submittedAt}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={() => handleApprove('Listing', listing.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleReject('Listing', listing.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pending Items */}
          <TabsContent value="items">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Pending Marketplace Items</CardTitle>
                    <CardDescription>Review and approve new marketplace items</CardDescription>
                  </div>
                  <Badge variant="secondary">{pendingItems.length} Pending</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">by {item.user}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <Badge variant="secondary">{item.category}</Badge>
                          <Badge variant="outline">{item.condition}</Badge>
                          <span className="text-sm font-medium">{item.price}</span>
                          <span className="text-sm text-muted-foreground">{item.submittedAt}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={() => handleApprove('Item', item.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleReject('Item', item.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pending Posts */}
          <TabsContent value="posts">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Pending Community Posts</CardTitle>
                    <CardDescription>Review and approve community posts</CardDescription>
                  </div>
                  <Badge variant="secondary">{pendingPosts.length} Pending</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingPosts.map((post) => (
                    <div key={post.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img 
                        src={post.image} 
                        alt="Post content"
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{post.content}</p>
                        <p className="text-sm text-muted-foreground">by {post.user}</p>
                        <span className="text-sm text-muted-foreground">{post.submittedAt}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={() => handleApprove('Post', post.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleReject('Post', post.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Management */}
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Payment Management</CardTitle>
                    <CardDescription>Review and confirm manual payments</CardDescription>
                  </div>
                  <Badge variant="secondary">5 Pending</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      type: "Booking Payment",
                      listing: "Cozy Beach House",
                      payer: "John Doe",
                      amount: "$510",
                      method: "Bank Transfer",
                      submittedAt: "2 hours ago",
                      status: "Pending Confirmation"
                    },
                    {
                      id: 2,
                      type: "Item Purchase",
                      item: "MacBook Pro",
                      payer: "Sarah Wilson",
                      amount: "$1,200",
                      method: "Cash",
                      submittedAt: "4 hours ago",
                      status: "Pending Confirmation"
                    }
                  ].map((payment) => (
                    <div key={payment.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{payment.type}</h3>
                        <p className="text-sm text-muted-foreground">
                          {payment.listing || payment.item} - {payment.payer}
                        </p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm font-medium">{payment.amount}</span>
                          <Badge variant="outline">{payment.method}</Badge>
                          <span className="text-sm text-muted-foreground">{payment.submittedAt}</span>
                        </div>
                      </div>
                      <Badge variant="secondary">{payment.status}</Badge>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={() => toast({
                            title: "Payment Confirmed!",
                            description: "Payment has been confirmed and processed.",
                          })}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Confirm
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => toast({
                            title: "Payment Rejected",
                            description: "Payment has been rejected.",
                            variant: "destructive",
                          })}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="mr-2 h-5 w-5" />
                    Platform Settings
                  </CardTitle>
                  <CardDescription>Configure platform-wide settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="platformName">Platform Name</Label>
                    <Input id="platformName" value="CommunityHub" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maxListings">Max Listings per User</Label>
                    <Input id="maxListings" type="number" value="10" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maxItems">Max Items per User</Label>
                    <Input id="maxItems" type="number" value="20" />
                  </div>
                  
                  <Button>Save Settings</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Featured Content Manager</CardTitle>
                  <CardDescription>Manage featured listings and posts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="search">Search Content</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder="Search listings, items, or posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Manage Featured Content
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;