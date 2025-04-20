
import React from "react";
import { Calendar, Users, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MembershipTier } from "./MembershipCard";
import { Badge } from "@/components/ui/badge";

export interface EventDetails {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  capacity: number;
  registered: number;
  imageSrc: string;
  requiredTier: MembershipTier;
}

interface EventCardProps {
  event: EventDetails;
  userTier: MembershipTier;
  onRSVP: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, userTier, onRSVP }) => {
  // Check if user can access this event based on their tier
  const canAccess = userTier && (
    userTier === 'founding' || 
    (userTier === 'muse' && event.requiredTier !== 'founding') || 
    (userTier === 'standard' && event.requiredTier === 'standard')
  );
  
  const spotsLeft = event.capacity - event.registered;
  
  return (
    <div className="ritual-card max-w-md overflow-hidden flex flex-col">
      <div className="relative h-48">
        <img 
          src={event.imageSrc} 
          alt={event.title}
          className="w-full h-full object-cover" 
        />
        
        <div className="absolute top-3 right-3">
          {event.requiredTier === "founding" && (
            <Badge className="bg-amber-200 text-amber-900 hover:bg-amber-300">
              <Sparkles className="h-3 w-3 mr-1" /> Founding
            </Badge>
          )}
          
          {event.requiredTier === "muse" && (
            <Badge className="bg-nobi-rose text-white hover:bg-nobi-rose-dark">
              <Star className="h-3 w-3 mr-1" /> Muse
            </Badge>
          )}
        </div>
      </div>
      
      <div className="p-5 flex flex-col gap-3 flex-grow">
        <h3 className="text-xl font-medium">{event.title}</h3>
        
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{event.date} • {event.time}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <Users className="h-4 w-4 mr-2" />
          <span>{spotsLeft} spots left</span>
        </div>
        
        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
        
        <div className="mt-auto pt-4">
          {canAccess ? (
            <Button 
              className="button-primary w-full" 
              onClick={() => onRSVP(event.id)}
            >
              RSVP Now
            </Button>
          ) : (
            <Button 
              className="w-full bg-gray-200 hover:bg-gray-200 text-gray-500 cursor-not-allowed" 
              disabled
            >
              {userTier ? "Upgrade Membership" : "Connect Wallet"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
