
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Audience } from '@/types/audience';
import { toast } from 'sonner';

interface CreateCampanaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, audienceId: string, template: string, date: string) => void;
  audiences: Audience[];
}

const templateOptions = [
  { id: 'template1', name: 'Promoción mensual' },
  { id: 'template2', name: 'Recordatorio de cita' },
  { id: 'template3', name: 'Notificación de evento' }
];

const CreateCampanaModal: React.FC<CreateCampanaModalProps> = ({
  isOpen,
  onClose,
  onSave,
  audiences,
}) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [audienceId, setAudienceId] = useState('');
  const [template, setTemplate] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  
  const handleNextStep = () => {
    if (step === 1 && !audienceId) {
      toast.error('Por favor selecciona una audiencia');
      return;
    }
    if (step === 2 && !template) {
      toast.error('Por favor selecciona una plantilla');
      return;
    }
    if (step === 4) {
      if (!name) {
        toast.error('Por favor ingresa un nombre para la campaña');
        return;
      }
      if (!scheduledDate) {
        toast.error('Por favor programa una fecha y hora');
        return;
      }
      
      onSave(name, audienceId, template, scheduledDate);
      handleReset();
      return;
    }
    
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleReset = () => {
    setStep(1);
    setName('');
    setAudienceId('');
    setTemplate('');
    setScheduledDate('');
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const selectedAudience = audiences.find(aud => aud.id === audienceId);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nueva Campaña</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex mb-6">
            {[1, 2, 3, 4].map(s => (
              <div 
                key={s} 
                className={`flex-1 h-2 mx-1 rounded ${s <= step ? 'bg-audience-purple' : 'bg-gray-200'}`}
              />
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-base font-medium">Paso 1: Seleccionar audiencia</h3>
              <Select value={audienceId} onValueChange={setAudienceId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una audiencia" />
                </SelectTrigger>
                <SelectContent>
                  {audiences.map(audience => (
                    <SelectItem key={audience.id} value={audience.id}>
                      {audience.name} ({audience.size} contactos)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedAudience && (
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm mb-2 font-medium">Filtros aplicados:</p>
                  <ul className="text-xs text-muted-foreground">
                    {selectedAudience.filters?.age && (
                      <li>Edad: {selectedAudience.filters.age.join(', ')}</li>
                    )}
                    {selectedAudience.filters?.properties && (
                      <li>Propiedades: {selectedAudience.filters.properties.join(', ')}</li>
                    )}
                    {selectedAudience.filters?.neighborhoods && (
                      <li>Barrios: {selectedAudience.filters.neighborhoods.join(', ')}</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-base font-medium">Paso 2: Elegir plantilla</h3>
              <Select value={template} onValueChange={setTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una plantilla de WhatsApp" />
                </SelectTrigger>
                <SelectContent>
                  {templateOptions.map(t => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {template && (
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm mb-2 font-medium">Vista previa:</p>
                  <div className="bg-white border border-gray-200 rounded-lg p-3 text-sm">
                    <p>Hola <span className="bg-yellow-100 px-1">{"{{nombre}}"}</span>,</p>
                    <p className="my-1">Gracias por ser parte de nuestra comunidad. Tenemos una oferta especial para ti.</p>
                    <p>Contacta con nosotros al <span className="bg-yellow-100 px-1">{"{{telefono}}"}</span>.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-base font-medium">Paso 3: Variables dinámicas</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm mb-1">Variable "nombre"</p>
                    <Select defaultValue="contact_name">
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar campo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contact_name">Nombre de contacto</SelectItem>
                        <SelectItem value="first_name">Primer nombre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <p className="text-sm mb-1">Variable "telefono"</p>
                    <Select defaultValue="contact_phone">
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar campo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contact_phone">Teléfono de contacto</SelectItem>
                        <SelectItem value="mobile_phone">Teléfono móvil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-base font-medium">Paso 4: Detalles y programación</h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-sm">Nombre de la campaña</p>
                  <Input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Nombre de campaña"
                  />
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm">Fecha y hora de envío</p>
                  <Input
                    type="datetime-local"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                  />
                </div>
                
                <div>
                  <p className="text-sm mb-1">Zona horaria</p>
                  <Select defaultValue="europe-madrid">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar zona horaria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="europe-madrid">Europa/Madrid (GMT+1)</SelectItem>
                      <SelectItem value="america-bogota">América/Bogotá (GMT-5)</SelectItem>
                      <SelectItem value="america-mexico">América/México (GMT-6)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex justify-between">
          <div>
            {step > 1 && (
              <Button type="button" variant="outline" onClick={handlePrevStep}>
                Anterior
              </Button>
            )}
          </div>
          <div className="space-x-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button 
              type="button"
              onClick={handleNextStep}
            >
              {step === 4 ? 'Confirmar y crear' : 'Siguiente'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCampanaModal;
