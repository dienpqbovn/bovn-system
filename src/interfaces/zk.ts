export type ZkLogType = {
  userSn: number;
  deviceUserId: string;
  recordTime: string;
  ip: string;
};

export type Log = {
  id: string;
  name: string | null;
  date: string;
  startTime: string;
  endTime: string | null;
};

export type LogResponse = {
  data: Log[];
};
