
import React, { useState } from 'react';
import { DynamicFilters, FilterChip, FilterOption } from '@/components/ui/dynamic-filters';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

interface AudienciasFilterPanelProps {
  onFilterChange: (filters: any) => void;
}

const AudienciasFilterPanel: React.FC<AudienciasFilterPanelProps> = ({ onFilterChange }) => {
  const [activeFilters, setActiveFilters] = useState<string[]>(['search']);
  const [searchValue, setSearchValue] = useState('');
  const [selectedAgeRanges, setSelectedAgeRanges] = useState<string[]>([]);
  const [selectedPropertyRanges, setSelectedPropertyRanges] = useState<string[]>([]);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([]);

  // Define age ranges, property ranges, and neighborhoods
  const ageRanges = ['20-35', '35-50', '50-70', '70+'];
  const propertyRanges = ['1', '2-5', '5+'];
  const neighborhoods = ['Salamanca', 'Chamberí', 'Retiro', 'Chamartín', 'Tetuán'];

  // Define all available filter options
  const filterOptions: FilterOption[] = [
    {
      id: 'search',
      label: 'Buscar',
      type: 'text',
      Component: ({ onRemove }) => (
        <FilterChip label="Buscar" onRemove={onRemove}>
          <Input
            placeholder="Buscar contactos..."
            className="border-0 p-0 h-6 focus-visible:ring-0 bg-transparent"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              handleFiltersChange();
            }}
          />
        </FilterChip>
      )
    },
    {
      id: 'age',
      label: 'Edad',
      type: 'multiSelect',
      Component: ({ onRemove }) => (
        <FilterChip label="Edad" onRemove={onRemove}>
          <DropdownMenu>
            <DropdownMenuTrigger className="border-0 p-0 h-6 focus-visible:ring-0 bg-transparent text-left text-sm">
              {selectedAgeRanges.length 
                ? `${selectedAgeRanges.length} seleccionados` 
                : "Seleccionar edades"}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {ageRanges.map(range => (
                <DropdownMenuCheckboxItem
                  key={range}
                  checked={selectedAgeRanges.includes(range)}
                  onCheckedChange={(checked) => {
                    setSelectedAgeRanges(prev =>
                      checked
                        ? [...prev, range]
                        : prev.filter(r => r !== range)
                    );
                    handleFiltersChange();
                  }}
                >
                  {range}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </FilterChip>
      )
    },
    {
      id: 'properties',
      label: 'Nº Propiedades',
      type: 'multiSelect',
      Component: ({ onRemove }) => (
        <FilterChip label="Propiedades" onRemove={onRemove}>
          <DropdownMenu>
            <DropdownMenuTrigger className="border-0 p-0 h-6 focus-visible:ring-0 bg-transparent text-left text-sm">
              {selectedPropertyRanges.length 
                ? `${selectedPropertyRanges.length} seleccionados` 
                : "Seleccionar rango"}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {propertyRanges.map(range => (
                <DropdownMenuCheckboxItem
                  key={range}
                  checked={selectedPropertyRanges.includes(range)}
                  onCheckedChange={(checked) => {
                    setSelectedPropertyRanges(prev =>
                      checked
                        ? [...prev, range]
                        : prev.filter(r => r !== range)
                    );
                    handleFiltersChange();
                  }}
                >
                  {range}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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
                    handleFiltersChange();
                  }}
                >
                  {neighborhood}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </FilterChip>
      )
    }
  ];

  const handleFiltersChange = () => {
    onFilterChange({
      search: searchValue,
      age: selectedAgeRanges,
      properties: selectedPropertyRanges,
      neighborhoods: selectedNeighborhoods
    });
  };

  const handleAddFilter = (filterId: string) => {
    setActiveFilters((prev) => [...prev, filterId]);
  };

  const handleRemoveFilter = (filterId: string) => {
    setActiveFilters((prev) => prev.filter(id => id !== filterId));
    
    if (filterId === 'search') {
      setSearchValue('');
    } else if (filterId === 'age') {
      setSelectedAgeRanges([]);
    } else if (filterId === 'properties') {
      setSelectedPropertyRanges([]);
    } else if (filterId === 'neighborhoods') {
      setSelectedNeighborhoods([]);
    }
    
    handleFiltersChange();
  };

  const handleClearFilters = () => {
    setActiveFilters(['search']);
    setSearchValue('');
    setSelectedAgeRanges([]);
    setSelectedPropertyRanges([]);
    setSelectedNeighborhoods([]);
    handleFiltersChange();
  };

  // Custom vertical filter rendering for audiencias constructor
  const renderFilters = () => {
    return (
      <div className="space-y-2">
        {activeFilters.map(filterId => {
          const filter = filterOptions.find(f => f.id === filterId);
          if (!filter) return null;
          
          return (
            <div key={filterId} className="w-full">
              <filter.Component onRemove={() => handleRemoveFilter(filterId)} />
            </div>
          );
        })}
        
        {/* Add filter button */}
        <div className="mt-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Añadir filtro
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {filterOptions
                .filter(filter => !activeFilters.includes(filter.id))
                .map(filter => (
                  <DropdownMenuCheckboxItem 
                    key={filter.id}
                    onClick={() => handleAddFilter(filter.id)}
                  >
                    {filter.label}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {activeFilters.length > 1 && (
            <Button 
              variant="ghost" 
              size="sm"
              className="ml-2"
              onClick={handleClearFilters}
            >
              Limpiar filtros
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded-md border shadow-sm h-fit">
      <h2 className="font-semibold text-lg mb-3">Filtros</h2>
      {renderFilters()}
    </div>
  );
};

export default AudienciasFilterPanel;
