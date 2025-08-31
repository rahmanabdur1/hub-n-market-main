import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/layout/Header";
import { Skeleton } from "@/components/ui/skeleton";

const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));
const Listings = lazy(() => import("./pages/Listings"));
const ListingDetails = lazy(() => import("./pages/ListingDetails"));
const CreateListing = lazy(() => import("./pages/CreateListing"));
const Marketplace = lazy(() => import("./pages/Marketplace"));
const ItemDetails = lazy(() => import("./pages/ItemDetails"));
const CreateItem = lazy(() => import("./pages/CreateItem"));
const Community = lazy(() => import("./pages/Community"));
const Communities = lazy(() => import("./pages/Communities"));
const CommunityDetails = lazy(() => import("./pages/CommunityDetails"));
const Bookings = lazy(() => import("./pages/Bookings"));
const BookingDetails = lazy(() => import("./pages/BookingDetails"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const KYCVerification = lazy(() => import("./pages/KYCVerification"));
const Messages = lazy(() => import("./pages/Messages"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Disputes = lazy(() => import("./pages/Disputes"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Header />
            <main>
              <Suspense fallback={
                <div className="container mx-auto px-4 py-8 space-y-4">
                  <Skeleton className="h-10 w-1/3" />
                  <Skeleton className="h-6 w-1/2" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                  </div>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/listings" element={<Listings />} />
                  <Route path="/listings/:id" element={<ListingDetails />} />
                  <Route path="/create-listing" element={<CreateListing />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/marketplace/:id" element={<ItemDetails />} />
                  <Route path="/create-item" element={<CreateItem />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/communities" element={<Communities />} />
                  <Route path="/communities/:slug" element={<CommunityDetails />} />
                  <Route path="/bookings" element={<Bookings />} />
                  <Route path="/bookings/:id" element={<BookingDetails />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/kyc" element={<KYCVerification />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/disputes" element={<Disputes />} />
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;