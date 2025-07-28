import { ZkLogType } from '@/interfaces/zk';

import { formatDate } from './date';

export const filterLogsByDate = (
  logs: ZkLogType[],
  targetDate: string,
): ZkLogType[] => {
  return logs.filter((log) => {
    const record = new Date(log.recordTime);
    const localDate = formatDate(record);
    return localDate === targetDate;
  });
};

export const calculateWorkUnits = (start: string, end: string): number => {
  if (!start || !end) return 0;

  const parse = (t: string) => {
    const [h, m, s] = t.split(':').map(Number);
    return h * 3600 + m * 60 + s;
  };

  const startSec = parse(start);
  const endSec = parse(end);

  const lunchStart = parse('11:45:00');
  const lunchEnd = parse('12:45:00');

  let workSeconds = endSec - startSec;

  if (startSec < lunchEnd && endSec > lunchStart) {
    const overlapStart = Math.max(startSec, lunchStart);
    const overlapEnd = Math.min(endSec, lunchEnd);
    workSeconds -= Math.max(0, overlapEnd - overlapStart);
  }

  const workHours = workSeconds / 3600;

  const units = workHours / 8;
  return Math.round(units * 100) / 100;
};
