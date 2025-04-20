
import React, { useState } from "react";
import { Search, Filter, CalendarCheck, MapPin } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { WalletType } from "@/components/WalletConnect";
import { MembershipTier } from "@/components/MembershipCard";
import EventCard, { EventDetails } from "@/components/EventCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const allEvents: EventDetails[] = [
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
  {
    id: "event-4",
    title: "Scent Meditation Workshop",
    date: "May 12, 2025",
    time: "7:00 PM - 8:30 PM",
    location: "Nobi Space Downtown",
    description: "A guided meditation using custom scent blends to deepen your practice and engage your senses.",
    capacity: 18,
    registered: 7,
    imageSrc: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    requiredTier: "standard",
  },
  {
    id: "event-5",
    title: "New Moon Ritual Circle",
    date: "May 15, 2025",
    time: "8:00 PM - 10:00 PM",
    location: "Rooftop Garden",
    description: "Set intentions and connect with like-minded individuals during this new moon ceremony.",
    capacity: 25,
    registered: 20,
    imageSrc: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    requiredTier: "muse",
  },
  {
    id: "event-6",
    title: "Digital Detox Retreat",
    date: "May 18-20, 2025",
    time: "All Day",
    location: "Mountain Sanctuary",
    description: "A weekend retreat focused on disconnecting from technology and reconnecting with yourself.",
    capacity: 10,
    registered: 6,
    imageSrc: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    requiredTier: "founding",
  },
];

const EventsPage = () => {
  // State management for wallet connection
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletType, setWalletType] = useState<WalletType>(null);
  const [walletAddress, setWalletAddress] = useState<string | undefined>();
  const [userTier, setUserTier] = useState<MembershipTier>(null);
  
  // State for events filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Handle wallet connection
  const handleConnect = (type: WalletType, address: string) => {
    setWalletConnected(true);
    setWalletType(type);
    setWalletAddress(address);
    
    // Simulate checking for NFT membership
    setTimeout(() => {
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
    alert(`Successfully RSVP'd for event! In a real app, this would interact with the blockchain.`);
  };

  // Filter events based on search and active tab
  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") {
      return matchesSearch;
    } else if (activeTab === "standard") {
      return matchesSearch && event.requiredTier === "standard";
    } else if (activeTab === "muse") {
      return matchesSearch && event.requiredTier === "muse";
    } else if (activeTab === "founding") {
      return matchesSearch && event.requiredTier === "founding";
    }
    
    return matchesSearch;
  });

  return (
    <AppLayout
      userTier={userTier}
      walletConnected={walletConnected}
      walletAddress={walletAddress}
      walletType={walletType}
      onConnect={handleConnect}
      onDisconnect={handleDisconnect}
    >
      <div className="container max-w-6xl mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-medium mb-2">Upcoming Rituals</h1>
            <p className="text-gray-600">Discover and RSVP to our carefully curated events</p>
          </div>
          
          <div className="w-full md:w-72">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                className="input-field pl-9" 
                placeholder="Search events..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="bg-nobi-beige-light w-full justify-start overflow-x-auto">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="standard">Standard</TabsTrigger>
            <TabsTrigger value="muse">Muse</TabsTrigger>
            <TabsTrigger value="founding">Founding</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  userTier={userTier}
                  onRSVP={handleRSVP}
                />
              ))}
            </div>
            
            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No events found matching your search.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="standard" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  userTier={userTier}
                  onRSVP={handleRSVP}
                />
              ))}
            </div>
            
            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No Standard events found matching your search.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="muse" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  userTier={userTier}
                  onRSVP={handleRSVP}
                />
              ))}
            </div>
            
            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No Muse events found matching your search.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="founding" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  userTier={userTier}
                  onRSVP={handleRSVP}
                />
              ))}
            </div>
            
            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No Founding events found matching your search.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default EventsPage;
