
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

// Updated mock data with new fields
const mockContacts: Contact[] = [
  {
    id: 'cont1',
    name: 'Ana García',
    phone: '+34 666 777 888',
    age: 45,
    properties: 3,
    neighborhood: 'Salamanca',
    tags: ['Activo', 'Inversor'],
    lastCampaign: '2023-04-15',
    status: 'Activo',
    createdAt: '2022-11-20',
    audiences: ['Inversores', 'VIP'],
    responseStatus: 'Leído',
  },
  {
    id: 'cont2',
    name: 'Luis Martínez',
    phone: '+34 666 999 000',
    age: 62,
    properties: 6,
    neighborhood: 'Chamberí',
    tags: ['Excliente', 'Herencia'],
    lastCampaign: '2023-03-02',
    status: 'Inactivo',
    createdAt: '2022-09-05',
    audiences: ['Propietarios'],
    responseStatus: 'No leído',
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
      lastCampaign: '-',
      status: 'Activo',
      createdAt: new Date().toISOString().split('T')[0],
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

  // Enhanced columns with all requested data fields
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
      cell: ({ row }: { row: { original: Contact } }) => (
        <div className="text-sm font-medium">{row.original.name}</div>
      ),
    },
    {
      accessorKey: 'phone',
      header: 'Teléfono',
      cell: ({ row }: { row: { original: Contact } }) => (
        <div className="text-xs">{row.original.phone}</div>
      ),
    },
    {
      accessorKey: 'age',
      header: 'Edad',
      cell: ({ row }: { row: { original: Contact } }) => (
        <div className="text-xs text-center">{row.original.age}</div>
      ),
    },
    {
      accessorKey: 'properties',
      header: 'Nº Prop.',
      cell: ({ row }: { row: { original: Contact } }) => (
        <div className="text-xs text-center">{row.original.properties}</div>
      ),
    },
    {
      accessorKey: 'neighborhood',
      header: 'Barrio',
      cell: ({ row }: { row: { original: Contact } }) => (
        <div className="text-xs">{row.original.neighborhood}</div>
      ),
    },
    {
      accessorKey: 'audiences',
      header: 'Audiencias',
      cell: ({ row }: { row: { original: Contact } }) => (
        <div className="text-xs">
          {row.original.audiences?.join(', ') || '-'}
        </div>
      ),
    },
    {
      accessorKey: 'lastCampaign',
      header: 'Últ. campaña',
      cell: ({ row }: { row: { original: Contact } }) => (
        <div className="text-xs">{row.original.lastCampaign || '-'}</div>
      ),
    },
    {
      accessorKey: 'responseStatus',
      header: 'Estado resp.',
      cell: ({ row }: { row: { original: Contact } }) => (
        <div className={`px-1.5 py-0.5 rounded-full text-xs font-medium inline-block
          ${row.original.responseStatus === 'Leído' 
            ? 'bg-green-100 text-green-800' 
            : row.original.responseStatus === 'No leído'
              ? 'bg-gray-100 text-gray-800'
              : 'bg-blue-100 text-blue-800'}`}
        >
          {row.original.responseStatus || '-'}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Estado',
      cell: ({ row }: { row: { original: Contact } }) => (
        <div className={`px-1.5 py-0.5 rounded-full text-xs font-medium inline-block
          ${row.original.status === 'Activo' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'}`}
        >
          {row.original.status}
        </div>
      ),
    },
    {
      accessorKey: 'tags',
      header: 'Etiquetas',
      cell: ({ row }: { row: { original: Contact } }) => (
        <ContactosTags tags={row.original.tags} />
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Creación',
      cell: ({ row }: { row: { original: Contact } }) => (
        <div className="text-xs">{row.original.createdAt || '-'}</div>
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
