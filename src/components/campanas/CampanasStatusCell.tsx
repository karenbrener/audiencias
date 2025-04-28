
import React from 'react';
import { Campaign } from '@/types/campaign';
import { Circle, CheckCircle, Clock } from 'lucide-react';

interface CampanasStatusCellProps {
  campaign: Campaign;
}

const CampanasStatusCell: React.FC<CampanasStatusCellProps> = ({ campaign }) => {
  const getStatusIcon = () => {
    switch (campaign.status) {
      case 'scheduled':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'in-progress':
        return <Circle className="h-4 w-4 text-green-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (campaign.status) {
      case 'scheduled':
        return 'Programada';
      case 'in-progress':
        return 'En curso';
      case 'completed':
        return 'Finalizada';
      default:
        return '';
    }
  };

  return (
    <div className="flex items-center gap-2">
      {getStatusIcon()}
      <span className="text-sm">{getStatusText()}</span>
    </div>
  );
};

export default CampanasStatusCell;
