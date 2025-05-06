import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DynamicFilters, FilterChip, FilterOption } from '@/components/ui/dynamic-filters';

interface CampanasFiltersProps {
  onSearchChange?: (value: string) => void;
  onStatusChange?: (value: string) => void;
}

const CampanasFilters: React.FC<CampanasFiltersProps> = ({
  onSearchChange = () => {},
  onStatusChange = () => {},
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [statusValue, setStatusValue] = useState('todas');
  const [selectedAudience, setSelectedAudience] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>(['search', 'status']);

  const audiences = [
    { id: 'aud1', name: 'Propietarios Centro' },
    { id: 'aud2', name: 'Inversores Premium' },
    { id: 'aud3', name: 'Compradores 2024' },
  ];

  // Define filter options
  const filterOptions: FilterOption[] = [
    {
      id: 'search',
      label: 'Buscar',
      type: 'text',
      Component: ({ onRemove }) => (
        <FilterChip label="Buscar" onRemove={onRemove}>
          <Input
            placeholder="Buscar campañas..."
            className="border-0 p-0 h-6 focus-visible:ring-0 bg-transparent"
            value={searchValue}
            onChange={(e) => {
              const value = e.target.value;
              setSearchValue(value);
              onSearchChange(value);
            }}
          />
        </FilterChip>
      )
    },
    {
      id: 'status',
      label: 'Estado',
      type: 'select',
      Component: ({ onRemove }) => (
        <FilterChip label="Estado" onRemove={onRemove}>
          <Select value={statusValue} onValueChange={(value) => {
            setStatusValue(value);
            onStatusChange(value);
          }}>
            <SelectTrigger className="border-0 p-0 h-6 focus-visible:ring-0 bg-transparent">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas</SelectItem>
              <SelectItem value="programadas">Programadas</SelectItem>
              <SelectItem value="enviadas">Enviadas</SelectItem>
              <SelectItem value="canceladas">Canceladas</SelectItem>
            </SelectContent>
          </Select>
        </FilterChip>
      )
    },
    {
      id: 'audience',
      label: 'Audiencia',
      type: 'select',
      Component: ({ onRemove }) => (
        <FilterChip label="Audiencia" onRemove={onRemove}>
          <Select value={selectedAudience} onValueChange={setSelectedAudience}>
            <SelectTrigger className="border-0 p-0 h-6 focus-visible:ring-0 bg-transparent">
              <SelectValue placeholder="Selecciona audiencia" />
            </SelectTrigger>
            <SelectContent>
              {audiences.map(audience => (
                <SelectItem key={audience.id} value={audience.id}>
                  {audience.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterChip>
      )
    },
    {
      id: 'date',
      label: 'Fecha',
      type: 'dateRange',
      Component: ({ onRemove }) => (
        <FilterChip label="Fecha" onRemove={onRemove}>
          <span className="text-sm">Últimos 30 días</span>
        </FilterChip>
      )
    }
  ];

  const handleAddFilter = (filterId: string) => {
    setActiveFilters((prev) => [...prev, filterId]);
  };

  const handleRemoveFilter = (filterId: string) => {
    if (filterId === 'search') {
      setSearchValue('');
      onSearchChange('');
    } else if (filterId === 'status') {
      setStatusValue('todas');
      onStatusChange('todas');
    } else if (filterId === 'audience') {
      setSelectedAudience('');
    }
    
    // For crucial filters like search and status, keep them but reset their value
    if (filterId === 'search' || filterId === 'status') {
      return;
    }
    
    setActiveFilters((prev) => prev.filter(id => id !== filterId));
  };

  const handleClearFilters = () => {
    setActiveFilters(['search', 'status']);
    setSearchValue('');
    onSearchChange('');
    setStatusValue('todas');
    onStatusChange('todas');
    setSelectedAudience('');
  };

  const renderFilter = (filterId: string, onRemove: () => void) => {
    const filter = filterOptions.find(f => f.id === filterId);
    if (!filter) return null;
    
    return <filter.Component onRemove={onRemove} />;
  };

  return (
    <div className="w-full">
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

export default CampanasFilters;
