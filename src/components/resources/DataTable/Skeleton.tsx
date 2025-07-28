import { Table as ReactTableTanstack } from '@tanstack/react-table';

import {
  Skeleton as SkeletonUI,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui';

export function Skeleton<TData>({
  table,
}: {
  table: ReactTableTanstack<TData>;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {[...Array(table.getAllColumns().length)].map((_, j) => (
            <TableCell key={j}>
              <SkeletonUI className="h-5 w-24" />
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(10)].map((_, i) => (
          <TableRow key={i}>
            {[...Array(table.getAllColumns().length)].map((_, j) => (
              <TableCell key={j}>
                <SkeletonUI className="h-5 w-24" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
