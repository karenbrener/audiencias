
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Audience } from '@/types/audience';
import AudienciasFilters from '@/components/audiencias/AudienciasFilters';
import AudienciasActionsCell from '@/components/audiencias/AudienciasActionsCell';
import AudienciasSidePanel from '@/components/audiencias/AudienciasSidePanel';
import { DataTable } from '@/components/ui/data-table';
import AudienciasManualEditor from '@/components/audiencias/AudienciasManualEditor';

// Mock data
const MOCK_AUDIENCES: Audience[] = [
  { id: '1', name: 'Propietarios Centro', size: 1245, lastRun: '2025-04-25', status: 'active' },
  { id: '2', name: 'Inversores Premium', size: 857, lastRun: '2025-04-22', status: 'active' },
  { id: '3', name: 'Compradores 2024', size: 2140, lastRun: '2025-04-15', status: 'active' },
  { id: '4', name: 'Vendedores potenciales', size: 412, lastRun: '2025-04-10', status: 'active' },
  { id: '5', name: 'Clientes antiguos', size: 1589, lastRun: '2025-03-30', status: 'archived' },
];

const AudienciasIndex: React.FC = () => {
  const navigate = useNavigate();
  const [audiences, setAudiences] = useState<Audience[]>(MOCK_AUDIENCES);
  const [filteredAudiences, setFilteredAudiences] = useState<Audience[]>(MOCK_AUDIENCES);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('activas');
  const [selectedAudience, setSelectedAudience] = useState<Audience | null>(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [audienceToEdit, setAudienceToEdit] = useState<Audience | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Filter audiences based on search term and status
  const applyFilters = () => {
    let filtered = [...audiences];
    
    // Apply status filter
    if (statusFilter === 'activas') {
      filtered = filtered.filter(audience => audience.status === 'active');
    } else if (statusFilter === 'archivadas') {
      filtered = filtered.filter(audience => audience.status === 'archived');
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(audience => 
        audience.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    
    setFilteredAudiences(filtered);
  };

  // Update filters when search term or status changes
  React.useEffect(() => {
    applyFilters();
  }, [searchTerm, statusFilter, audiences]);

  const handleCreateAudience = () => {
    navigate('/audiencias/constructor');
  };

  const handleEditAudience = (audience: Audience) => {
    setAudienceToEdit(audience);
    setIsEditorOpen(true);
  };

  const handleRowClick = (audience: Audience) => {
    setSelectedAudience(audience);
    if (!isSidePanelOpen) {
      setIsSidePanelOpen(true);
    }
  };

  const handleDeleteAudience = (audienceId: string) => {
    setAudiences(prev => prev.filter(audience => audience.id !== audienceId));
    
    if (selectedAudience?.id === audienceId) {
      setSelectedAudience(null);
    }
    
    toast.success('Audiencia eliminada correctamente');
  };

  const handleSaveContacts = (contacts: any[]) => {
    if (!audienceToEdit) return;
    
    setAudiences(prev => prev.map(audience => 
      audience.id === audienceToEdit.id 
        ? { ...audience, size: contacts.length } 
        : audience
    ));
    
    setAudienceToEdit(null);
    toast.success('Audiencia actualizada correctamente');
  };

  const columns = [
    {
      accessorKey: 'name',
      header: 'Nombre',
    },
    {
      accessorKey: 'size',
      header: 'Tamaño (nº contactos)',
    },
    {
      accessorKey: 'lastRun',
      header: 'Última ejecución',
    },
    {
      accessorKey: 'actions',
      header: 'Acciones',
      cell: (info: { row: { original: Audience } }) => (
        <AudienciasActionsCell
          audience={info.row.original}
          onEdit={handleEditAudience}
          onDelete={handleDeleteAudience}
        />
      ),
    },
  ];

  return (
    <div className="flex h-full">
      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Audiencias</h1>
          <Button onClick={handleCreateAudience} className="shrink-0">
            <plus className="h-4 w-4 mr-2" />
            Nueva Audiencia
          </Button>
        </div>
        
        <div className="mb-6">
          <AudienciasFilters 
            onSearchChange={setSearchTerm} 
            onStatusChange={setStatusFilter} 
          />
        </div>
        
        <div>
          <DataTable 
            columns={columns} 
            data={filteredAudiences} 
            onRowClick={handleRowClick}
            selectedRow={selectedAudience}
          />
        </div>
      </div>
      
      <AudienciasSidePanel 
        audience={selectedAudience} 
        isOpen={isSidePanelOpen} 
        onToggle={() => setIsSidePanelOpen(!isSidePanelOpen)}
      />
      
      <AudienciasManualEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        audience={audienceToEdit}
        onSave={handleSaveContacts}
      />
    </div>
  );
};

export default AudienciasIndex;
