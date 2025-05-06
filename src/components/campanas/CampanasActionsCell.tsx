
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Campaign } from '@/types/campaign';
import { Edit, Copy, Trash, ArrowDown, Play, Pause, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface CampanasActionsCellProps {
  campaign: Campaign;
  onEdit?: (campaign: Campaign) => void;
  onDelete: (campaignId: string) => void;
}

const CampanasActionsCell: React.FC<CampanasActionsCellProps> = ({
  campaign,
  onEdit = () => toast.info('Editar función no implementada'),
  onDelete,
}) => {
  const handleClone = () => {
    toast.success(`Campaña "${campaign.name}" clonada correctamente`);
  };

  const handleToggleStatus = () => {
    const action = campaign.status === 'in-progress' ? 'pausada' : 'activada';
    toast.success(`Campaña "${campaign.name}" ${action} correctamente`);
  };

  const handleViewMetrics = () => {
    toast.success(`Mostrando métricas de campaña "${campaign.name}"`);
  };

  return (
    <div className="flex space-x-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onEdit(campaign)}
        title="Editar"
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleClone}
        title="Clonar"
      >
        <Copy className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggleStatus}
        title={campaign.status === 'in-progress' ? 'Pausar' : 'Activar'}
      >
        {campaign.status === 'in-progress' ? 
          <Pause className="h-4 w-4" /> : 
          <Play className="h-4 w-4" />
        }
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleViewMetrics}
        title="Ver métricas"
      >
        <Eye className="h-4 w-4" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" title="Más acciones">
            <ArrowDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem 
            onClick={() => onDelete(campaign.id)}
            className="text-destructive"
          >
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CampanasActionsCell;
