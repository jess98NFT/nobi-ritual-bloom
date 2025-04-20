
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Calendar, Heart, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/AppLayout";
import { WalletType } from "@/components/WalletConnect";
import { MembershipTier } from "@/components/MembershipCard";
import EventCard, { EventDetails } from "@/components/EventCard";

// Mock data
const upcomingEvents: EventDetails[] = [
  {
    id: "event-1",
    title: "Morning Journaling Salon",
    date: "May 2, 2025",
    time: "8:00 AM - 10:00 AM",
    location: "Nobi Space Downtown",
    description: "Start your day with intention through guided journaling prompts and discussion in our serene space.",
    capacity: 15,
    registered: 8,
    imageSrc: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    requiredTier: "standard",
  },
  {
    id: "event-2",
    title: "Breathwork & Sound Bath",
    date: "May 5, 2025",
    time: "7:30 PM - 9:00 PM",
    location: "Nobi Space Heights",
    description: "A guided breathwork session followed by a healing sound bath with crystal bowls.",
    capacity: 20,
    registered: 15,
    imageSrc: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
    requiredTier: "muse",
  },
  {
    id: "event-3",
    title: "Founding Members Dinner",
    date: "May 10, 2025",
    time: "6:30 PM - 9:30 PM",
    location: "Secret Garden Venue",
    description: "An intimate dinner for Founding Members to connect and co-create the future of Nobi Club.",
    capacity: 12,
    registered: 5,
    imageSrc: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    requiredTier: "founding",
  },
];

const HomePage = () => {
  // State management for wallet connection
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletType, setWalletType] = useState<WalletType>(null);
  const [walletAddress, setWalletAddress] = useState<string | undefined>();
  const [userTier, setUserTier] = useState<MembershipTier>(null);
  
  // Handle wallet connection
  const handleConnect = (type: WalletType, address: string) => {
    setWalletConnected(true);
    setWalletType(type);
    setWalletAddress(address);
    
    // Simulate checking for NFT membership
    // In a real app, we would query the blockchain
    setTimeout(() => {
      // Randomly assign a tier for demonstration purposes
      const tiers: MembershipTier[] = ["standard", "muse", "founding"];
      const randomTier = tiers[Math.floor(Math.random() * 3)];
      setUserTier(randomTier);
    }, 1000);
  };
  
  // Handle wallet disconnection
  const handleDisconnect = () => {
    setWalletConnected(false);
    setWalletType(null);
    setWalletAddress(undefined);
    setUserTier(null);
  };
  
  // Handle event RSVP
  const handleRSVP = (eventId: string) => {
    console.log(`RSVP for event ${eventId}`);
    // In a real app, we would send a transaction or API call
    alert(`Successfully RSVP'd for event! In a real app, this would interact with the blockchain.`);
  };

  return (
    <AppLayout
      userTier={userTier}
      walletConnected={walletConnected}
      walletAddress={walletAddress}
      walletType={walletType}
      onConnect={handleConnect}
      onDisconnect={handleDisconnect}
    >
      {/* Hero Section */}
      <section className="ritual-gradient py-20 px-4">
        <div className="container max-w-5xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
            Connect, Experience, Earn
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-gray-700">
            Your token-gated wellness community for accessing IRL ritual experiences and earning rewards.
          </p>
          
          {!walletConnected ? (
            <div className="flex justify-center gap-4 flex-wrap">
              <Button className="button-primary text-lg py-6 px-8" onClick={() => document.querySelector<HTMLButtonElement>('[aria-haspopup="dialog"]')?.click()}>
                Connect Wallet
              </Button>
              <Button asChild variant="outline" className="button-outline text-lg py-6 px-8">
                <Link to="/events">Browse Events</Link>
              </Button>
            </div>
          ) : (
            <div className="flex justify-center gap-4 flex-wrap">
              <Button className="button-primary text-lg py-6 px-8" asChild>
                <Link to="/events">Browse Events</Link>
              </Button>
              <Button asChild variant="outline" className="button-outline text-lg py-6 px-8">
                <Link to="/membership">View Membership</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="container max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl font-medium text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-nobi-beige mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8 text-nobi-rose" />
              </div>
              <h3 className="font-medium text-xl mb-2">Connect</h3>
              <p className="text-gray-600">Connect your wallet and verify your Nobi NFT membership to access exclusive events.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-nobi-rose mb-4 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-medium text-xl mb-2">Experience</h3>
              <p className="text-gray-600">RSVP for ritual-based events and check-in to collect Ritual Points.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-amber-200 mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-amber-800" />
              </div>
              <h3 className="font-medium text-xl mb-2">Earn</h3>
              <p className="text-gray-600">Earn and redeem Ritual Points for exclusive perks, products, and experiences.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Events Section */}
      <section className="py-16 px-4 bg-nobi-beige-light">
        <div className="container max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <h2 className="font-serif text-3xl font-medium">Featured Events</h2>
            <Link to="/events" className="text-nobi-rose-dark hover:underline">
              View all events
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                userTier={userTier}
                onRSVP={handleRSVP}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Membership Tiers */}
      <section className="py-16 px-4">
        <div className="container max-w-5xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-medium mb-3">Membership Tiers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Join our community with the membership tier that suits your wellness journey
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="ritual-card p-8 flex flex-col items-center tier-standard">
              <Star className="h-10 w-10 mb-4" />
              <h3 className="text-xl font-medium mb-2">Standard</h3>
              <ul className="text-left space-y-2 mb-6 w-full">
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-current mr-2" />
                  <span>Access to public events</span>
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-current mr-2" />
                  <span>Ritual points earning</span>
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-current mr-2" />
                  <span>Community Discord</span>
                </li>
              </ul>
              <Button className="bg-white/90 hover:bg-white text-gray-800 w-full" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">Get Standard Pass</a>
              </Button>
            </div>
            
            <div className="ritual-card p-8 flex flex-col items-center tier-muse transform scale-105 shadow-md">
              <Star className="h-10 w-10 mb-4" />
              <h3 className="text-xl font-medium mb-2">Muse</h3>
              <ul className="text-left space-y-2 mb-6 w-full">
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-current mr-2" />
                  <span>All Standard benefits</span>
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-current mr-2" />
                  <span>Early event access</span>
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-current mr-2" />
                  <span>Exclusive workshops</span>
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-current mr-2" />
                  <span>Limited edition merch</span>
                </li>
              </ul>
              <Button className="bg-white/90 hover:bg-white text-nobi-rose-dark w-full" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">Get Muse Pass</a>
              </Button>
            </div>
            
            <div className="ritual-card p-8 flex flex-col items-center tier-founding">
              <Star className="h-10 w-10 mb-4" />
              <h3 className="text-xl font-medium mb-2">Founding</h3>
              <ul className="text-left space-y-2 mb-6 w-full">
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-current mr-2" />
                  <span>All Muse benefits</span>
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-current mr-2" />
                  <span>Lifetime free events</span>
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-current mr-2" />
                  <span>Co-creation privileges</span>
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-current mr-2" />
                  <span>Private rituals</span>
                </li>
              </ul>
              <Button className="bg-white/90 hover:bg-white text-amber-800 w-full" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">Get Founding Pass</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default HomePage;
