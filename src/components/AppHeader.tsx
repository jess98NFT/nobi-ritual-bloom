
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { WalletType } from "./WalletConnect";
import WalletConnect from "./WalletConnect";
import { MembershipTier } from "./MembershipCard";

interface AppHeaderProps {
  userTier: MembershipTier;
  walletConnected: boolean;
  walletAddress?: string;
  walletType?: WalletType;
  onConnect: (walletType: WalletType, address: string) => void;
  onDisconnect: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  userTier,
  walletConnected,
  walletAddress,
  walletType,
  onConnect,
  onDisconnect,
}) => {
  return (
    <header className="border-b border-nobi-beige sticky top-0 bg-white/80 backdrop-blur-md z-10">
      <div className="container max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-serif text-2xl font-medium">
            Nobi Club
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/events"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Events
            </Link>
            <Link
              to="/membership"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Membership
            </Link>
            <Link
              to="/perks"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Perks
            </Link>
          </nav>
        </div>

        <WalletConnect
          isConnected={walletConnected}
          walletAddress={walletAddress}
          onConnect={onConnect}
          onDisconnect={onDisconnect}
        />
      </div>
    </header>
  );
};

export default AppHeader;
