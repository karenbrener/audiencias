
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { DataTable } from '@/components/ui/data-table';
import { Campaign } from '@/types/campaign';
import { Audience } from '@/types/audience';
import { Plus } from 'lucide-react';
import CampanasStatusCell from '@/components/campanas/CampanasStatusCell';
import CampanasActionsCell from '@/components/campanas/CampanasActionsCell';
import CampanasSidePanel from '@/components/campanas/CampanasSidePanel';
import CreateCampanaModal from '@/components/campanas/CreateCampanaModal';
import { toast } from 'sonner';

// Mock data
const mockAudiences: Audience[] = [
  {
    id: 'aud1',
    name: 'Propietarios Madrid',
    size: 450,
    lastRun: '2023-04-15',
    status: 'active',
    filters: {
      age: ['35-50', '+50'],
      properties: ['1', '2-5'],
      neighborhoods: ['Salamanca', 'Chamberí'],
    },
  },
  {
    id: 'aud2',
    name: 'Inversores - Alto valor',
    size: 120,
    lastRun: '2023-04-10',
    status: 'active',
    filters: {
      age: ['+50', '+70'],
      properties: ['+5'],
      neighborhoods: ['Retiro', 'Chamartín'],
    },
  },
  {
    id: 'aud3',
    name: 'Compradores potenciales',
    size: 780,
    lastRun: '2023-04-05',
    status: 'archived',
    filters: {
      age: ['20-35', '35-50'],
      properties: ['1'],
      neighborhoods: ['Tetuán', 'Chamberí'],
    },
  },
];

const mockCampaigns: Campaign[] = [
  {
    id: 'camp1',
    name: 'Promoción abril 2023',
    audienceId: 'aud1',
    audienceName: 'Propietarios Madrid',
    scheduledDate: '2023-04-28T10:00:00',
    status: 'scheduled',
  },
  {
    id: 'camp2',
    name: 'Evento exclusivo inversores',
    audienceId: 'aud2',
    audienceName: 'Inversores - Alto valor',
    scheduledDate: '2023-04-20T09:30:00',
    status: 'in-progress',
    metrics: {
      sent: 120,
      delivered: 118,
      read: 85
    }
  },
  {
    id: 'camp3',
    name: 'Promoción marzo 2023',
    audienceId: 'aud1',
    audienceName: 'Propietarios Madrid',
    scheduledDate: '2023-03-15T14:00:00',
    status: 'completed',
    metrics: {
      sent: 450,
      delivered: 442,
      read: 375
    }
  }
];

const CampanasIndex = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [audienceFilter, setAudienceFilter] = useState<string>('');
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const handleSelectCampaign = (campaign: Campaign) => {
    setSelectedCampaign(prev => prev?.id === campaign.id ? null : campaign);
  };
  
  const handleEditCampaign = (campaign: Campaign) => {
    toast.info(`Editando campaña: ${campaign.name}`);
  };
  
  const handleDeleteCampaign = (campaignId: string) => {
    toast.success('Campaña eliminada correctamente');
    setCampaigns(campaigns.filter(c => c.id !== campaignId));
    if (selectedCampaign?.id === campaignId) {
      setSelectedCampaign(null);
    }
  };
  
  const handleSaveCampaign = (name: string, audienceId: string, template: string, date: string) => {
    const audience = mockAudiences.find(a => a.id === audienceId);
    const newCampaign: Campaign = {
      id: `camp${campaigns.length + 1}`,
      name,
      audienceId,
      audienceName: audience?.name || '',
      scheduledDate: date,
      status: 'scheduled',
    };
    
    setCampaigns([...campaigns, newCampaign]);
    setIsCreateModalOpen(false);
    toast.success(`Campaña "${name}" creada correctamente`);
  };
  
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter ? campaign.status === statusFilter : true;
    const matchesAudience = audienceFilter ? campaign.audienceId === audienceFilter : true;
    
    return matchesSearch && matchesStatus && matchesAudience;
  });
  
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
      accessorKey: 'scheduledDate',
      header: 'Fecha Programada',
      cell: ({ row }: { row: { original: Campaign } }) => {
        const options: Intl.DateTimeFormatOptions = { 
          day: '2-digit', 
          month: 'short', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        };
        return new Date(row.original.scheduledDate).toLocaleDateString('es-ES', options);
      },
    },
    {
      accessorKey: 'status',
      header: 'Estado',
      cell: ({ row }: { row: { original: Campaign } }) => (
        <CampanasStatusCell campaign={row.original} />
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Acciones',
      cell: ({ row }: { row: { original: Campaign } }) => (
        <CampanasActionsCell 
          campaign={row.original} 
          onEdit={handleEditCampaign} 
          onDelete={handleDeleteCampaign}
        />
      ),
    },
  ];
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Campañas</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Campaña
        </Button>
      </div>
      
      <div className="bg-white p-4 rounded-md shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Select value={audienceFilter} onValueChange={setAudienceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Audiencia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas las audiencias</SelectItem>
                {mockAudiences.map(audience => (
                  <SelectItem key={audience.id} value={audience.id}>
                    {audience.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Input
              placeholder="Buscar campañas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos los estados</SelectItem>
                <SelectItem value="scheduled">Programadas</SelectItem>
                <SelectItem value="in-progress">En curso</SelectItem>
                <SelectItem value="completed">Finalizadas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <DataTable
            columns={columns}
            data={filteredCampaigns}
            onRowClick={handleSelectCampaign}
            selectedRow={selectedCampaign}
          />
        </div>
        
        <div className="w-full md:w-1/3 bg-white rounded-md shadow-sm">
          <CampanasSidePanel campaign={selectedCampaign} />
        </div>
      </div>
      
      <CreateCampanaModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveCampaign}
        audiences={mockAudiences}
      />
    </div>
  );
};

export default CampanasIndex;
