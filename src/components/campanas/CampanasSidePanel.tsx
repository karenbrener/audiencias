
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Campaign } from '@/types/campaign';
import { NavLink } from 'react-router-dom';
import { Eye } from 'lucide-react';

interface CampanasSidePanelProps {
  campaign: Campaign | null;
}

const CampanasSidePanel: React.FC<CampanasSidePanelProps> = ({ campaign }) => {
  if (!campaign) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground p-4">
        <p className="text-center">Selecciona una campaña para ver sus detalles</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">{campaign.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Audiencia:</p>
            <p className="text-sm">
              <NavLink 
                to={`/audiencias?id=${campaign.audienceId}`} 
                className="text-audience-purple hover:underline"
              >
                {campaign.audienceName}
              </NavLink>
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Fecha y hora de envío:</p>
            <p className="text-sm">{formatDate(campaign.scheduledDate)}</p>
          </div>
          
          {campaign.metrics && (
            <div className="space-y-2 pt-2">
              <p className="text-sm font-medium text-muted-foreground">Métricas:</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-gray-50 p-2 rounded-md text-center">
                  <p className="text-lg font-medium">{campaign.metrics.sent}</p>
                  <p className="text-xs text-muted-foreground">Enviados</p>
                </div>
                <div className="bg-gray-50 p-2 rounded-md text-center">
                  <p className="text-lg font-medium">{campaign.metrics.delivered}</p>
                  <p className="text-xs text-muted-foreground">Entregados</p>
                </div>
                <div className="bg-gray-50 p-2 rounded-md text-center">
                  <p className="text-lg font-medium">{campaign.metrics.read}</p>
                  <p className="text-xs text-muted-foreground">Leídos</p>
                </div>
              </div>
            </div>
          )}
          
          <Button className="w-full mt-4" variant="outline">
            <Eye className="mr-2 h-4 w-4" /> Ver detalles completos
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampanasSidePanel;
