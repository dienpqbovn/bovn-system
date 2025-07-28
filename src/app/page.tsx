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

import { LayoutMain } from '@/components/layouts';
import {
  ColumnHeader,
  DataTable,
  Pagination,
  ViewOptions,
} from '@/components/resources';
import { InputSearch } from '@/components/resources/DataTable/InputSearch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useIsMounted } from '@/hooks';
import { Log } from '@/interfaces/zk';

const data: Log[] = [
  {
    id: '29',
    name: 'Nguyễn Đức Tùng',
    date: '2025-07-28',
    startTime: '07:25:03',
    endTime: '14:31:35',
  },
  {
    id: '26',
    name: 'Trần Kim Cảnh',
    date: '2025-07-28',
    startTime: '07:32:43',
    endTime: null,
  },
  {
    id: '16',
    name: 'Nguyễn Thị Huyền',
    date: '2025-07-28',
    startTime: '07:44:48',
    endTime: null,
  },
  {
    id: '6',
    name: 'Vũ Quốc Vương',
    date: '2025-07-28',
    startTime: '07:50:53',
    endTime: null,
  },
  {
    id: '30',
    name: 'Nguyễn Thị Hải',
    date: '2025-07-28',
    startTime: '07:58:27',
    endTime: null,
  },
  {
    id: '9',
    name: 'Nguyễn Đình Hoàng',
    date: '2025-07-28',
    startTime: '08:07:45',
    endTime: null,
  },
  {
    id: '28',
    name: 'Heodo',
    date: '2025-07-28',
    startTime: '08:15:11',
    endTime: null,
  },
  {
    id: '23',
    name: 'Hà Thị Kim Thu',
    date: '2025-07-28',
    startTime: '08:35:35',
    endTime: null,
  },
  {
    id: '20',
    name: 'Đỗ Thị Thanh Nga',
    date: '2025-07-28',
    startTime: '08:39:30',
    endTime: null,
  },
  {
    id: '2',
    name: 'Triệu Thị Bích Nguyệt',
    date: '2025-07-28',
    startTime: '08:42:59',
    endTime: null,
  },
  {
    id: '7',
    name: 'Nguyễn Trung Thành',
    date: '2025-07-28',
    startTime: '08:46:25',
    endTime: null,
  },
  {
    id: '4',
    name: 'Lê Văn Thuận',
    date: '2025-07-28',
    startTime: '08:54:25',
    endTime: null,
  },
  {
    id: '22',
    name: 'Kimgimok',
    date: '2025-07-28',
    startTime: '09:06:18',
    endTime: null,
  },
  {
    id: '10',
    name: 'Đỗ Tiến Anh',
    date: '2025-07-28',
    startTime: '09:07:27',
    endTime: null,
  },
  {
    id: '25',
    name: 'Phan Quang Điện',
    date: '2025-07-28',
    startTime: '09:21:15',
    endTime: null,
  },
];

export default function Home() {
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
  ];
  const isMounted = useIsMounted();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
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
    <LayoutMain>
      <Card>
        <CardHeader>
          <CardTitle>BOVN System</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <InputSearch
              table={table}
              search={{ key: 'name', placeholder: 'Filter names' }}
            />
            <ViewOptions table={table} />
          </div>
          <DataTable table={table} />
          <Pagination table={table} />
        </CardContent>
      </Card>
    </LayoutMain>
  );
}
