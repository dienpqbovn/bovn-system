import { NextRequest, NextResponse } from 'next/server';
import ZKLib from 'node-zklib';

import { Log, LogResponse, ZkLogType } from '@/interfaces/zk';
import { formatDate, formatTime } from '@/lib/date';
import { getUsersFromSheet } from '@/lib/google-sheet';
import { calculateWorkUnits } from '@/lib/zk';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const dateParam = url.searchParams.get('date'); // YYYY-MM-DD

    const now = new Date();
    const today = formatDate(now);

    const targetDate =
      dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam) ? dateParam : today;

    const zkInstance = new ZKLib('192.168.1.201', 4370, 10000);
    await zkInstance.createSocket();

    const { data: logs }: { data: ZkLogType[] } =
      await zkInstance.getAttendances();
    await zkInstance.disconnect();

    const usersMap = await getUsersFromSheet();

    // lọc theo ngày được truyền
    const filteredLogs = logs.filter((log) => {
      const logDate = formatDate(new Date(log.recordTime));
      return logDate === targetDate;
    });

    const grouped: Record<string, Omit<Log, 'id' | 'workUnits'>> = {};

    for (const log of filteredLogs) {
      const userId = log.deviceUserId;
      const name = usersMap[userId] ?? null;
      const record = new Date(log.recordTime);
      const date = formatDate(record);
      const time = formatTime(record);

      const key = `${userId}-${date}`;

      if (!grouped[key]) {
        grouped[key] = {
          name,
          date,
          startTime: time,
          endTime: null,
        };
      } else {
        if (time < grouped[key].startTime) {
          grouped[key].endTime ??= grouped[key].startTime;
          grouped[key].startTime = time;
        } else if (time > grouped[key].startTime) {
          if (grouped[key].endTime === null || time > grouped[key].endTime) {
            grouped[key].endTime = time;
          }
        }
      }
    }

    const result: Log[] = Object.entries(grouped).map(([key, value]) => {
      const workUnits = value.endTime
        ? calculateWorkUnits(value.startTime, value.endTime)
        : 0;

      return {
        id: key.split('-')[0],
        ...value,
        workUnits,
      };
    });

    return NextResponse.json({ data: result } satisfies LogResponse);
  } catch {
    return NextResponse.json(
      {
        message:
          'Network connection error. Please check your company LAN or VPN connection.',
      },
      { status: 500 },
    );
  }
}
