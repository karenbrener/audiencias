
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Audience } from '@/types/audience';
import { Edit, Copy, Trash, ArrowRight, ArrowDown } from 'lucide-react';
import { toast } from 'sonner';

interface AudienciasActionsCellProps {
  audience: Audience;
  onEdit: (audience: Audience) => void;
  onDelete: (audienceId: string) => void;
}

const AudienciasActionsCell: React.FC<AudienciasActionsCellProps> = ({
  audience,
  onEdit,
  onDelete,
}) => {
  const handleClone = () => {
    toast.success(`Audiencia "${audience.name}" clonada correctamente`);
  };

  const handleExport = () => {
    toast.success(`Exportando "${audience.name}" en CSV...`);
  };

  const handleCreateCampaign = () => {
    toast.success(`Creando campaña con audiencia "${audience.name}"`);
  };

  return (
    <div className="flex space-x-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onEdit(audience)}
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" title="Más acciones">
            <ArrowDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleExport}>
            Exportar CSV
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCreateCampaign}>
            Crear Campaña
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onDelete(audience.id)}
            className="text-destructive"
          >
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AudienciasActionsCell;
