
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const modules = [
    {
      title: 'Audiencias',
      description: 'Gestiona y crea audiencias para tus campañas de marketing.',
      path: '/audiencias',
      color: 'bg-audience-lightPurple text-audience-purple',
      icon: '👥',
    },
    {
      title: 'Campañas',
      description: 'Crea y analiza campañas de marketing.',
      path: '/campanas',
      color: 'bg-audience-lightBlue text-audience-blue',
      icon: '📊',
    },
    {
      title: 'Contactos',
      description: 'Administra tu base de datos de contactos.',
      path: '/contactos',
      color: 'bg-gray-100 text-gray-700',
      icon: '📇',
    },
  ];

  return (
    <div className="py-8 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600">Bienvenido a tu plataforma de gestión de marketing inmobiliario.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {modules.map((module) => (
            <Card key={module.title} className="overflow-hidden transition-shadow hover:shadow-md">
              <CardHeader className={`${module.color}`}>
                <div className="flex justify-between items-center">
                  <CardTitle>{module.title}</CardTitle>
                  <span className="text-3xl">{module.icon}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <CardDescription className="mb-4">{module.description}</CardDescription>
                <Button asChild variant="outline" className="w-full justify-between">
                  <Link to={module.path}>
                    Ir a {module.title}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Audiencias Module</CardTitle>
            <CardDescription>
              Un completo sistema para la gestión de audiencias de marketing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              El módulo Audiencias te permite crear, filtrar y gestionar grupos de contactos para tus campañas de marketing.
              Aprovecha las potentes herramientas de segmentación y análisis para maximizar el impacto de tus acciones.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-audience-lightPurple">
                <h3 className="font-medium mb-2">Dashboard de Audiencias</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Vista general de todas tus audiencias con filtros y análisis detallado.
                </p>
                <Button asChild size="sm" variant="outline" className="w-full justify-between">
                  <Link to="/audiencias">
                    Ver Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="p-4 rounded-lg bg-audience-lightBlue">
                <h3 className="font-medium mb-2">Constructor de Audiencias</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Crea nuevas audiencias utilizando múltiples criterios de filtrado.
                </p>
                <Button asChild size="sm" variant="outline" className="w-full justify-between">
                  <Link to="/audiencias/constructor">
                    Crear Audiencia
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="p-4 rounded-lg bg-gray-100">
                <h3 className="font-medium mb-2">Editor Manual</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Edita manualmente las audiencias existentes añadiendo o eliminando contactos.
                </p>
                <Button 
                  asChild 
                  size="sm" 
                  variant="outline" 
                  className="w-full justify-between"
                >
                  <Link to="/audiencias">
                    Editar Audiencias
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
