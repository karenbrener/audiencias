import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DynamicFilters, FilterChip, FilterOption } from '@/components/ui/dynamic-filters';

interface AudienciasFiltersProps {
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const AudienciasFilters: React.FC<AudienciasFiltersProps> = ({
  onSearchChange,
  onStatusChange,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [statusValue, setStatusValue] = useState('activas');
  const [activeFilters, setActiveFilters] = useState<string[]>(['search', 'status']);

  // Define filter options
  const filterOptions: FilterOption[] = [
    {
      id: 'search',
      label: 'Buscar',
      type: 'text',
      Component: ({ onRemove }) => (
        <FilterChip label="Buscar" onRemove={onRemove}>
          <Input
            placeholder="Buscar audiencias..."
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
              <SelectItem value="activas">Activas</SelectItem>
              <SelectItem value="archivadas">Archivadas</SelectItem>
              <SelectItem value="todas">Todas</SelectItem>
            </SelectContent>
          </Select>
        </FilterChip>
      )
    },
    {
      id: 'size',
      label: 'Tamaño',
      type: 'select',
      Component: ({ onRemove }) => (
        <FilterChip label="Tamaño" onRemove={onRemove}>
          <Select>
            <SelectTrigger className="border-0 p-0 h-6 focus-visible:ring-0 bg-transparent">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Pequeño (<100)</SelectItem>
              <SelectItem value="medium">Mediano (100-500)</SelectItem>
              <SelectItem value="large">Grande (>500)</SelectItem>
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
    },
  ];

  const handleAddFilter = (filterId: string) => {
    setActiveFilters((prev) => [...prev, filterId]);
  };

  const handleRemoveFilter = (filterId: string) => {
    if (filterId === 'search') {
      setSearchValue('');
      onSearchChange('');
    } else if (filterId === 'status') {
      setStatusValue('activas');
      onStatusChange('activas');
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
    setStatusValue('activas');
    onStatusChange('activas');
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

export default AudienciasFilters;
