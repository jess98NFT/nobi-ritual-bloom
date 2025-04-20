
import React from "react";
import { Sparkles, Star } from "lucide-react";

export type MembershipTier = "standard" | "muse" | "founding" | null;

interface MembershipCardProps {
  tier: MembershipTier;
  walletAddress?: string;
  tokenId?: string;
}

const MembershipCard: React.FC<MembershipCardProps> = ({ 
  tier, 
  walletAddress,
  tokenId = "#1842" 
}) => {
  if (!tier) return null;
  
  const getTierDetails = (tier: MembershipTier) => {
    switch (tier) {
      case "standard":
        return {
          name: "Standard",
          className: "tier-standard",
          icon: <Star className="h-5 w-5" />,
          perks: ["Access to public events", "Ritual points earning", "Community Discord"]
        };
      case "muse":
        return {
          name: "Muse",
          className: "tier-muse",
          icon: <Star className="h-5 w-5" />,
          perks: ["All Standard benefits", "Early event access", "Exclusive workshops", "Limited edition merch"]
        };
      case "founding":
        return {
          name: "Founding",
          className: "tier-founding",
          icon: <Sparkles className="h-5 w-5" />,
          perks: ["All Muse benefits", "Lifetime free events", "Co-creation privileges", "Private rituals"]
        };
      default:
        return {
          name: "Unknown",
          className: "bg-gray-200",
          icon: null,
          perks: []
        };
    }
  };

  const tierDetails = getTierDetails(tier);

  return (
    <div className="ritual-card p-1 max-w-md">
      <div className={`rounded-xl p-6 flex flex-col gap-4 ${tierDetails.className}`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {tierDetails.icon}
            <h3 className="text-xl font-medium">{tierDetails.name} Membership</h3>
          </div>
          <div className="font-mono text-xs opacity-70">{tokenId}</div>
        </div>

        <div className="flex flex-col gap-1 mt-2">
          {tierDetails.perks.map((perk, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
              <span>{perk}</span>
            </div>
          ))}
        </div>

        {walletAddress && (
          <div className="mt-4 pt-4 border-t border-current/20 text-xs font-mono opacity-60">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-6)}
          </div>
        )}
      </div>
    </div>
  );
};

export default MembershipCard;
