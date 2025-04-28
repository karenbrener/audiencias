
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import { Contact, Audience } from '@/types/audience';
import { DataTable } from '@/components/ui/data-table';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

interface AudienciasManualEditorProps {
  isOpen: boolean;
  onClose: () => void;
  audience: Audience | null;
  onSave: (contacts: Contact[]) => void;
}

// Define column type for the DataTable that matches the expected interface
interface ContactColumn {
  accessorKey: keyof Contact | 'select';
  header: string;
  cell?: (info: { row: { original: Contact } }) => React.ReactNode;
}

const AudienciasManualEditor: React.FC<AudienciasManualEditorProps> = ({
  isOpen,
  onClose,
  audience,
  onSave,
}) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [newContactId, setNewContactId] = useState('');

  useEffect(() => {
    if (audience) {
      // Mock contacts data - in a real app, this would be fetched from the API
      const mockContacts = Array.from({ length: 20 }, (_, i) => ({
        id: `contact-${i + 1}`,
        name: `Contact ${i + 1}`,
        phone: `+34 ${Math.floor(600000000 + Math.random() * 99999999)}`,
        email: `contact${i + 1}@example.com`,
      }));
      setContacts(mockContacts);
      setSelectedContactIds([]);
    }
  }, [audience]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedContactIds(filteredContacts.map(contact => contact.id));
    } else {
      setSelectedContactIds([]);
    }
  };

  const handleSelectContact = (contactId: string, checked: boolean) => {
    if (checked) {
      setSelectedContactIds(prev => [...prev, contactId]);
    } else {
      setSelectedContactIds(prev => prev.filter(id => id !== contactId));
    }
  };

  const handleRemoveSelected = () => {
    setContacts(prev => prev.filter(contact => !selectedContactIds.includes(contact.id)));
    setSelectedContactIds([]);
    toast.success('Contactos removidos correctamente');
  };

  const handleAddContact = () => {
    if (!newContactId.trim()) {
      toast.error('Por favor, ingrese un ID de contacto');
      return;
    }
    
    // In a real app, you would validate and fetch the contact data from the API
    const newContact: Contact = {
      id: newContactId,
      name: `New Contact ${Math.floor(Math.random() * 100)}`,
      phone: `+34 ${Math.floor(600000000 + Math.random() * 99999999)}`,
      email: `new-${newContactId}@example.com`,
    };
    
    setContacts(prev => [...prev, newContact]);
    setNewContactId('');
    toast.success('Contacto agregado correctamente');
  };

  const handleSave = () => {
    onSave(contacts);
    onClose();
    toast.success('Cambios guardados correctamente');
  };

  const filteredContacts = searchValue
    ? contacts.filter(
        contact => 
          contact.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          contact.id.toLowerCase().includes(searchValue.toLowerCase())
      )
    : contacts;

  const columns: ContactColumn[] = [
    {
      accessorKey: 'select',
      header: 'Seleccionar',
      cell: (info: { row: { original: Contact } }) => (
        <Checkbox
          checked={selectedContactIds.includes(info.row.original.id)}
          onCheckedChange={(checked) => 
            handleSelectContact(info.row.original.id, checked as boolean)
          }
        />
      ),
    },
    {
      accessorKey: 'name',
      header: 'Nombre',
    },
    {
      accessorKey: 'phone',
      header: 'Teléfono',
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Editar Audiencia</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex justify-between mb-4">
            <div className="relative flex-grow mr-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nombre o ID"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Input
                placeholder="ID de contacto"
                value={newContactId}
                onChange={(e) => setNewContactId(e.target.value)}
                className="w-32"
              />
              <Button size="sm" onClick={handleAddContact} className="whitespace-nowrap">
                <Plus className="h-4 w-4 mr-1" />
                Agregar
              </Button>
            </div>
          </div>
          
          <div className="flex items-center mb-2">
            <Checkbox
              id="select-all"
              checked={selectedContactIds.length === filteredContacts.length && filteredContacts.length > 0}
              onCheckedChange={handleSelectAll}
            />
            <label htmlFor="select-all" className="ml-2 text-sm font-medium">
              Seleccionar todos
            </label>
          </div>
          
          <div className="mb-4 rounded-md border max-h-[300px] overflow-y-auto">
            {/* @ts-ignore - We know our Contact type is compatible with the DataTable */}
            <DataTable
              columns={columns}
              data={filteredContacts}
            />
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button
            variant="outline"
            onClick={handleRemoveSelected}
            disabled={selectedContactIds.length === 0}
          >
            Quitar seleccionados
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              Guardar cambios
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AudienciasManualEditor;
