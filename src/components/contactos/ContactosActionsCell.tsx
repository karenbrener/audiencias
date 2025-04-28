
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Contact } from '@/types/contact';
import { MoreHorizontal, Edit, History, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface ContactosActionsCellProps {
  contact: Contact;
  onDelete: (contactId: string) => void;
}

const ContactosActionsCell = ({ contact, onDelete }: ContactosActionsCellProps) => {
  const handleEdit = () => {
    toast.info('Editando contacto...');
  };

  const handleViewHistory = () => {
    toast.info('Viendo historial...');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menú</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleEdit}>
          <Edit className="mr-2 h-4 w-4" />
          <span>Editar</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleViewHistory}>
          <History className="mr-2 h-4 w-4" />
          <span>Ver historial</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onDelete(contact.id)}
          className="text-red-600"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Eliminar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ContactosActionsCell;
