
import React, { ReactNode } from "react";
import AppHeader from "./AppHeader";
import { WalletType } from "./WalletConnect";
import { MembershipTier } from "./MembershipCard";

interface AppLayoutProps {
  children: ReactNode;
  userTier: MembershipTier;
  walletConnected: boolean;
  walletAddress?: string;
  walletType?: WalletType;
  onConnect: (walletType: WalletType, address: string) => void;
  onDisconnect: () => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  userTier,
  walletConnected,
  walletAddress,
  walletType,
  onConnect,
  onDisconnect,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-nobi-cream">
      <AppHeader
        userTier={userTier}
        walletConnected={walletConnected}
        walletAddress={walletAddress}
        walletType={walletType}
        onConnect={onConnect}
        onDisconnect={onDisconnect}
      />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-white border-t border-nobi-beige py-8">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="font-serif text-xl">Nobi Club</h2>
              <p className="text-sm text-gray-500 mt-1">Your ritual wellness community</p>
            </div>
            
            <div className="flex gap-8">
              <div className="text-sm">
                <h3 className="font-medium mb-2">Community</h3>
                <ul className="space-y-1 text-gray-500">
                  <li>Discord</li>
                  <li>Twitter</li>
                  <li>Instagram</li>
                </ul>
              </div>
              
              <div className="text-sm">
                <h3 className="font-medium mb-2">Resources</h3>
                <ul className="space-y-1 text-gray-500">
                  <li>FAQ</li>
                  <li>Terms</li>
                  <li>Privacy</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-nobi-beige text-center text-xs text-gray-400">
            &copy; 2025 Nobi Club. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
