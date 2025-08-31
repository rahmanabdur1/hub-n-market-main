import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { Send, MessageCircle, Clock, Check, CheckCheck } from 'lucide-react';

interface Message {
  id: number;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Conversation {
  id: number;
  bookingId?: number;
  participant: {
    id: string;
    name: string;
    avatar: string;
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  listing?: string;
  messages: Message[];
}

const Messages = () => {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');

  // Mock conversations data
  const conversations: Conversation[] = [
    {
      id: 1,
      bookingId: 101,
      participant: {
        id: '2',
        name: 'Sarah Wilson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
      },
      lastMessage: 'When can we schedule the photography session?',
      lastMessageTime: '2 hours ago',
      unreadCount: 2,
      listing: 'Professional Photography Services',
      messages: [
        {
          id: 1,
          senderId: '2',
          senderName: 'Sarah Wilson',
          content: 'Hi! I just booked your photography service.',
          timestamp: '10:30 AM',
          isRead: true
        },
        {
          id: 2,
          senderId: user?.id || '1',
          senderName: user?.name || 'You',
          content: 'Thank you for booking! I\'m excited to work with you.',
          timestamp: '10:35 AM',
          isRead: true
        },
        {
          id: 3,
          senderId: '2',
          senderName: 'Sarah Wilson',
          content: 'When can we schedule the photography session?',
          timestamp: '2:15 PM',
          isRead: false
        }
      ]
    },
    {
      id: 2,
      bookingId: 102,
      participant: {
        id: '3',
        name: 'Mike Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike'
      },
      lastMessage: 'The equipment looks great, thanks!',
      lastMessageTime: '1 day ago',
      unreadCount: 0,
      listing: 'Camera Equipment Rental',
      messages: [
        {
          id: 1,
          senderId: '3',
          senderName: 'Mike Chen',
          content: 'Is the camera still available for next week?',
          timestamp: 'Yesterday 3:20 PM',
          isRead: true
        },
        {
          id: 2,
          senderId: user?.id || '1',
          senderName: user?.name || 'You',
          content: 'Yes, it\'s available. I can prepare it for pickup.',
          timestamp: 'Yesterday 3:25 PM',
          isRead: true
        },
        {
          id: 3,
          senderId: '3',
          senderName: 'Mike Chen',
          content: 'The equipment looks great, thanks!',
          timestamp: 'Yesterday 6:45 PM',
          isRead: true
        }
      ]
    }
  ];

  const currentConversation = conversations.find(c => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !currentConversation) return;

    // In a real app, this would send the message to the backend
    setNewMessage('');
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Messages</h1>
          <p className="text-muted-foreground">Chat with your customers and vendors</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="mr-2 h-5 w-5" />
                Conversations
              </CardTitle>
              <CardDescription>Your recent messages</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {conversations.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  <MessageCircle className="mx-auto h-12 w-12 opacity-50 mb-2" />
                  <p>No conversations yet</p>
                </div>
              ) : (
                <div className="space-y-0">
                  {conversations.map((conversation, index) => (
                    <div key={conversation.id}>
                      <div
                        className={`p-4 cursor-pointer hover:bg-accent transition-colors ${
                          selectedConversation === conversation.id ? 'bg-accent' : ''
                        }`}
                        onClick={() => setSelectedConversation(conversation.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={conversation.participant.avatar} alt={conversation.participant.name} />
                            <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                              {conversation.participant.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium truncate">{conversation.participant.name}</p>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-muted-foreground">{conversation.lastMessageTime}</span>
                                {conversation.unreadCount > 0 && (
                                  <Badge variant="destructive" className="text-xs px-2 py-0.5">
                                    {conversation.unreadCount}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            {conversation.listing && (
                              <p className="text-xs text-primary mb-1">{conversation.listing}</p>
                            )}
                            <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                          </div>
                        </div>
                      </div>
                      {index < conversations.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Chat Interface */}
          <Card className="lg:col-span-2">
            {selectedConversation && currentConversation ? (
              <>
                {/* Chat Header */}
                <CardHeader className="border-b">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={currentConversation.participant.avatar} alt={currentConversation.participant.name} />
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                        {currentConversation.participant.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{currentConversation.participant.name}</h3>
                      {currentConversation.listing && (
                        <p className="text-sm text-muted-foreground">{currentConversation.listing}</p>
                      )}
                      {currentConversation.bookingId && (
                        <Badge variant="outline" className="text-xs">
                          Booking #{currentConversation.bookingId}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 p-4">
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {currentConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.senderId === user?.id
                              ? 'bg-primary text-primary-foreground ml-12'
                              : 'bg-accent mr-12'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <div className={`flex items-center justify-between mt-1 ${
                            message.senderId === user?.id ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          }`}>
                            <span className="text-xs">{message.timestamp}</span>
                            {message.senderId === user?.id && (
                              <div className="ml-2">
                                {message.isRead ? (
                                  <CheckCheck className="h-3 w-3" />
                                ) : (
                                  <Check className="h-3 w-3" />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center text-muted-foreground">
                  <MessageCircle className="mx-auto h-12 w-12 opacity-50 mb-4" />
                  <h3 className="font-medium">Select a conversation</h3>
                  <p className="text-sm">Choose a conversation from the left to start messaging</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;