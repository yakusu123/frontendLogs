export interface UserLog {
  id: string;
  username: string;
  email: string;
  timestamp: string; // ISO format
  date: string;      // Formato fecha legible (ej: 12/11/2026)
  time: string;      // Formato hora legible (ej: 11:15:30 AM)
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
