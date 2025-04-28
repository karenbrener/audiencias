
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Contact } from '@/types/contact';
import { useForm } from 'react-hook-form';

interface CreateContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contact: Omit<Contact, 'id'>) => void;
}

const CreateContactModal = ({ isOpen, onClose, onSave }: CreateContactModalProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Omit<Contact, 'id'>>();

  const onSubmit = (data: Omit<Contact, 'id'>) => {
    onSave({
      ...data,
      tags: [],
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nuevo Contacto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre *</Label>
            <Input
              id="name"
              {...register('name', { required: true })}
              className={errors.name ? 'border-red-500' : ''}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono *</Label>
            <Input
              id="phone"
              {...register('phone', { required: true })}
              className={errors.phone ? 'border-red-500' : ''}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Edad *</Label>
            <Input
              id="age"
              type="number"
              {...register('age', { required: true, valueAsNumber: true })}
              className={errors.age ? 'border-red-500' : ''}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="properties">Nº de propiedades *</Label>
            <Input
              id="properties"
              type="number"
              {...register('properties', { required: true, valueAsNumber: true })}
              className={errors.properties ? 'border-red-500' : ''}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="neighborhood">Barrio *</Label>
            <Input
              id="neighborhood"
              {...register('neighborhood', { required: true })}
              className={errors.neighborhood ? 'border-red-500' : ''}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas internas</Label>
            <Input id="notes" {...register('notes')} />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Guardar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateContactModal;
