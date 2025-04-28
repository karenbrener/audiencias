
import React from 'react';
import { Button } from '@/components/ui/button';
import { Contact } from '@/types/contact';
import ContactosTags from './ContactosTags';
import { MessageSquare, History } from 'lucide-react';

interface ContactosSidePanelProps {
  contacts: Contact[];
}

const ContactosSidePanel = ({ contacts }: ContactosSidePanelProps) => {
  if (contacts.length === 0) {
    return (
      <div className="bg-white rounded-md shadow-sm p-6">
        <p className="text-gray-500 text-center">
          Selecciona uno o más contactos para ver sus detalles
        </p>
      </div>
    );
  }

  const contact = contacts[0];

  return (
    <div className="bg-white rounded-md shadow-sm p-6 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-audience-lightPurple flex items-center justify-center text-audience-purple text-xl font-semibold">
            {contact.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{contact.name}</h3>
            <p className="text-gray-500">{contact.phone}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Edad</p>
            <p className="font-medium">{contact.age} años</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Propiedades</p>
            <p className="font-medium">{contact.properties}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Barrio</p>
            <p className="font-medium">{contact.neighborhood}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">Etiquetas</p>
          <ContactosTags tags={contact.tags} />
        </div>
      </div>

      <div className="space-y-3">
        <Button className="w-full">
          <MessageSquare className="w-4 h-4 mr-2" />
          Enviar mensaje
        </Button>
        <Button variant="outline" className="w-full">
          <History className="w-4 h-4 mr-2" />
          Ver historial de interacciones
        </Button>
      </div>
    </div>
  );
};

export default ContactosSidePanel;
