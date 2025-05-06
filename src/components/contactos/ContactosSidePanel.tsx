
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Contact } from '@/types/contact';
import ContactosTags from './ContactosTags';
import { MessageSquare, History, Phone, Calendar, User, Home, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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
  
  // Mock data for history/activity
  const activityHistory = [
    { date: '2025-04-15', action: 'Campaña enviada', details: 'Promoción verano', status: 'Leído' },
    { date: '2025-03-02', action: 'Campaña enviada', details: 'Nuevas propiedades', status: 'No leído' },
    { date: '2025-02-10', action: 'Respuesta recibida', details: 'Solicita más información', status: '' }
  ];

  return (
    <div className="bg-white rounded-md shadow-sm p-4 space-y-5 overflow-y-auto max-h-[calc(100vh-180px)]">
      {/* Header with avatar and basic info */}
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-full bg-audience-lightPurple flex items-center justify-center text-audience-purple text-lg font-semibold flex-shrink-0">
          {contact.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold truncate">{contact.name}</h3>
          <div className="flex items-center gap-1 text-gray-500">
            <Phone className="h-3 w-3" />
            <span className="text-sm">{contact.phone}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 mt-1">
            <Calendar className="h-3 w-3" />
            <span className="text-xs">Creado: {contact.createdAt || '-'}</span>
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Main information cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="shadow-none border">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm font-medium flex items-center gap-1">
              <User className="h-4 w-4" />
              Datos personales
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-4 space-y-2">
            <div>
              <p className="text-xs text-gray-500">Edad</p>
              <p className="text-sm">{contact.age} años</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Estado</p>
              <span 
                className={`px-1.5 py-0.5 rounded-full text-xs font-medium inline-block
                  ${contact.status === 'Activo' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'}`}
              >
                {contact.status || '-'}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-none border">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm font-medium flex items-center gap-1">
              <Home className="h-4 w-4" />
              Propiedades
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-4 space-y-2">
            <div>
              <p className="text-xs text-gray-500">Número de propiedades</p>
              <p className="text-sm">{contact.properties}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Barrio</p>
              <p className="text-sm">{contact.neighborhood || '-'}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tags */}
      <Card className="shadow-none border">
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-sm font-medium">Etiquetas</CardTitle>
        </CardHeader>
        <CardContent className="py-2 px-4">
          {contact.tags.length > 0 ? (
            <ContactosTags tags={contact.tags} />
          ) : (
            <p className="text-sm text-gray-500">Sin etiquetas</p>
          )}
        </CardContent>
      </Card>
      
      {/* Audiences */}
      <Card className="shadow-none border">
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-sm font-medium">Audiencias</CardTitle>
        </CardHeader>
        <CardContent className="py-2 px-4">
          {contact.audiences && contact.audiences.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {contact.audiences.map(audience => (
                <span 
                  key={audience} 
                  className="px-1.5 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800"
                >
                  {audience}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No pertenece a ninguna audiencia</p>
          )}
        </CardContent>
      </Card>
      
      {/* Activity History */}
      <Card className="shadow-none border">
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-sm font-medium flex items-center gap-1">
            <History className="h-4 w-4" />
            Historial de actividad
          </CardTitle>
        </CardHeader>
        <CardContent className="py-0 px-0">
          <div className="divide-y">
            {activityHistory.map((activity, index) => (
              <div key={index} className="py-2 px-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.details}</p>
                  </div>
                  <div className="flex items-center">
                    {activity.status && (
                      <span 
                        className={`px-1.5 py-0.5 text-xs rounded-full 
                          ${activity.status === 'Leído' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'}`}
                      >
                        {activity.status}
                      </span>
                    )}
                    <span className="text-xs text-gray-400 ml-2">{activity.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Action buttons */}
      <div className="space-y-2 pt-2">
        <Button className="w-full">
          <MessageSquare className="w-4 h-4 mr-2" />
          Enviar mensaje
        </Button>
        <Button variant="outline" className="w-full">
          <History className="w-4 h-4 mr-2" />
          Ver interacciones completas
        </Button>
      </div>
    </div>
  );
};

export default ContactosSidePanel;
