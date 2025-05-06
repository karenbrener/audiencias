
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Campaign } from '@/types/campaign';
import { ArrowLeft, Copy, MessageSquare, History } from 'lucide-react';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

interface CampanasSidePanelProps {
  campaign: Campaign | null;
  isOpen: boolean;
  onToggle: () => void;
}

const CampanasSidePanel: React.FC<CampanasSidePanelProps> = ({
  campaign,
  isOpen,
  onToggle,
}) => {
  if (!isOpen || !campaign) {
    return null;
  }

  // Mock data for campaign details
  const campaignMetrics = {
    sent: 1245,
    delivered: 1230,
    failed: 15,
    read: 987,
    readRate: '80.2%',
    responses: 145,
    responseRate: '11.8%',
    messageText: 'Hola [nombre], tenemos nuevas propiedades disponibles en tu zona que podrían interesarte. ¿Te gustaría agendar una cita? Responde a este mensaje o llámanos.',
    lastEdited: '2025-05-01 18:32',
    editHistory: [
      { date: '2025-05-01 18:32', user: 'Admin', action: 'Actualización de texto' },
      { date: '2025-05-01 15:45', user: 'Admin', action: 'Creación de campaña' }
    ]
  };

  const handleDuplicate = () => {
    // In a real app, this would duplicate the campaign
    console.log('Duplicating campaign:', campaign.id);
  };

  return (
    <div className="w-[400px] border-l bg-background h-screen overflow-y-auto p-6">
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="mb-2"
          onClick={onToggle}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver al listado
        </Button>
        <h2 className="text-2xl font-bold">{campaign.name}</h2>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Detalles Completos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Audiencia</TableCell>
                  <TableCell>{campaign.audienceName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Tamaño de audiencia</TableCell>
                  <TableCell>{campaign.audienceSize || '-'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Fecha programada</TableCell>
                  <TableCell>{campaign.scheduledDate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Estado</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium 
                      ${campaign.status === 'sent' ? 'bg-green-100 text-green-800' : 
                        campaign.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {campaign.status === 'sent' ? 'Enviado' : 
                       campaign.status === 'scheduled' ? 'Programado' : 
                       campaign.status === 'canceled' ? 'Cancelado' : campaign.status}
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Envíos</TableCell>
                  <TableCell>{campaignMetrics.delivered} exitosos / {campaignMetrics.failed} fallidos</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Tasa de lectura</TableCell>
                  <TableCell>{campaignMetrics.readRate} ({campaignMetrics.read} leídos)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Tasa de respuesta</TableCell>
                  <TableCell>{campaignMetrics.responseRate} ({campaignMetrics.responses} respuestas)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Mensaje enviado</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{campaignMetrics.messageText}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Historial de ediciones</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-2 p-6">
              {campaignMetrics.editHistory.map((edit, index) => (
                <div key={index} className="flex items-start gap-2">
                  <History className="h-4 w-4 mt-1 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">{edit.action}</p>
                    <p className="text-xs text-gray-500">
                      {edit.user} • {edit.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button 
            className="w-full"
            onClick={handleDuplicate}
          >
            <Copy className="h-4 w-4 mr-2" />
            Duplicar campaña
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CampanasSidePanel;
