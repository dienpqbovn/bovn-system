'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

import {
  ColumnHeader,
  DataTable,
  Pagination,
  Skeleton,
  ViewOptions,
} from '@/components/resources';
import { InputSearch } from '@/components/resources/DataTable/InputSearch';
import { useIsMounted } from '@/hooks';
import { Log } from '@/interfaces/zk';
import { useGetAllLogs } from '@/services/zk/hook';

export const DataTableLogs = () => {
  const columns: ColumnDef<Log>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: ({ column }) => <ColumnHeader column={column} title="Name" />,
    },
    {
      accessorKey: 'date',
      header: 'Date',
    },
    {
      accessorKey: 'startTime',
      header: 'Start Time',
    },
    {
      accessorKey: 'endTime',
      header: 'End Time',
    },
    {
      accessorKey: 'workUnits',
      header: 'Work Units',
      cell: ({ row }) => {
        const value = row.getValue('workUnits');
        return typeof value === 'number' ? value.toFixed(2) : '0.00';
      },
    },
  ];
  const isMounted = useIsMounted();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data, isLoading } = useGetAllLogs();
  const listLogs = data?.data;

  const table = useReactTable({
    data: listLogs || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getSortedRowModel: isMounted() ? getSortedRowModel() : undefined,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      rowSelection,
      columnVisibility,
      sorting,
      columnFilters,
    },
  });

  return (
    <>
      <div className="flex items-center gap-2">
        <InputSearch
          table={table}
          search={{ key: 'name', placeholder: 'Filter names' }}
        />
        <ViewOptions table={table} />
      </div>

      {!isLoading ? (
        <>
          <DataTable table={table} />
          <Pagination table={table} />
        </>
      ) : (
        <Skeleton table={table} />
      )}
    </>
  );
};
