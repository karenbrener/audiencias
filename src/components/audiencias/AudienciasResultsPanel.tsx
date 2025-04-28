
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Contact } from '@/types/audience';
import { DataTable } from '@/components/ui/data-table';
import BarChart from '../charts/BarChart';
import PieChart from '../charts/PieChart';
import { ArrowRight } from 'lucide-react';

interface AudienciasResultsPanelProps {
  contacts: Contact[];
  onViewAll: () => void;
}

const AudienciasResultsPanel: React.FC<AudienciasResultsPanelProps> = ({
  contacts,
  onViewAll,
}) => {
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

  // Column definition for sample contacts table
  const columns = [
    {
      accessorKey: 'name',
      header: 'Nombre',
    },
    {
      accessorKey: 'phone',
      header: 'Teléfono',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Resultados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total contactos</p>
              <p className="text-3xl font-bold text-audience-purple">{contacts.length}</p>
            </div>
            <Button onClick={onViewAll} className="flex items-center gap-1">
              Ver todo
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-sm mb-2">Distribución por edad</h3>
              <BarChart data={edadData} height={180} />
            </div>
            <div>
              <h3 className="font-medium text-sm mb-2">Distribución por propiedades</h3>
              <PieChart data={propiedadesData} height={180} />
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-4">Muestra de contactos</h3>
            <DataTable
              columns={columns}
              data={contacts.slice(0, 5)}
            />
            {contacts.length > 5 && (
              <div className="mt-2 text-right">
                <Button variant="link" size="sm" onClick={onViewAll} className="text-audience-purple">
                  Ver todos los {contacts.length} contactos
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudienciasResultsPanel;
