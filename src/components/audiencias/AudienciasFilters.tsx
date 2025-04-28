
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AudienciasFiltersProps {
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const AudienciasFilters: React.FC<AudienciasFiltersProps> = ({
  onSearchChange,
  onStatusChange,
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchChange(value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <div className="relative flex-grow">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar audiencias..."
          value={searchValue}
          onChange={handleSearchChange}
          className="pl-9"
        />
      </div>
      <Select onValueChange={onStatusChange} defaultValue="activas">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="activas">Estado: Activas</SelectItem>
          <SelectItem value="archivadas">Estado: Archivadas</SelectItem>
          <SelectItem value="todas">Estado: Todas</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AudienciasFilters;
