
import React from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { AgeRange, PropertiesRange } from '@/types/contact';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

const ageRanges: AgeRange[] = ['20-35', '35-50', '50-70', '70+'];
const propertyRanges: PropertiesRange[] = ['1', '2-5', '5+'];
const neighborhoods = ['Salamanca', 'Chamberí', 'Retiro', 'Chamartín', 'Tetuán'];

const ContactosFilters = () => {
  const [selectedNeighborhoods, setSelectedNeighborhoods] = React.useState<string[]>([]);

  return (
    <div className="p-4 bg-white border rounded-md shadow-sm space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="w-64">
          <Input
            placeholder="Buscar por nombre, teléfono o ID..."
            className="w-full"
          />
        </div>

        <div className="w-48">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Audiencia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las audiencias</SelectItem>
              <SelectItem value="propietarios">Propietarios Madrid</SelectItem>
              <SelectItem value="inversores">Inversores - Alto valor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-36">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Edad" />
            </SelectTrigger>
            <SelectContent>
              {ageRanges.map(range => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-40">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="# Propiedades" />
            </SelectTrigger>
            <SelectContent>
              {propertyRanges.map(range => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-44">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span>Barrios</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44">
              {neighborhoods.map(neighborhood => (
                <DropdownMenuCheckboxItem
                  key={neighborhood}
                  checked={selectedNeighborhoods.includes(neighborhood)}
                  onCheckedChange={(checked) => {
                    setSelectedNeighborhoods(prev =>
                      checked
                        ? [...prev, neighborhood]
                        : prev.filter(n => n !== neighborhood)
                    );
                  }}
                >
                  {neighborhood}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button 
          variant="outline" 
          onClick={() => {
            setSelectedNeighborhoods([]);
          }}
        >
          Limpiar filtros
        </Button>
      </div>
    </div>
  );
};

export default ContactosFilters;
