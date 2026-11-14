import fs from 'node:fs';
import path from 'node:path';
import type { SystemLog, SystemLogLevel } from '@/types/auth';

const logsDir = path.join(process.cwd(), 'data', 'logs');
const systemLogPath = path.join(logsDir, 'system.log');

function ensureDirectory(): void {
  fs.mkdirSync(logsDir, { recursive: true });
}

export function writeSystemLog(
  level: SystemLogLevel,
  message: string
): SystemLog {
  ensureDirectory();

  const log: SystemLog = {
    id: `system-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
    level,
    message,
  };

  fs.appendFileSync(
    systemLogPath,
    JSON.stringify(log) + '\n',
    'utf-8'
  );

  return log;
}

export function getSystemLogs(): SystemLog[] {
  ensureDirectory();

  if (!fs.existsSync(systemLogPath)) {
    return [];
  }

  const content = fs.readFileSync(systemLogPath, 'utf-8');

  return content
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line) as SystemLog);
}