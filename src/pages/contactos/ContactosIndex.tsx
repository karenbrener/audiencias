
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { Contact } from '@/types/contact';
import ContactosFilters from '@/components/contactos/ContactosFilters';
import ContactosActionsCell from '@/components/contactos/ContactosActionsCell';
import ContactosSidePanel from '@/components/contactos/ContactosSidePanel';
import CreateContactModal from '@/components/contactos/CreateContactModal';
import ContactosTags from '@/components/contactos/ContactosTags';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const mockContacts: Contact[] = [
  {
    id: 'cont1',
    name: 'Ana García',
    phone: '+34 666 777 888',
    age: 45,
    properties: 3,
    neighborhood: 'Salamanca',
    tags: ['Activo', 'Inversor'],
  },
  {
    id: 'cont2',
    name: 'Luis Martínez',
    phone: '+34 666 999 000',
    age: 62,
    properties: 6,
    neighborhood: 'Chamberí',
    tags: ['Excliente', 'Herencia'],
  },
];

const ContactosIndex = () => {
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);

  const handleSelectContact = (contact: Contact, checked: boolean) => {
    setSelectedContacts(prev => 
      checked 
        ? [...prev, contact]
        : prev.filter(c => c.id !== contact.id)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedContacts(checked ? contacts : []);
  };

  const handleCreateContact = (contact: Omit<Contact, 'id'>) => {
    const newContact = {
      ...contact,
      id: `cont${contacts.length + 1}`,
    };
    setContacts([...contacts, newContact]);
    setIsCreateModalOpen(false);
    toast.success('Contacto creado correctamente');
  };

  const handleDeleteContact = (contactId: string) => {
    setContacts(contacts.filter(c => c.id !== contactId));
    setSelectedContacts(selectedContacts.filter(c => c.id !== contactId));
    toast.success('Contacto eliminado correctamente');
  };

  const columns = [
    {
      id: 'select',
      header: ({ table }: any) => (
        <Checkbox
          checked={selectedContacts.length === contacts.length}
          onCheckedChange={(checked) => handleSelectAll(checked === true)}
        />
      ),
      cell: ({ row }: { row: { original: Contact } }) => (
        <Checkbox
          checked={selectedContacts.some(c => c.id === row.original.id)}
          onCheckedChange={(checked) => handleSelectContact(row.original, checked === true)}
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
    {
      accessorKey: 'age',
      header: 'Edad',
    },
    {
      accessorKey: 'properties',
      header: 'Nº Propiedades',
    },
    {
      accessorKey: 'neighborhood',
      header: 'Barrio',
    },
    {
      accessorKey: 'tags',
      header: 'Etiquetas',
      cell: ({ row }: { row: { original: Contact } }) => (
        <ContactosTags tags={row.original.tags} />
      ),
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }: { row: { original: Contact } }) => (
        <ContactosActionsCell contact={row.original} onDelete={handleDeleteContact} />
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contactos</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Contacto
        </Button>
      </div>

      <div className="bg-white p-4 rounded-md shadow-sm mb-6">
        <ContactosFilters />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <DataTable
            columns={columns}
            data={contacts}
          />
        </div>

        <div className="w-full md:w-1/3">
          <ContactosSidePanel contacts={selectedContacts} />
        </div>
      </div>

      <CreateContactModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateContact}
      />
    </div>
  );
};

export default ContactosIndex;
