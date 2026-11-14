import fs from 'node:fs';
import path from 'node:path';
import type { UserLog } from '@/types/auth';

const logsDir = path.join(process.cwd(), 'data', 'logs');
const auditLogPath = path.join(logsDir, 'audit.log');

function ensureStorage(): void {
  fs.mkdirSync(logsDir, { recursive: true });

  if (!fs.existsSync(auditLogPath)) {
    fs.writeFileSync(auditLogPath, '', 'utf-8');
  }
}

export function getStoredLogs(): UserLog[] {
  ensureStorage();

  const content = fs.readFileSync(auditLogPath, 'utf-8');

  return content
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line) as UserLog)
    .reverse();
}

export function appendLog(log: UserLog): UserLog[] {
  ensureStorage();

  fs.appendFileSync(
    auditLogPath,
    JSON.stringify(log) + '\n',
    'utf-8'
  );

  return getStoredLogs();
}

export function clearLogs(): void {
  ensureStorage();
  fs.writeFileSync(auditLogPath, '', 'utf-8');
}
