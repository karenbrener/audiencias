
import React from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { AgeRange, PropertiesRange } from '@/types/contact';

const ageRanges: AgeRange[] = ['20-35', '35-50', '50-70', '70+'];
const propertyRanges: PropertiesRange[] = ['1', '2-5', '5+'];
const neighborhoods = ['Salamanca', 'Chamberí', 'Retiro', 'Chamartín', 'Tetuán'];

const ContactosFilters = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <Input
          placeholder="Buscar por nombre, teléfono o ID..."
          className="w-full"
        />
      </div>

      <div>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por audiencia" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las audiencias</SelectItem>
            <SelectItem value="propietarios">Propietarios Madrid</SelectItem>
            <SelectItem value="inversores">Inversores - Alto valor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="space-y-2">
            <Label>Edad</Label>
            <div className="flex flex-wrap gap-4">
              {ageRanges.map(range => (
                <div key={range} className="flex items-center space-x-2">
                  <Checkbox id={`age-${range}`} />
                  <Label htmlFor={`age-${range}`}>{range}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Propiedades</Label>
          <div className="flex flex-wrap gap-4">
            {propertyRanges.map(range => (
              <div key={range} className="flex items-center space-x-2">
                <Checkbox id={`prop-${range}`} />
                <Label htmlFor={`prop-${range}`}>{range}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Barrios</Label>
          <div className="flex flex-wrap gap-4">
            {neighborhoods.map(neighborhood => (
              <div key={neighborhood} className="flex items-center space-x-2">
                <Checkbox id={`neighborhood-${neighborhood}`} />
                <Label htmlFor={`neighborhood-${neighborhood}`}>{neighborhood}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactosFilters;
