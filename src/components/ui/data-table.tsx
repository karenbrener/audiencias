
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Column<T> {
  accessorKey?: keyof T | string; // Make accessorKey optional
  id?: string; // Add id as an alternative identifier
  header: string | ((props: any) => React.ReactNode); // Allow header to be a render function
  cell?: (item: { row: { original: T } }) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  selectedRow?: T;
}

export function DataTable<T extends { id: string | number }>({ 
  columns, 
  data,
  onRowClick,
  selectedRow
}: DataTableProps<T>) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.id || column.accessorKey as string}>
                {typeof column.header === 'function' 
                  ? column.header({ table: {} }) 
                  : column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No hay resultados.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow 
                key={item.id} 
                onClick={() => onRowClick?.(item)} 
                className={`${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''} ${
                  selectedRow && selectedRow.id === item.id ? 'bg-audience-lightPurple' : ''
                }`}
              >
                {columns.map((column) => (
                  <TableCell key={`${item.id}-${column.id || column.accessorKey as string}`}>
                    {column.cell 
                      ? column.cell({ row: { original: item } }) 
                      : column.accessorKey 
                        ? String(item[column.accessorKey as keyof T] || '')
                        : ''}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
