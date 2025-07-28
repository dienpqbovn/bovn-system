import { LogType } from '@/interfaces/zk';

export const filterLogsToday = (logs: LogType[]): LogType[] => {
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
