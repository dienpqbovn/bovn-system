'use client';

import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { ChevronDownIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import {
  ColumnHeader,
  DataTable,
  Pagination,
  Skeleton,
  ViewOptions,
} from '@/components/resources';
import { InputSearch } from '@/components/resources/DataTable/InputSearch';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import { useDataTable } from '@/hooks';
import { Log } from '@/interfaces/zk';
import { formatDate } from '@/lib/date';
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

  const [date, setDate] = useState<Date | undefined>(new Date());

  const { data, isLoading, error } = useGetAllLogs({
    date: date ? formatDate(date) : undefined,
  });

  const tableData = useMemo(() => data?.data || [], [data]);

  const { table } = useDataTable(tableData, columns);

  return (
    <>
      {axios.isAxiosError(error) && error.response && (
        <Alert variant="destructive">
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>{error.response.data.message}</AlertDescription>
        </Alert>
      )}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <InputSearch
          table={table}
          search={{ key: 'name', placeholder: 'Filter names' }}
        />
        <div className="flex flex-wrap items-center justify-between gap-2 max-md:w-full">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="w-36 justify-between font-normal"
              >
                {date ? formatDate(date) : 'Select date'}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={{ after: new Date() }}
              />
            </PopoverContent>
          </Popover>
          <ViewOptions table={table} />
        </div>
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
