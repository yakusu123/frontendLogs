export interface UserLog {
  id: string;
  username: string;
  email: string;
  timestamp: string;
  date: string;
  time: string;
  status: 'SUCCESS' | 'FAILED';
  userAgent?: string;
  ip?: string;
}

export interface UserSession {
  username: string;
  email: string;
  role: string;
  token?: string;
  loginTime: string;
}

export type SystemLogLevel = 'INFO' | 'WARN' | 'ERROR';

export interface SystemLog {
  id: string;
  timestamp: string;
  level: SystemLogLevel;
  message: string;
}
