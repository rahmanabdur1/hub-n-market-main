import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Upload, Camera, CreditCard, Building, User, FileText } from 'lucide-react';

const KYCVerification = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    documentType: '',
    documentNumber: '',
    fullName: '',
    dateOfBirth: '',
    address: '',
    payoutMethod: '',
    bankDetails: '',
    mobileWallet: ''
  });
  const [documents, setDocuments] = useState({
    frontDocument: null as File | null,
    backDocument: null as File | null,
    selfie: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate KYC submission
    toast({
      title: "KYC Submitted Successfully",
      description: "Your KYC documents have been submitted for review. You'll be notified within 24-48 hours.",
    });
    
    updateProfile({ isKYCVerified: false }); // Will be true after admin approval
  };

  const handleFileUpload = (type: keyof typeof documents, file: File | null) => {
    setDocuments(prev => ({ ...prev, [type]: file }));
  };

  if (user?.isKYCVerified) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <User className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-success">KYC Verified</CardTitle>
              <CardDescription>Your identity has been verified successfully</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="default" className="bg-success text-success-foreground">
                Verified Vendor
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">KYC Verification</h1>
          <p className="text-muted-foreground">Complete your verification to become a vendor</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Provide your personal details as they appear on your ID</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="documentType">Document Type</Label>
                  <Select value={formData.documentType} onValueChange={(value) => setFormData(prev => ({ ...prev, documentType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nid">National ID Card</SelectItem>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="driving_license">Driving License</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="documentNumber">Document Number</Label>
                  <Input
                    id="documentNumber"
                    value={formData.documentNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, documentNumber: e.target.value }))}
                    placeholder="Enter document number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Full name as on document"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Full address as on document"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Document Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Document Upload
              </CardTitle>
              <CardDescription>Upload clear photos of your identification documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Front Document */}
                <div className="space-y-2">
                  <Label>Document Front</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload('frontDocument', e.target.files?.[0] || null)}
                      className="hidden"
                      id="front-upload"
                    />
                    <Label htmlFor="front-upload" className="cursor-pointer">
                      <Button type="button" variant="outline" size="sm">
                        Upload Front
                      </Button>
                    </Label>
                    {documents.frontDocument && (
                      <p className="text-sm text-success mt-2">{documents.frontDocument.name}</p>
                    )}
                  </div>
                </div>

                {/* Back Document */}
                <div className="space-y-2">
                  <Label>Document Back</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload('backDocument', e.target.files?.[0] || null)}
                      className="hidden"
                      id="back-upload"
                    />
                    <Label htmlFor="back-upload" className="cursor-pointer">
                      <Button type="button" variant="outline" size="sm">
                        Upload Back
                      </Button>
                    </Label>
                    {documents.backDocument && (
                      <p className="text-sm text-success mt-2">{documents.backDocument.name}</p>
                    )}
                  </div>
                </div>

                {/* Selfie */}
                <div className="space-y-2">
                  <Label>Selfie with Document</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                    <Camera className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload('selfie', e.target.files?.[0] || null)}
                      className="hidden"
                      id="selfie-upload"
                    />
                    <Label htmlFor="selfie-upload" className="cursor-pointer">
                      <Button type="button" variant="outline" size="sm">
                        Upload Selfie
                      </Button>
                    </Label>
                    {documents.selfie && (
                      <p className="text-sm text-success mt-2">{documents.selfie.name}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payout Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Payout Information
              </CardTitle>
              <CardDescription>Set up your preferred payout method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="payoutMethod">Payout Method</Label>
                <Select value={formData.payoutMethod} onValueChange={(value) => setFormData(prev => ({ ...prev, payoutMethod: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payout method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="bkash">bKash</SelectItem>
                    <SelectItem value="nagad">Nagad</SelectItem>
                    <SelectItem value="rocket">Rocket</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.payoutMethod === 'bank' && (
                <div className="space-y-2">
                  <Label htmlFor="bankDetails">Bank Details</Label>
                  <Textarea
                    id="bankDetails"
                    value={formData.bankDetails}
                    onChange={(e) => setFormData(prev => ({ ...prev, bankDetails: e.target.value }))}
                    placeholder="Bank name, Account number, Account holder name, Branch"
                    rows={4}
                  />
                </div>
              )}

              {['bkash', 'nagad', 'rocket'].includes(formData.payoutMethod) && (
                <div className="space-y-2">
                  <Label htmlFor="mobileWallet">Mobile Wallet Number</Label>
                  <Input
                    id="mobileWallet"
                    value={formData.mobileWallet}
                    onChange={(e) => setFormData(prev => ({ ...prev, mobileWallet: e.target.value }))}
                    placeholder="Enter mobile wallet number"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" size="lg">
            Submit KYC Documents
          </Button>
        </form>
      </div>
    </div>
  );
};

export default KYCVerification;