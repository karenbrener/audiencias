import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface NavItem {
  label: string;
  path: string;
}

interface AppLayoutProps {
  children: ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/' },
  { label: 'Audiencias', path: '/audiencias' },
  { label: 'Campañas', path: '/campanas' },
  { label: 'Contactos', path: '/contactos' },
];

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-audience-purple">CRM App</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'bg-audience-lightPurple text-audience-purple font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto bg-gray-50">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
