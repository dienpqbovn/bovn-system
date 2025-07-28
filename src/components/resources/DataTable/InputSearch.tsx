import { Table } from '@tanstack/react-table';

import { Input } from '@/components/ui';

export function InputSearch<TData>({
  table,
  search,
}: {
  table: Table<TData>;
  search: {
    key: string;
    placeholder: string;
  };
}) {
  return (
    <Input
      placeholder={search.placeholder}
      value={(table.getColumn(search.key)?.getFilterValue() as string) ?? ''}
      onChange={(event) =>
        table.getColumn(search.key)?.setFilterValue(event.target.value)
      }
      className="max-w-sm"
    />
  );
}
