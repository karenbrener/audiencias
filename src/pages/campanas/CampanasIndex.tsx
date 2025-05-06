
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { DataTable } from '@/components/ui/data-table';
import CampanasFilters from '@/components/campanas/CampanasFilters';
import CreateCampanaModal from '@/components/campanas/CreateCampanaModal';
import CampanasActionsCell from '@/components/campanas/CampanasActionsCell';
import CampanasStatusCell from '@/components/campanas/CampanasStatusCell';
import CampanasSidePanel from '@/components/campanas/CampanasSidePanel';
import { Audience } from '@/types/audience';

// Mock data for campaigns
const mockCampaigns = [
  {
    id: 'camp1',
    name: 'Promoción verano',
    audienceName: 'Propietarios Centro',
    audienceSize: 1245,
    scheduledDate: '2025-06-15',
    status: 'scheduled',
    template: 'promotion',
  },
  {
    id: 'camp2',
    name: 'Seguimiento inversores',
    audienceName: 'Inversores Premium',
    audienceSize: 857,
    scheduledDate: '2025-06-05',
    status: 'sent',
    template: 'followup',
  },
  {
    id: 'camp3',
    name: 'Nuevas propiedades',
    audienceName: 'Compradores 2024',
    audienceSize: 2140,
    scheduledDate: '2025-05-10',
    status: 'sent',
    template: 'new_properties',
  },
  {
    id: 'camp4',
    name: 'Recordatorio evento',
    audienceName: 'Vendedores potenciales',
    audienceSize: 412,
    scheduledDate: '2025-06-10',
    status: 'scheduled',
    template: 'reminder',
  },
  {
    id: 'camp5',
    name: 'Descuentos especiales',
    audienceName: 'Clientes antiguos',
    audienceSize: 1589,
    scheduledDate: '2025-05-01',
    status: 'canceled',
    template: 'promotion',
  },
];

// Mock data for audiences
const mockAudiences: Audience[] = [
  { id: '1', name: 'Propietarios Centro', size: 1245, lastRun: '2025-04-25', status: 'active' },
  { id: '2', name: 'Inversores Premium', size: 857, lastRun: '2025-04-22', status: 'active' },
  { id: '3', name: 'Compradores 2024', size: 2140, lastRun: '2025-04-15', status: 'active' },
  { id: '4', name: 'Vendedores potenciales', size: 412, lastRun: '2025-04-10', status: 'active' },
  { id: '5', name: 'Clientes antiguos', size: 1589, lastRun: '2025-03-30', status: 'archived' },
];

const CampanasIndex = () => {
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [filteredCampaigns, setFilteredCampaigns] = useState(mockCampaigns);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todas');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  // Filter campaigns based on search term and status
  React.useEffect(() => {
    let filtered = [...campaigns];
    
    // Apply status filter
    if (statusFilter !== 'todas') {
      const statusMap: Record<string, string> = {
        'programadas': 'scheduled',
        'enviadas': 'sent',
        'canceladas': 'canceled',
      };
      filtered = filtered.filter(campaign => campaign.status === statusMap[statusFilter]);
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(campaign => 
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        campaign.audienceName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredCampaigns(filtered);
  }, [searchTerm, statusFilter, campaigns]);

  const handleCreateCampaign = (name: string, audienceId: string, template: string, date: string) => {
    const selectedAudience = mockAudiences.find(aud => aud.id === audienceId);
    
    const newCampaign = {
      id: `camp${campaigns.length + 1}`,
      name,
      audienceName: selectedAudience?.name || '',
      audienceSize: selectedAudience?.size || 0,
      scheduledDate: date,
      status: 'scheduled',
      template,
    };
    
    setCampaigns([...campaigns, newCampaign]);
    setIsCreateModalOpen(false);
    toast.success('Campaña creada correctamente');
  };

  const handleRowClick = (campaign: any) => {
    setSelectedCampaign(campaign);
    setIsSidePanelOpen(true);
  };

  const handleDeleteCampaign = (campaignId: string) => {
    setCampaigns(campaigns.filter(camp => camp.id !== campaignId));
    toast.success('Campaña eliminada correctamente');
    
    if (selectedCampaign && selectedCampaign.id === campaignId) {
      setSelectedCampaign(null);
      setIsSidePanelOpen(false);
    }
  };

  const columns = [
    {
      accessorKey: 'name',
      header: 'Nombre',
    },
    {
      accessorKey: 'audienceName',
      header: 'Audiencia',
    },
    {
      accessorKey: 'audienceSize',
      header: 'Nº Contactos',
    },
    {
      accessorKey: 'scheduledDate',
      header: 'Fecha programada',
    },
    {
      accessorKey: 'status',
      header: 'Estado',
      cell: ({ row }: { row: { original: any } }) => (
        <CampanasStatusCell status={row.original.status} />
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Acciones',
      cell: ({ row }: { row: { original: any } }) => (
        <CampanasActionsCell 
          campaign={row.original}
          onDelete={handleDeleteCampaign}
        />
      ),
    },
  ];

  return (
    <div className="flex h-full">
      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Campañas</h1>
          <Button onClick={() => setIsCreateModalOpen(true)} className="shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Campaña
          </Button>
        </div>

        <div className="bg-white p-4 rounded-md shadow-sm mb-6">
          <CampanasFilters 
            onSearchChange={setSearchTerm}
            onStatusChange={setStatusFilter}
          />
        </div>

        <div>
          <DataTable 
            columns={columns} 
            data={filteredCampaigns}
            onRowClick={handleRowClick}
            selectedRow={selectedCampaign}
          />
        </div>
      </div>
      
      <CampanasSidePanel 
        campaign={selectedCampaign}
        isOpen={isSidePanelOpen}
        onToggle={() => setIsSidePanelOpen(!isSidePanelOpen)}
      />
      
      <CreateCampanaModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateCampaign}
        audiences={mockAudiences}
      />
    </div>
  );
};

export default CampanasIndex;
