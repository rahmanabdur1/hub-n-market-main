import { useState } from 'react';
import { useAuth} from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { User, Mail, AtSign, Camera, Save } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || ''
  });

  const handleSave = () => {
    updateProfile(formData);
    setEditing(false);
    toast({
      title: "Profile updated!",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      username: user?.username || '',
      email: user?.email || '',
      bio: user?.bio || ''
    });
    setEditing(false);
  };

  const userStats = [
    { label: 'Listings', value: '3' },
    { label: 'Items Sold', value: '7' },
    { label: 'Community Posts', value: '12' },
    { label: 'Reviews', value: '24' }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="relative inline-block">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl">
                      {user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="absolute bottom-4 right-0 rounded-full h-8 w-8 p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-xl">{user?.name}</CardTitle>
                <CardDescription>@{user?.username}</CardDescription>
                {user?.role === "ADMIN" && (
                  <Badge variant="default" className="mt-2">
                    Admin
                  </Badge>
                )}
                {user?.role === "VENDOR" && (
                  <Badge variant="secondary" className="mt-2">
                    Vendor
                  </Badge>
                )}
                {user?.role === "COMMUNITY_MANAGER" && (
                  <Badge variant="outline" className="mt-2">
                    Community Manager
                  </Badge>
                )}
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground text-sm text-center mb-6">
                  {user?.bio || 'No bio available'}
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {userStats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-2xl font-bold text-primary">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Manage your account details and preferences
                    </CardDescription>
                  </div>
                  {!editing ? (
                    <Button onClick={() => setEditing(true)}>
                      <User className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                      <Button onClick={handleSave}>
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {editing ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        placeholder="Enter your username"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        placeholder="Tell us about yourself"
                        className="min-h-[100px]"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Full Name</p>
                          <p className="font-medium">{user?.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                        <AtSign className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Username</p>
                          <p className="font-medium">@{user?.username}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">{user?.email}</p>
                        </div>
                      </div>

                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">Bio</p>
                        <p className="font-medium">{user?.bio || 'No bio available'}</p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;