
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AgeRange, PropertiesRange } from '@/types/contact';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DynamicFilters, FilterChip, FilterOption } from '@/components/ui/dynamic-filters';
import { Search, Calendar, Tag, User, Clock } from 'lucide-react';

const ageRanges: AgeRange[] = ['20-35', '35-50', '50-70', '70+'];
const propertyRanges: PropertiesRange[] = ['1', '2-5', '5+'];
const neighborhoods = ['Salamanca', 'Chamberí', 'Retiro', 'Chamartín', 'Tetuán'];
const audiences = ['Todas las audiencias', 'Propietarios Madrid', 'Inversores - Alto valor'];
const contactStatuses = ['Activo', 'Inactivo', 'Pendiente'];
const tags = ['Inversor', 'Excliente', 'Herencia', 'VIP', 'Moroso'];

const ContactosFilters = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>(['search']);
  
  // Define all available filter options
  const filterOptions: FilterOption[] = [
    {
      id: 'search',
      label: 'Buscar',
      type: 'text',
      Component: ({ onRemove }) => (
        <FilterChip label="Buscar" onRemove={onRemove}>
          <Input
            placeholder="Nombre, teléfono o ID..."
            className="border-0 p-0 h-6 focus-visible:ring-0 bg-transparent"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </FilterChip>
      )
    },
    {
      id: 'audience',
      label: 'Audiencia',
      type: 'select',
      Component: ({ onRemove }) => (
        <FilterChip label="Audiencia" onRemove={onRemove}>
          <Select>
            <SelectTrigger className="border-0 p-0 h-6 focus-visible:ring-0 bg-transparent">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              {audiences.map(audience => (
                <SelectItem key={audience} value={audience}>
                  {audience}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterChip>
      )
    },
    {
      id: 'age',
      label: 'Edad',
      type: 'select',
      Component: ({ onRemove }) => (
        <FilterChip label="Edad" onRemove={onRemove}>
          <Select>
            <SelectTrigger className="border-0 p-0 h-6 focus-visible:ring-0 bg-transparent">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              {ageRanges.map(range => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterChip>
      )
    },
    {
      id: 'properties',
      label: 'Nº Propiedades',
      type: 'select',
      Component: ({ onRemove }) => (
        <FilterChip label="Propiedades" onRemove={onRemove}>
          <Select>
            <SelectTrigger className="border-0 p-0 h-6 focus-visible:ring-0 bg-transparent">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              {propertyRanges.map(range => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterChip>
      )
    },
    {
      id: 'neighborhoods',
      label: 'Barrios',
      type: 'multiSelect',
      Component: ({ onRemove }) => (
        <FilterChip label="Barrios" onRemove={onRemove}>
          <DropdownMenu>
            <DropdownMenuTrigger className="border-0 p-0 h-6 focus-visible:ring-0 bg-transparent text-left text-sm">
              {selectedNeighborhoods.length 
                ? `${selectedNeighborhoods.length} seleccionados` 
                : "Seleccionar barrios"}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
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
        </FilterChip>
      )
    },
    {
      id: 'lastCampaign',
      label: 'Última campaña',
      type: 'dateRange',
      Component: ({ onRemove }) => (
        <FilterChip label="Última campaña" onRemove={onRemove}>
          <span className="text-sm">Últimos 30 días</span>
        </FilterChip>
      )
    },
    {
      id: 'status',
      label: 'Estado',
      type: 'select',
      Component: ({ onRemove }) => (
        <FilterChip label="Estado" onRemove={onRemove}>
          <Select>
            <SelectTrigger className="border-0 p-0 h-6 focus-visible:ring-0 bg-transparent">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              {contactStatuses.map(status => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterChip>
      )
    },
    {
      id: 'tags',
      label: 'Tags',
      type: 'multiSelect',
      Component: ({ onRemove }) => (
        <FilterChip label="Tags" onRemove={onRemove}>
          <span className="text-sm">Personalizar...</span>
        </FilterChip>
      )
    },
    {
      id: 'createDate',
      label: 'Fecha de creación',
      type: 'dateRange',
      Component: ({ onRemove }) => (
        <FilterChip label="Fecha de creación" onRemove={onRemove}>
          <span className="text-sm">Últimos 90 días</span>
        </FilterChip>
      )
    },
  ];

  const handleAddFilter = (filterId: string) => {
    setActiveFilters((prev) => [...prev, filterId]);
  };

  const handleRemoveFilter = (filterId: string) => {
    setActiveFilters((prev) => prev.filter(id => id !== filterId));
    
    // Reset related state when removing a filter
    if (filterId === 'neighborhoods') {
      setSelectedNeighborhoods([]);
    } else if (filterId === 'search') {
      setSearchValue('');
    }
  };

  const handleClearFilters = () => {
    setActiveFilters(['search']); // Keep search as the default filter
    setSelectedNeighborhoods([]);
    setSearchValue('');
  };

  const renderFilter = (filterId: string, onRemove: () => void) => {
    const filter = filterOptions.find(f => f.id === filterId);
    if (!filter) return null;
    
    return <filter.Component onRemove={onRemove} />;
  };

  return (
    <div className="p-4 bg-white border rounded-md shadow-sm">
      <DynamicFilters 
        availableFilters={filterOptions}
        activeFilters={activeFilters}
        onAddFilter={handleAddFilter}
        onRemoveFilter={handleRemoveFilter}
        onClearFilters={handleClearFilters}
        renderFilter={renderFilter}
      />
    </div>
  );
};

export default ContactosFilters;
