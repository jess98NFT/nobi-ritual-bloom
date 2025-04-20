
import React from "react";
import { Check, Lock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Perk {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  imageUrl: string;
  isUnlocked: boolean;
  type: 'event' | 'merch' | 'community';
}

interface PerksCardProps {
  perk: Perk;
  userPoints: number;
  onRedeem: (perkId: string) => void;
}

const PerksCard: React.FC<PerksCardProps> = ({ perk, userPoints, onRedeem }) => {
  const canRedeem = perk.isUnlocked || userPoints >= perk.pointsRequired;
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'event':
        return <div className="bg-blue-100 text-blue-600 rounded-full p-1"><Star className="h-4 w-4" /></div>;
      case 'merch':
        return <div className="bg-purple-100 text-purple-600 rounded-full p-1"><Star className="h-4 w-4" /></div>;
      case 'community':
        return <div className="bg-green-100 text-green-600 rounded-full p-1"><Star className="h-4 w-4" /></div>;
      default:
        return <div className="bg-gray-100 text-gray-600 rounded-full p-1"><Star className="h-4 w-4" /></div>;
    }
  };
  
  return (
    <div className="ritual-card overflow-hidden">
      <div className="h-40 relative">
        <img
          src={perk.imageUrl}
          alt={perk.title}
          className="w-full h-full object-cover"
        />
        
        {perk.isUnlocked && (
          <div className="absolute top-3 right-3 bg-green-100 text-green-600 rounded-full p-1.5">
            <Check className="h-4 w-4" />
          </div>
        )}
        
        <div className="absolute top-3 left-3">
          {getTypeIcon(perk.type)}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-medium">{perk.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{perk.description}</p>
        
        <div className="mt-4 flex justify-between items-center">
          {!perk.isUnlocked ? (
            <>
              <div className="text-sm font-medium">
                {perk.pointsRequired} points
              </div>
              
              {canRedeem ? (
                <Button 
                  className="button-primary py-1 px-4 text-sm" 
                  onClick={() => onRedeem(perk.id)}
                >
                  Unlock
                </Button>
              ) : (
                <div className="flex items-center text-gray-400 text-sm">
                  <Lock className="h-3 w-3 mr-1" />
                  <span>Locked</span>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="text-sm text-green-600 font-medium flex items-center">
                <Check className="h-3 w-3 mr-1" />
                <span>Unlocked</span>
              </div>
              
              <Button 
                className="button-outline py-1 px-4 text-sm"
                onClick={() => onRedeem(perk.id)}
              >
                Redeem
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerksCard;
