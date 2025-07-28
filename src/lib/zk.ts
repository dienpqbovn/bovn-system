import { ZkLogType } from '@/interfaces/zk';

export const filterLogsToday = (logs: ZkLogType[]): ZkLogType[] => {
  const now = new Date();

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ).getTime();
  const endOfToday = startOfToday + 24 * 60 * 60 * 1000;

  return logs.filter((log) => {
    const time = new Date(log.recordTime).getTime();
    return time >= startOfToday && time < endOfToday;
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
