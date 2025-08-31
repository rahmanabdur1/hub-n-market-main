import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, MapPin, User, MessageCircle, Phone, Mail, Camera, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Type definitions
interface Listing {
  title: string;
  image: string;
  category: string;
}

interface Vendor {
  name: string;
  avatar: string;
  rating: number;
  phone: string;
  email: string;
  verified: boolean;
}

interface Customer {
  name: string;
  avatar: string;
  phone: string;
  email: string;
}

interface BookingDetailsType {
  date: string;
  time: string;
  duration: string;
  location: string;
  guests: number;
  addOns: string[];
}

interface Pricing {
  basePrice: number;
  hours: number;
  subtotal: number;
  addOns: number;
  platformFee: number;
  total: number;
}

interface Payment {
  method: string;
  status: string;
  transactionId: string;
  paidAt: string;
}

interface Message {
  id: number;
  sender: 'vendor' | 'customer';
  message: string;
  timestamp: string;
}

interface Booking {
  id: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  listing: Listing;
  vendor: Vendor;
  customer: Customer;
  details: BookingDetailsType;
  pricing: Pricing;
  payment: Payment;
  messages: Message[];
}

const BookingDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState('');

  // Mock booking data
  const booking: Booking = {
    id: 1,
    status: 'confirmed',
    listing: {
      title: "Professional Photography Studio",
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=200&fit=crop",
      category: "Studio Space"
    },
    vendor: {
      name: "Mike Chen Photography",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      rating: 4.9,
      phone: "+1 (555) 123-4567",
      email: "mike@mikechenphotography.com",
      verified: true
    },
    customer: {
      name: "Sarah Wilson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b044?w=100&h=100&fit=crop",
      phone: "+1 (555) 987-6543",
      email: "sarah.wilson@email.com"
    },
    details: {
      date: "March 15, 2024",
      time: "2:00 PM - 6:00 PM",
      duration: "4 hours",
      location: "123 Studio Street, New York, NY 10001",
      guests: 3,
      addOns: ["Lighting Equipment", "Backdrop Set"]
    },
    pricing: {
      basePrice: 85,
      hours: 4,
      subtotal: 340,
      addOns: 75,
      platformFee: 15,
      total: 430
    },
    payment: {
      method: "Bank Transfer",
      status: "confirmed",
      transactionId: "TXN123456789",
      paidAt: "March 10, 2024 3:45 PM"
    },
    messages: [
      {
        id: 1,
        sender: "vendor",
        message: "Hi Sarah! I'm excited about our upcoming session...",
        timestamp: "2 hours ago"
      },
      {
        id: 2,
        sender: "customer",
        message: "Hi Mike! Thanks for reaching out...",
        timestamp: "1 hour ago"
      }
    ]
  };
const getStatusColor = (status: string)=> {
  switch (status) {
    case 'confirmed': return 'success';
    case 'pending': return 'warning';
    case 'completed': return 'default';
    case 'cancelled': return 'destructive';
    default: return 'secondary';
  }
};


  const getStatusIcon = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <AlertCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    toast({ title: "Message sent!", description: "Your message has been sent to the vendor." });
    setMessage('');
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Booking Details</h1>
              <p className="text-muted-foreground">Booking ID: #{booking.id}</p>
            </div>
            <Badge variant={getStatusColor(booking.status)} className="flex items-center gap-2">
              {getStatusIcon(booking.status)}
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <img 
                    src={booking.listing.image} 
                    alt={booking.listing.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{booking.listing.title}</h3>
                    <Badge variant="secondary" className="mb-2">{booking.listing.category}</Badge>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{booking.details.date}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{booking.details.time}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{booking.details.location}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <User className="h-4 w-4 mr-2" />
                        <span>{booking.details.guests} guests</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vendor Information */}
            <Card>
              <CardHeader>
                <CardTitle>Vendor Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={booking.vendor.avatar} alt={booking.vendor.name} />
                    <AvatarFallback>{booking.vendor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold flex items-center">
                      {booking.vendor.name}
                      {booking.vendor.verified && (
                        <Badge variant="outline" className="ml-2 text-xs">Verified</Badge>
                      )}
                    </h4>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-muted-foreground">Rating: {booking.vendor.rating}/5</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Vendor
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Vendor
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Add-ons */}
            {booking.details.addOns.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Add-ons & Extras</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {booking.details.addOns.map((addon, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-success mr-2" />
                        <span>{addon}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Messages */}
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Communicate with your vendor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-4">
                  {booking.messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.sender === 'customer' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm">{msg.message}</p>
                        <p className={`text-xs mt-1 ${
                          msg.sender === 'customer' 
                            ? 'text-primary-foreground/70' 
                            : 'text-muted-foreground'
                        }`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[60px]"
                  />
                  <Button onClick={sendMessage} className="self-end">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Base Rate ({booking.pricing.hours}h)</span>
                  <span>${booking.pricing.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Add-ons</span>
                  <span>${booking.pricing.addOns}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee</span>
                  <span>${booking.pricing.platformFee}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${booking.pricing.total}</span>
                </div>
                
                <div className="mt-4 p-3 bg-success/10 rounded-lg">
                  <div className="flex items-center text-success">
                    <CreditCard className="h-4 w-4 mr-2" />
                    <span className="font-medium">Payment Confirmed</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Paid via {booking.payment.method}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {booking.payment.paidAt}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  <Camera className="h-4 w-4 mr-2" />
                  View Gallery
                </Button>
                <Button variant="outline" className="w-full">
                  Modify Booking
                </Button>
                {booking.status === 'completed' && (
                  <Button className="w-full">
                    Leave Review
                  </Button>
                )}
                {booking.status === 'confirmed' && (
                  <Button variant="destructive" className="w-full">
                    Cancel Booking
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Need Help */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Having issues with your booking? Our support team is here to help.
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;