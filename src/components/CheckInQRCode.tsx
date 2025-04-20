
import React from "react";
import { Scan, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CheckInQRCodeProps {
  eventId: string;
  walletAddress?: string;
  isCheckedIn: boolean;
  onCheckIn: (eventId: string) => void;
}

const CheckInQRCode: React.FC<CheckInQRCodeProps> = ({
  eventId,
  walletAddress,
  isCheckedIn,
  onCheckIn,
}) => {
  // In a real implementation, we would generate a QR code that contains
  // the wallet address and event ID for scanning at the venue
  
  // For demonstration purposes, we'll simulate the QR code with a mock image 
  // and add a button that simulates scanning
  
  const handleCheckIn = () => {
    if (!isCheckedIn && walletAddress) {
      onCheckIn(eventId);
    }
  };
  
  return (
    <div className="ritual-card p-6 flex flex-col items-center text-center">
      <h3 className="text-xl font-medium mb-4">Event Check-in</h3>
      
      {isCheckedIn ? (
        <div className="flex flex-col items-center gap-3">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-green-600 font-medium">Successfully Checked In</p>
          <p className="text-sm text-gray-500">You've earned Ritual Points!</p>
        </div>
      ) : (
        <>
          {walletAddress ? (
            <div className="flex flex-col items-center gap-4">
              <div className="h-56 w-56 bg-gray-100 rounded-md flex items-center justify-center border border-nobi-beige relative">
                {/* This would be an actual QR code in production */}
                <div className="h-48 w-48 border-2 border-gray-300 rounded grid grid-cols-4 grid-rows-4 gap-1 p-2">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`
                        ${Math.random() > 0.5 ? 'bg-black' : 'bg-transparent'} 
                        ${(i === 0 || i === 3 || i === 12 || i === 15) ? 'rounded-lg bg-black' : ''}
                      `}
                    />
                  ))}
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-14 w-14 rounded-full bg-white/90 shadow-sm flex items-center justify-center">
                    <Scan className="h-8 w-8 text-nobi-rose-dark" />
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 max-w-xs">
                At the event, have the host scan this code to check in and earn Ritual Points
              </p>
              
              {/* This button is for demonstration only */}
              <Button 
                className="button-primary mt-2"
                onClick={handleCheckIn}
              >
                Simulate Check-in
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Scan className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-600">Connect your wallet to check in</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CheckInQRCode;
