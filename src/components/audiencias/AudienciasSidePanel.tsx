
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BarChart from '../charts/BarChart';
import PieChart from '../charts/PieChart';
import { Audience } from '@/types/audience';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface AudienciasSidePanelProps {
  audience: Audience | null;
  isOpen: boolean;
  onToggle: () => void;
}

const AudienciasSidePanel: React.FC<AudienciasSidePanelProps> = ({ audience, isOpen, onToggle }) => {
  // Mock data for charts
  const edadData = [
    { name: '20-35', value: 30 },
    { name: '35-50', value: 45 },
    { name: '50-70', value: 20 },
    { name: '+70', value: 5 },
  ];

  const propiedadesData = [
    { name: '1 propiedad', value: 60 },
    { name: '2-5 propiedades', value: 30 },
    { name: '+5 propiedades', value: 10 },
  ];

  return (
    <div 
      className={`bg-white border-l border-gray-200 h-full transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? 'w-80' : 'w-0'
      }`}
    >
      <div className="h-full relative">
        <button
          onClick={onToggle}
          className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-24 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm z-10"
          aria-label={isOpen ? "Cerrar panel" : "Abrir panel"}
        >
          {isOpen ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
        </button>
        
        <div className="p-4 h-full overflow-auto">
          {audience ? (
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Detalles de audiencia</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Nombre:</span>
                      <p className="text-base">{audience.name}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Total contactos:</span>
                      <p className="text-base">{audience.size}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Última ejecución:</span>
                      <p className="text-base">{audience.lastRun}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Distribución por edad</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart data={edadData} />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Distribución por propiedades</CardTitle>
                </CardHeader>
                <CardContent>
                  <PieChart data={propiedadesData} />
                </CardContent>
              </Card>
              
              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm">
                  Ver completo
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <p>Selecciona una audiencia para ver detalles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudienciasSidePanel;
