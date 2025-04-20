
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, Scan, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export type WalletType = "polkadot" | "talisman" | null;

interface WalletConnectProps {
  onConnect: (walletType: WalletType, address: string) => void;
  isConnected: boolean;
  walletAddress?: string;
  onDisconnect: () => void;
}

const WalletConnect = ({ onConnect, isConnected, walletAddress, onDisconnect }: WalletConnectProps) => {
  const [open, setOpen] = useState(false);

  const handleConnect = (type: WalletType) => {
    // In real implementation, we would connect to the actual wallet
    // For now, simulate with a fake address
    const mockAddress = type === "polkadot" ? 
      "15oF4uVJwmo4TdGW7VfQxNLavjCXviqxT9S1MgbjMNHr6Sp5" : 
      "16ZL8yLyXv3V3L3z9ofR1ovFLziyXaN1DPq4yffMAZ9czzBD";
    
    onConnect(type, mockAddress);
    setOpen(false);
  };

  return (
    <>
      {!isConnected ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="button-primary flex items-center gap-2">
              <Wallet size={18} />
              Connect Wallet
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md ritual-gradient border-nobi-beige">
            <DialogHeader>
              <DialogTitle className="text-2xl text-center font-semibold">Connect Your Wallet</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <p className="text-center text-muted-foreground">
                Connect your wallet to access Nobi Club features and verify your membership status.
              </p>
              <Button 
                variant="outline" 
                className="flex justify-between items-center py-6 px-4 border-nobi-beige hover:border-nobi-rose"
                onClick={() => handleConnect("polkadot")}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center">
                    <span className="text-white font-bold">P</span>
                  </div>
                  <span className="font-medium">Polkadot.js</span>
                </div>
                <span className="text-xs text-muted-foreground">Recommended</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex justify-between items-center py-6 px-4 border-nobi-beige hover:border-nobi-rose"
                onClick={() => handleConnect("talisman")}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-purple-700 flex items-center justify-center">
                    <span className="text-white font-bold">T</span>
                  </div>
                  <span className="font-medium">Talisman</span>
                </div>
              </Button>
            </div>
            <div className="text-xs text-center text-gray-500 mt-2">
              By connecting, you agree to the Nobi Club Terms of Service
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="text-sm border-nobi-beige font-mono"
            size="sm"
          >
            {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onDisconnect}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </Button>
        </div>
      )}
    </>
  );
};

export default WalletConnect;
