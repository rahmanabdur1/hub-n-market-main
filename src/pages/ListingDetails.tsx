import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { MapPin, Star, Heart, Share2, Calendar, Users, Wifi, Car, Coffee, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ListingDetails = () => {
  const { id } = useParams();

  // Mock data - in real app, fetch by ID
  const listing = {
    id: 1,
    title: "Cozy Mountain Cabin",
    location: "Aspen, Colorado",
    price: "$150",
    priceType: "night",
    rating: 4.9,
    reviews: 42,
    images: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1520637836862-4d197d17c0a4?w=800&h=600&fit=crop"
    ],
    category: "Vacation Rental",
    host: {
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      joinedDate: "2022",
      isVerified: true
    },
    description: "Escape to this charming mountain cabin nestled in the heart of Aspen. Perfect for a romantic getaway or family vacation, this cozy retreat offers stunning mountain views, modern amenities, and easy access to hiking trails and ski slopes.",
    amenities: [
      { icon: Wifi, name: "Free WiFi" },
      { icon: Car, name: "Free Parking" },
      { icon: Coffee, name: "Coffee Machine" },
      { icon: Shield, name: "Safe & Secure" }
    ],
    details: {
      guests: 4,
      bedrooms: 2,
      bathrooms: 1,
      size: "850 sq ft"
    },
    availability: true,
    checkIn: "3:00 PM",
    checkOut: "11:00 AM"
  };

  const handleBooking = () => {
    toast({
      title: "Booking request sent!",
      description: "The host will respond to your request within 24 hours.",
    });
  };

  const handleContact = () => {
    toast({
      title: "Message sent!",
      description: "Your message has been sent to the host.",
    });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-warning text-warning mr-1" />
                  <span className="font-medium">{listing.rating}</span>
                  <span className="ml-1">({listing.reviews} reviews)</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{listing.location}</span>
                </div>
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
                  src={listing.images[0]} 
                  alt={listing.title}
                  className="w-full h-64 md:h-full object-cover rounded-lg"
                />
              </div>
              <div className="space-y-4">
                <img 
                  src={listing.images[1]} 
                  alt={listing.title}
                  className="w-full h-30 object-cover rounded-lg"
                />
                <img 
                  src={listing.images[2]} 
                  alt={listing.title}
                  className="w-full h-30 object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Host Information */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={listing.host.avatar} alt={listing.host.name} />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                      {listing.host.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{listing.host.name}</h3>
                      {listing.host.isVerified && (
                        <Badge variant="default" className="text-xs">Verified</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">Host since {listing.host.joinedDate}</p>
                  </div>
                  <Button variant="outline" onClick={handleContact}>
                    Contact Host
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About this place</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{listing.description}</p>
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="font-semibold">{listing.details.guests}</p>
                    <p className="text-sm text-muted-foreground">Guests</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <span className="text-2xl font-bold text-primary">{listing.details.bedrooms}</span>
                    <p className="text-sm text-muted-foreground">Bedrooms</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <span className="text-2xl font-bold text-primary">{listing.details.bathrooms}</span>
                    <p className="text-sm text-muted-foreground">Bathrooms</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <span className="text-lg font-bold text-primary">{listing.details.size}</span>
                    <p className="text-sm text-muted-foreground">Size</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {listing.amenities.map((amenity, index) => {
                    const Icon = amenity.icon;
                    return (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                        <Icon className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">{amenity.name}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold">${listing.price}</span>
                  <span className="text-muted-foreground">per {listing.priceType}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-warning text-warning mr-1" />
                    <span className="font-medium">{listing.rating}</span>
                  </div>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{listing.reviews} reviews</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {listing.availability ? (
                  <>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Check-in</span>
                        <span>{listing.checkIn}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Check-out</span>
                        <span>{listing.checkOut}</span>
                      </div>
                    </div>

                    <Separator />

                    <Button className="w-full" size="lg" onClick={handleBooking}>
                      <Calendar className="mr-2 h-4 w-4" />
                      Request to Book
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                      You won't be charged yet
                    </p>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>$150 x 3 nights</span>
                        <span>$450</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service fee</span>
                        <span>$25</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxes</span>
                        <span>$35</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>$510</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Badge variant="destructive" className="mb-4">
                      Currently Unavailable
                    </Badge>
                    <p className="text-muted-foreground">
                      This listing is not accepting bookings at the moment.
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

export default ListingDetails;