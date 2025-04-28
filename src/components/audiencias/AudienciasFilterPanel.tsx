
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudienciasFilterPanelProps {
  onFilterChange: (filters: any) => void;
}

// Mock data for neighborhoods
const neighborhoods = [
  { label: "Salamanca", value: "salamanca" },
  { label: "Chamberí", value: "chamberi" },
  { label: "Retiro", value: "retiro" },
  { label: "Centro", value: "centro" },
  { label: "Chamartín", value: "chamartin" },
  { label: "Tetuán", value: "tetuan" },
  { label: "Arganzuela", value: "arganzuela" },
];

const AudienciasFilterPanel: React.FC<AudienciasFilterPanelProps> = ({ onFilterChange }) => {
  const [ageFilters, setAgeFilters] = useState<string[]>([]);
  const [propertyFilters, setPropertyFilters] = useState<string[]>([]);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const handleAgeFilterChange = (value: string) => {
    setAgeFilters(prev => {
      const newFilters = prev.includes(value)
        ? prev.filter(filter => filter !== value)
        : [...prev, value];
      
      onFilterChange({ ageFilters: newFilters, propertyFilters, selectedNeighborhoods });
      return newFilters;
    });
  };

  const handlePropertyFilterChange = (value: string) => {
    setPropertyFilters(prev => {
      const newFilters = prev.includes(value)
        ? prev.filter(filter => filter !== value)
        : [...prev, value];
      
      onFilterChange({ ageFilters, propertyFilters: newFilters, selectedNeighborhoods });
      return newFilters;
    });
  };

  const toggleNeighborhood = (value: string) => {
    setSelectedNeighborhoods(prev => {
      const newSelected = prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value];
      
      onFilterChange({ ageFilters, propertyFilters, selectedNeighborhoods: newSelected });
      return newSelected;
    });
  };

  const clearFilters = () => {
    setAgeFilters([]);
    setPropertyFilters([]);
    setSelectedNeighborhoods([]);
    onFilterChange({ ageFilters: [], propertyFilters: [], selectedNeighborhoods: [] });
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Filtros</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-sm mb-2">Edad</h3>
            <div className="space-y-2">
              {[
                { id: '20-35', label: '20-35 años' },
                { id: '35-50', label: '35-50 años' },
                { id: '50-70', label: '50-70 años' },
                { id: '70plus', label: '+70 años' }
              ].map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`age-${item.id}`} 
                    checked={ageFilters.includes(item.id)}
                    onCheckedChange={() => handleAgeFilterChange(item.id)}
                  />
                  <Label htmlFor={`age-${item.id}`}>{item.label}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium text-sm mb-2">Número de propiedades</h3>
            <div className="space-y-2">
              {[
                { id: '1', label: '1 propiedad' },
                { id: '2-5', label: '2-5 propiedades' },
                { id: '5plus', label: '+5 propiedades' }
              ].map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`property-${item.id}`} 
                    checked={propertyFilters.includes(item.id)}
                    onCheckedChange={() => handlePropertyFilterChange(item.id)}
                  />
                  <Label htmlFor={`property-${item.id}`}>{item.label}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium text-sm mb-2">Barrios</h3>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {selectedNeighborhoods.length > 0
                    ? `${selectedNeighborhoods.length} barrios seleccionados`
                    : "Seleccionar barrios"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Buscar barrio..." />
                  <CommandEmpty>No se encontraron barrios.</CommandEmpty>
                  <CommandGroup className="max-h-[200px] overflow-auto">
                    {neighborhoods.map((neighborhood) => (
                      <CommandItem
                        key={neighborhood.value}
                        value={neighborhood.value}
                        onSelect={() => toggleNeighborhood(neighborhood.value)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedNeighborhoods.includes(neighborhood.value)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {neighborhood.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            
            {selectedNeighborhoods.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {selectedNeighborhoods.map((neighborhood) => {
                  const label = neighborhoods.find(n => n.value === neighborhood)?.label;
                  return (
                    <Badge 
                      key={neighborhood} 
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {label}
                      <button 
                        className="ml-1 h-3 w-3 rounded-full bg-gray-400 text-white flex items-center justify-center text-[10px] hover:bg-gray-500"
                        onClick={() => toggleNeighborhood(neighborhood)}
                      >
                        ×
                      </button>
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>
          
          <Separator />
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={clearFilters}
          >
            Limpiar filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudienciasFilterPanel;
