
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { Contact } from '@/types/audience';
import { toast } from 'sonner';
import AudienciasFilterPanel from '@/components/audiencias/AudienciasFilterPanel';
import AudienciasResultsPanel from '@/components/audiencias/AudienciasResultsPanel';
import AudienciasManualEditor from '@/components/audiencias/AudienciasManualEditor';

// Mock data for contacts
const generateMockContacts = (count: number): Contact[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `contact-${i + 1}`,
    name: `Contact ${i + 1}`,
    phone: `+34 ${Math.floor(600000000 + Math.random() * 99999999)}`,
    email: `contact${i + 1}@example.com`,
  }));
};

const AudienciasConstructor: React.FC = () => {
  const navigate = useNavigate();
  const [audienceName, setAudienceName] = useState('Nueva audiencia');
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>(generateMockContacts(15));
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  const handleBack = () => {
    navigate('/audiencias');
  };
  
  const handleNameClick = () => {
    setIsNameEditing(true);
  };
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAudienceName(e.target.value);
  };
  
  const handleNameBlur = () => {
    setIsNameEditing(false);
    if (audienceName.trim() === '') {
      setAudienceName('Nueva audiencia');
    }
  };
  
  const handleFilterChange = (filters: any) => {
    console.log('Filters changed:', filters);
    
    // In a real app, this would trigger an API call to get filtered contacts
    // For now, let's simulate filtering by changing the number of contacts randomly
    const filteredCount = Math.floor(Math.random() * 30) + 5;
    setContacts(generateMockContacts(filteredCount));
    setHasChanges(true);
  };
  
  const handleViewAll = () => {
    setIsEditorOpen(true);
  };
  
  const handleSaveContacts = (updatedContacts: Contact[]) => {
    setContacts(updatedContacts);
    toast.success('Contactos actualizados correctamente');
  };
  
  const handleSave = () => {
    // In a real app, this would save the audience to the backend
    toast.success(`Audiencia "${audienceName}" guardada correctamente`);
    navigate('/audiencias');
  };
  
  const handleSnapshot = () => {
    toast.success('Snapshot creado correctamente');
  };
  
  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="mb-2 inline-flex items-center text-gray-500 hover:text-gray-700"
            onClick={handleBack}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Volver a Audiencias
          </Button>
          
          <div className="flex items-center">
            {isNameEditing ? (
              <Input
                value={audienceName}
                onChange={handleNameChange}
                onBlur={handleNameBlur}
                autoFocus
                className="text-2xl font-bold py-0 h-auto"
              />
            ) : (
              <h1
                className="text-2xl font-bold text-gray-900 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                onClick={handleNameClick}
              >
                {audienceName}
              </h1>
            )}
          </div>
        </div>
        
        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            className="flex-1 sm:flex-auto"
            onClick={handleSnapshot}
          >
            Snapshot
          </Button>
          <Button 
            className="flex-1 sm:flex-auto"
            disabled={!hasChanges}
            onClick={handleSave}
          >
            <Check className="h-4 w-4 mr-2" />
            Guardar
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
        <div className="md:col-span-1">
          <AudienciasFilterPanel onFilterChange={handleFilterChange} />
        </div>
        <div className="md:col-span-2">
          <AudienciasResultsPanel 
            contacts={contacts} 
            onViewAll={handleViewAll}
          />
        </div>
      </div>
      
      <AudienciasManualEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        audience={{ id: 'new', name: audienceName, size: contacts.length, lastRun: new Date().toISOString().split('T')[0], status: 'active' }}
        onSave={handleSaveContacts}
      />
    </div>
  );
};

export default AudienciasConstructor;
