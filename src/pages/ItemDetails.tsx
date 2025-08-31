import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { MapPin, Heart, Share2, MessageCircle, DollarSign, Calendar, Shield, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ItemDetails = () => {
  const { id } = useParams();

  // Mock data - in real app, fetch by ID
  const item = {
    id: 1,
    title: "MacBook Pro 2021 - 16 inch",
    price: "$1,200",
    location: "San Francisco, CA",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop"
    ],
    category: "Electronics",
    condition: "Like New",
    seller: {
      name: "John Doe",
      username: "johndoe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      rating: 4.8,
      reviews: 23,
      joinedDate: "2022",
      isVerified: true
    },
    description: "Excellent condition MacBook Pro 16-inch from 2021. Barely used, mainly for light office work. Includes original charger, box, and all documentation. No scratches or dents. Perfect for students or professionals looking for a powerful laptop at a great price.",
    specifications: [
      { label: "Processor", value: "Apple M1 Pro" },
      { label: "Memory", value: "16GB RAM" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Display", value: "16-inch Retina" },
      { label: "Color", value: "Space Gray" },
      { label: "Year", value: "2021" }
    ],
    features: [
      "Original packaging included",
      "AppleCare+ until 2024",
      "No liquid damage",
      "Battery health 95%",
      "All original accessories"
    ],
    postedAt: "2 days ago",
    views: 156,
    inquiries: 12,
    available: true
  };

  const handleContact = () => {
    toast({
      title: "Message sent!",
      description: "Your message has been sent to the seller.",
    });
  };

  const handleOffer = () => {
    toast({
      title: "Offer submitted!",
      description: "The seller will respond to your offer soon.",
    });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Posted {item.postedAt}</span>
                </div>
                <span>{item.views} views</span>
              </div>
            </div>
            
            <div className="flex space-x-2 mt-4 md:mt-0">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:row-span-2">
                <img 
                  src={item.images[0]} 
                  alt={item.title}
                  className="w-full h-64 md:h-full object-cover rounded-lg"
                />
              </div>
              <div className="space-y-4">
                <img 
                  src={item.images[1]} 
                  alt={item.title}
                  className="w-full h-30 object-cover rounded-lg"
                />
                <img 
                  src={item.images[2]} 
                  alt={item.title}
                  className="w-full h-30 object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Item Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Item Details</CardTitle>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge variant="default">{item.category}</Badge>
                      <Badge variant="secondary">{item.condition}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-3xl font-bold text-success">
                      <DollarSign className="h-8 w-8" />
                      <span>{item.price.slice(1)}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {item.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">{spec.label}</span>
                      <span className="text-muted-foreground">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {item.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Shield className="h-4 w-4 text-success" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Seller Information */}
            <Card>
              <CardHeader>
                <CardTitle>Seller Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={item.seller.avatar} alt={item.seller.name} />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                      {item.seller.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-lg">{item.seller.name}</h3>
                      {item.seller.isVerified && (
                        <Badge variant="default" className="text-xs">Verified</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">@{item.seller.username}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-warning text-warning mr-1" />
                        <span className="font-medium">{item.seller.rating}</span>
                        <span className="text-muted-foreground ml-1">({item.seller.reviews} reviews)</span>
                      </div>
                      <span className="text-muted-foreground">Member since {item.seller.joinedDate}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <div className="flex items-center justify-center">
                  <div className="flex items-center text-3xl font-bold text-success">
                    <DollarSign className="h-8 w-8" />
                    <span>{item.price.slice(1)}</span>
                  </div>
                </div>
                <div className="text-center">
                  <Badge variant={item.available ? "default" : "destructive"}>
                    {item.available ? "Available" : "Sold"}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {item.available ? (
                  <>
                    <Button className="w-full" size="lg" onClick={handleContact}>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Contact Seller
                    </Button>

                    <Button variant="outline" className="w-full" size="lg" onClick={handleOffer}>
                      Make an Offer
                    </Button>

                    <Separator />

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Condition</span>
                        <span className="font-medium">{item.condition}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Category</span>
                        <span className="font-medium">{item.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Views</span>
                        <span className="font-medium">{item.views}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Inquiries</span>
                        <span className="font-medium">{item.inquiries}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2 text-xs text-muted-foreground">
                      <p className="flex items-center">
                        <Shield className="h-3 w-3 mr-1" />
                        Safe & secure transactions
                      </p>
                      <p>Meet in public places for safety</p>
                      <p>Inspect item before purchase</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Badge variant="destructive" className="mb-4">
                      Sold Out
                    </Badge>
                    <p className="text-muted-foreground">
                      This item has been sold.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;