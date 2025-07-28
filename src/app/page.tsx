import { LayoutMain } from '@/components/layouts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';

import { DataTableLogs } from './_components';

export default function Home() {
  return (
    <LayoutMain>
      <Card>
        <CardHeader>
          <CardTitle>BOVN System</CardTitle>
          <CardDescription>Log and track work hours</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <DataTableLogs />
        </CardContent>
      </Card>
    </LayoutMain>
  );
}
