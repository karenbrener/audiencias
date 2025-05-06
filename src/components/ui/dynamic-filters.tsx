import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { X, Plus, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { useIsMobile } from '@/hooks/use-mobile';

export interface FilterOption {
  id: string;
  label: string;
  type: 'select' | 'multiSelect' | 'date' | 'dateRange' | 'text';
  Component: React.FC<{ onRemove: () => void; }>;
}

export interface DynamicFiltersProps {
  availableFilters: FilterOption[];
  activeFilters: string[];
  onAddFilter: (filterId: string) => void;
  onRemoveFilter: (filterId: string) => void;
  onClearFilters: () => void;
  renderFilter: (filterId: string, onRemove: () => void) => React.ReactNode;
  className?: string;
}

export function DynamicFilters({
  availableFilters,
  activeFilters,
  onAddFilter,
  onRemoveFilter,
  onClearFilters,
  renderFilter,
  className
}: DynamicFiltersProps) {
  const isMobile = useIsMobile();
  
  // Get available filters that are not already active
  const remainingFilters = availableFilters.filter(
    filter => !activeFilters.includes(filter.id)
  );

  // Render filters in a carousel on mobile or in a row on desktop
  const renderFilters = () => {
    if (isMobile) {
      return (
        <Carousel className="w-full">
          <CarouselContent>
            {activeFilters.map(filterId => (
              <CarouselItem key={filterId} className="flex-shrink-0 basis-auto">
                {renderFilter(filterId, () => onRemoveFilter(filterId))}
              </CarouselItem>
            ))}
            {remainingFilters.length > 0 && (
              <CarouselItem className="flex-shrink-0 basis-auto pl-1">
                <AddFilterButton
                  remainingFilters={remainingFilters}
                  onAddFilter={onAddFilter}
                />
              </CarouselItem>
            )}
            {activeFilters.length > 0 && (
              <CarouselItem className="flex-shrink-0 basis-auto pl-1">
                <Button 
                  variant="outline" 
                  onClick={onClearFilters}
                  size="sm"
                >
                  Limpiar filtros
                </Button>
              </CarouselItem>
            )}
          </CarouselContent>
        </Carousel>
      );
    }

    return (
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {activeFilters.map(filterId => (
          <div key={filterId}>
            {renderFilter(filterId, () => onRemoveFilter(filterId))}
          </div>
        ))}
        
        {remainingFilters.length > 0 && (
          <AddFilterButton
            remainingFilters={remainingFilters}
            onAddFilter={onAddFilter}
          />
        )}
        
        {activeFilters.length > 0 && (
          <Button 
            variant="outline" 
            onClick={onClearFilters}
            size="sm"
          >
            Limpiar filtros
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className={cn("w-full", className)}>
      {renderFilters()}
    </div>
  );
}

function AddFilterButton({ 
  remainingFilters, 
  onAddFilter 
}: { 
  remainingFilters: FilterOption[],
  onAddFilter: (filterId: string) => void 
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Añadir filtro
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {remainingFilters.map(filter => (
          <DropdownMenuItem 
            key={filter.id}
            onClick={() => onAddFilter(filter.id)}
          >
            {filter.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function FilterChip({ 
  label, 
  onRemove, 
  children 
}: { 
  label: string, 
  onRemove: () => void,
  children?: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-md pl-3 pr-2 py-1 border border-gray-200 max-w-[280px] overflow-hidden">
      <span className="text-sm font-medium mr-1 text-gray-700">{label}:</span>
      <div className="flex-1 min-w-0">
        {children}
      </div>
      <button 
        onClick={onRemove}
        className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
