
import React from 'react';
import { Circle, CheckCircle, Clock, XCircle } from 'lucide-react';

interface CampanasStatusCellProps {
  status: string;
}

const CampanasStatusCell: React.FC<CampanasStatusCellProps> = ({ status }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'scheduled':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'in-progress':
        return <Circle className="h-4 w-4 text-green-500" />;
      case 'sent':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'canceled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'scheduled':
        return 'Programada';
      case 'in-progress':
        return 'En curso';
      case 'sent':
        return 'Enviada';
      case 'canceled':
        return 'Cancelada';
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
