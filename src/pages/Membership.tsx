
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { WalletType } from "@/components/WalletConnect";
import MembershipCard, { MembershipTier } from "@/components/MembershipCard";
import RitualPoints from "@/components/RitualPoints";
import CheckInQRCode from "@/components/CheckInQRCode";

const MembershipPage = () => {
  // State management for wallet connection
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletType, setWalletType] = useState<WalletType>(null);
  const [walletAddress, setWalletAddress] = useState<string | undefined>();
  const [userTier, setUserTier] = useState<MembershipTier>(null);
  const [points, setPoints] = useState(0);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  
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
      
      // Simulate ritual points
      const randomPoints = Math.floor(Math.random() * 80) + 10;
      setPoints(randomPoints);
    }, 1000);
  };
  
  // Handle wallet disconnection
  const handleDisconnect = () => {
    setWalletConnected(false);
    setWalletType(null);
    setWalletAddress(undefined);
    setUserTier(null);
    setPoints(0);
    setIsCheckedIn(false);
  };
  
  // Handle check in
  const handleCheckIn = () => {
    setIsCheckedIn(true);
    
    // Add points for checking in
    setPoints(prevPoints => prevPoints + 10);
    
    // Show success message
    alert("Successfully checked in! You earned 10 Ritual Points.");
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
      <div className="container max-w-5xl mx-auto py-12 px-4">
        <h1 className="font-serif text-3xl md:text-4xl font-medium mb-8">My Nobi Membership</h1>
        
        {!walletConnected ? (
          <div className="ritual-card p-8 text-center">
            <h2 className="text-xl font-medium mb-4">Connect Your Wallet</h2>
            <p className="text-gray-600 mb-6">
              Connect your wallet to view your Nobi Club membership details and Ritual Points.
            </p>
            <button 
              className="button-primary"
              onClick={() => document.querySelector<HTMLButtonElement>('[aria-haspopup="dialog"]')?.click()}
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-8">
              <MembershipCard 
                tier={userTier}
                walletAddress={walletAddress}
                tokenId="#1842"
              />
              
              <RitualPoints 
                points={points}
                nextTierAt={userTier === "standard" ? 100 : userTier === "muse" ? 250 : 500}
              />
            </div>
            
            <div>
              <CheckInQRCode 
                eventId="current-event"
                walletAddress={walletAddress}
                isCheckedIn={isCheckedIn}
                onCheckIn={handleCheckIn}
              />
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default MembershipPage;
