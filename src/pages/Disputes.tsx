import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { AlertTriangle, MessageCircle, Clock, CheckCircle, XCircle, Upload } from 'lucide-react';

interface Dispute {
  id: number;
  bookingId: number;
  listing: string;
  disputeType: string;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  createdDate: string;
  lastUpdate: string;
  description: string;
  evidence: string[];
  otherParty: {
    name: string;
    avatar: string;
  };
  resolution?: {
    decision: string;
    amount?: number;
    resolvedBy: string;
    resolvedDate: string;
  };
}

const Disputes = () => {
  const { user } = useAuth();
  const [disputeForm, setDisputeForm] = useState({
    bookingId: '',
    disputeType: '',
    description: '',
    evidence: [] as File[]
  });

  // Mock disputes data
  const disputes: Dispute[] = [
    {
      id: 1,
      bookingId: 101,
      listing: 'Professional Photography Services',
      disputeType: 'Service Quality',
      status: 'investigating',
      createdDate: '2 days ago',
      lastUpdate: '1 day ago',
      description: 'The delivered photos were not as per the agreed specifications. Several shots were blurry and the editing was not professional quality.',
      evidence: ['photo1.jpg', 'photo2.jpg', 'contract.pdf'],
      otherParty: {
        name: 'Sarah Wilson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
      }
    },
    {
      id: 2,
      bookingId: 102,
      listing: 'Camera Equipment Rental',
      disputeType: 'Refund Request',
      status: 'resolved',
      createdDate: '1 week ago',
      lastUpdate: '3 days ago',
      description: 'Equipment was damaged when received. Requesting full refund as I could not use it for my event.',
      evidence: ['damage_photo.jpg'],
      otherParty: {
        name: 'Mike Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike'
      },
      resolution: {
        decision: 'Full refund approved',
        amount: 250,
        resolvedBy: 'Community Manager',
        resolvedDate: '3 days ago'
      }
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      open: 'destructive',
      investigating: 'secondary',
      resolved: 'default',
      closed: 'outline'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleSubmitDispute = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!disputeForm.bookingId || !disputeForm.disputeType || !disputeForm.description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Dispute Submitted",
      description: "Your dispute has been submitted and will be reviewed by our team within 24 hours.",
    });

    setDisputeForm({
      bookingId: '',
      disputeType: '',
      description: '',
      evidence: []
    });
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      setDisputeForm(prev => ({
        ...prev,
        evidence: [...prev.evidence, ...newFiles]
      }));
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Disputes & Resolution</h1>
          <p className="text-muted-foreground">Manage and resolve booking disputes</p>
        </div>

        <Tabs defaultValue="my-disputes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="my-disputes">My Disputes</TabsTrigger>
            <TabsTrigger value="create-dispute">Create Dispute</TabsTrigger>
          </TabsList>

          {/* My Disputes */}
          <TabsContent value="my-disputes">
            <div className="space-y-6">
              {disputes.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                    <h3 className="font-medium mb-2">No disputes</h3>
                    <p className="text-sm text-muted-foreground">You don't have any active disputes</p>
                  </CardContent>
                </Card>
              ) : (
                disputes.map((dispute) => (
                  <Card key={dispute.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            Dispute #{dispute.id} - {dispute.listing}
                          </CardTitle>
                          <CardDescription>
                            Booking #{dispute.bookingId} • {dispute.disputeType}
                          </CardDescription>
                        </div>
                        {getStatusBadge(dispute.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={dispute.otherParty.avatar} alt={dispute.otherParty.name} />
                          <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                            {dispute.otherParty.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{dispute.otherParty.name}</p>
                          <p className="text-xs text-muted-foreground">Other party in dispute</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Description</h4>
                        <p className="text-sm text-muted-foreground">{dispute.description}</p>
                      </div>

                      {dispute.evidence.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Evidence</h4>
                          <div className="flex flex-wrap gap-2">
                            {dispute.evidence.map((file, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {file}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {dispute.resolution && (
                        <div className="bg-accent p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            <h4 className="font-medium">Resolution</h4>
                          </div>
                          <p className="text-sm mb-2">{dispute.resolution.decision}</p>
                          {dispute.resolution.amount && (
                            <p className="text-sm font-medium">Refund Amount: ${dispute.resolution.amount}</p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            Resolved by {dispute.resolution.resolvedBy} • {dispute.resolution.resolvedDate}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <span>Created: {dispute.createdDate}</span>
                          <span>Last update: {dispute.lastUpdate}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Contact Support
                          </Button>
                          {dispute.status === 'open' && (
                            <Button variant="outline" size="sm">
                              Add Evidence
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Create Dispute */}
          <TabsContent value="create-dispute">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Create New Dispute
                </CardTitle>
                <CardDescription>
                  Submit a dispute for a booking issue. Our team will review and resolve it within 3-5 business days.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitDispute} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bookingId">Booking ID</Label>
                      <Input
                        id="bookingId"
                        value={disputeForm.bookingId}
                        onChange={(e) => setDisputeForm(prev => ({ ...prev, bookingId: e.target.value }))}
                        placeholder="Enter booking ID"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="disputeType">Dispute Type</Label>
                      <Select 
                        value={disputeForm.disputeType} 
                        onValueChange={(value) => setDisputeForm(prev => ({ ...prev, disputeType: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select dispute type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="service_quality">Service Quality</SelectItem>
                          <SelectItem value="refund_request">Refund Request</SelectItem>
                          <SelectItem value="no_show">No Show</SelectItem>
                          <SelectItem value="damaged_equipment">Damaged Equipment</SelectItem>
                          <SelectItem value="cancellation">Cancellation Issue</SelectItem>
                          <SelectItem value="payment">Payment Issue</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={disputeForm.description}
                      onChange={(e) => setDisputeForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe the issue in detail..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Evidence (Optional)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <input
                        type="file"
                        multiple
                        accept="image/*,.pdf,.doc,.docx"
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="hidden"
                        id="evidence-upload"
                      />
                      <Label htmlFor="evidence-upload" className="cursor-pointer">
                        <Button type="button" variant="outline" size="sm">
                          Upload Files
                        </Button>
                      </Label>
                      <p className="text-sm text-muted-foreground mt-2">
                        Upload photos, documents, or other evidence (Max 10MB per file)
                      </p>
                      {disputeForm.evidence.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {disputeForm.evidence.map((file, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {file.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Important Notes:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Disputes should be filed within 7 days of service completion</li>
                      <li>• Provide as much detail and evidence as possible</li>
                      <li>• Our team will contact both parties for investigation</li>
                      <li>• Resolution typically takes 3-5 business days</li>
                    </ul>
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Dispute
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Disputes;