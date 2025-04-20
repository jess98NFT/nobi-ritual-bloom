
import React from "react";
import { Progress } from "@/components/ui/progress";

interface RitualPointsProps {
  points: number;
  nextTierAt?: number;
}

const RitualPoints: React.FC<RitualPointsProps> = ({ points, nextTierAt = 100 }) => {
  // Calculate progress percentage
  const progressPercentage = Math.min(Math.round((points / nextTierAt) * 100), 100);
  
  return (
    <div className="ritual-card p-6">
      <h3 className="text-xl font-medium mb-2">Ritual Points</h3>
      
      <div className="flex justify-between items-center mb-2">
        <span className="text-3xl font-medium">{points}</span>
        <span className="text-sm text-gray-500">Next tier: {nextTierAt}</span>
      </div>
      
      <Progress value={progressPercentage} className="h-3 bg-nobi-beige-light">
        <div 
          className="h-full bg-gradient-to-r from-nobi-rose to-nobi-rose-dark rounded-full"
          style={{ width: `${progressPercentage}%` }}
        />
      </Progress>
      
      <div className="mt-4 text-sm text-gray-600">
        <p className="mb-1">
          Attend events and check-in to earn Ritual Points
        </p>
        <p>
          Points unlock exclusive perks, experiences and products
        </p>
      </div>
      
      <div className="mt-4 pt-4 border-t border-nobi-beige">
        <h4 className="text-sm font-medium mb-2">Recent Activity</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Breathwork Session</span>
            <span className="font-medium">+10 points</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Journaling Workshop</span>
            <span className="font-medium">+15 points</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Scent Meditation</span>
            <span className="font-medium">+8 points</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RitualPoints;
