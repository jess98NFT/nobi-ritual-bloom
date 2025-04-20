
import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { WalletType } from "@/components/WalletConnect";
import { MembershipTier } from "@/components/MembershipCard";
import PerksCard, { Perk } from "@/components/PerksCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock perks data
const allPerks: Perk[] = [
  {
    id: "perk-1",
    title: "Private Journaling Workshop",
    description: "Exclusive small-group workshop with renowned journaling expert",
    pointsRequired: 50,
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    isUnlocked: false,
    type: "event"
  },
  {
    id: "perk-2",
    title: "Nobi Limited Edition Candle",
    description: "Hand-poured ritual candle with custom scent blend",
    pointsRequired: 75,
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    isUnlocked: false,
    type: "merch"
  },
  {
    id: "perk-3",
    title: "Early Access to Summer Retreat",
    description: "Book your spot 2 weeks before general release",
    pointsRequired: 100,
    imageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
    isUnlocked: false,
    type: "event"
  },
  {
    id: "perk-4",
    title: "Custom Ritual Journal",
    description: "Leather-bound journal with your name embossed",
    pointsRequired: 120,
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    isUnlocked: false,
    type: "merch"
  },
  {
    id: "perk-5",
    title: "Private Discord Channel",
    description: "Access to the Inner Circle channel with founders",
    pointsRequired: 200,
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    isUnlocked: false,
    type: "community"
  },
  {
    id: "perk-6",
    title: "Co-Creation Session",
    description: "Help shape the future of Nobi Club in a private session",
    pointsRequired: 300,
    imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    isUnlocked: false,
    type: "community"
  },
];

const PerksPage = () => {
  // State management for wallet connection
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletType, setWalletType] = useState<WalletType>(null);
  const [walletAddress, setWalletAddress] = useState<string | undefined>();
  const [userTier, setUserTier] = useState<MembershipTier>(null);
  const [userPoints, setUserPoints] = useState(0);
  const [perks, setPerks] = useState(allPerks);
  
  // Handle wallet connection
  const handleConnect = (type: WalletType, address: string) => {
    setWalletConnected(true);
    setWalletType(type);
    setWalletAddress(address);
    
    // Simulate checking for NFT membership and points
    setTimeout(() => {
      const tiers: MembershipTier[] = ["standard", "muse", "founding"];
      const randomTier = tiers[Math.floor(Math.random() * 3)];
      setUserTier(randomTier);
      
      const randomPoints = Math.floor(Math.random() * 150) + 30;
      setUserPoints(randomPoints);
      
      // Update perks based on points
      setPerks(prev => prev.map(perk => ({
        ...perk,
        isUnlocked: randomPoints >= perk.pointsRequired
      })));
    }, 1000);
  };
  
  // Handle wallet disconnection
  const handleDisconnect = () => {
    setWalletConnected(false);
    setWalletType(null);
    setWalletAddress(undefined);
    setUserTier(null);
    setUserPoints(0);
    setPerks(allPerks);
  };
  
  // Handle redeeming a perk
  const handleRedeemPerk = (perkId: string) => {
    alert(`Perk redeemed! In a real app, this would interact with the blockchain.`);
    // In a real app, this would send a transaction or API call
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
      <div className="container max-w-6xl mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-medium mb-2">Ritual Rewards</h1>
            <p className="text-gray-600">Unlock exclusive perks with your Ritual Points</p>
          </div>
          
          {walletConnected && (
            <div className="bg-nobi-beige/50 px-4 py-2 rounded-full flex items-center gap-2 mt-4 md:mt-0">
              <div className="h-3 w-3 bg-nobi-rose rounded-full"></div>
              <span className="font-medium">{userPoints} Points</span>
            </div>
          )}
        </div>
        
        {!walletConnected ? (
          <div className="ritual-card p-8 text-center">
            <h2 className="text-xl font-medium mb-4">Connect Your Wallet</h2>
            <p className="text-gray-600 mb-6">
              Connect your wallet to view and redeem rewards with your Ritual Points.
            </p>
            <button 
              className="button-primary"
              onClick={() => document.querySelector<HTMLButtonElement>('[aria-haspopup="dialog"]')?.click()}
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          <>
            <Tabs defaultValue="all" className="mb-6">
              <TabsList className="bg-nobi-beige-light">
                <TabsTrigger value="all">All Perks</TabsTrigger>
                <TabsTrigger value="event">Events</TabsTrigger>
                <TabsTrigger value="merch">Merchandise</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {perks.map(perk => (
                    <PerksCard 
                      key={perk.id}
                      perk={perk}
                      userPoints={userPoints}
                      onRedeem={handleRedeemPerk}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="event" className="mt-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {perks.filter(p => p.type === "event").map(perk => (
                    <PerksCard 
                      key={perk.id}
                      perk={perk}
                      userPoints={userPoints}
                      onRedeem={handleRedeemPerk}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="merch" className="mt-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {perks.filter(p => p.type === "merch").map(perk => (
                    <PerksCard 
                      key={perk.id}
                      perk={perk}
                      userPoints={userPoints}
                      onRedeem={handleRedeemPerk}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="community" className="mt-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {perks.filter(p => p.type === "community").map(perk => (
                    <PerksCard 
                      key={perk.id}
                      perk={perk}
                      userPoints={userPoints}
                      onRedeem={handleRedeemPerk}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default PerksPage;
