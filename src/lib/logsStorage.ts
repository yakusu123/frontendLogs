import fs from 'fs';
import path from 'path';
import { UserLog } from '@/types/auth';

const dataDir = path.join(process.cwd(), 'data');
const logsFilePath = path.join(dataDir, 'logs.json');

// Logs iniciales de ejemplo si no existe el archivo
const initialLogs: UserLog[] = [
  {
    id: 'log-1',
    username: 'admin',
    email: 'admin@sistema.com',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    date: new Date(Date.now() - 3600000 * 2).toLocaleDateString('es-ES'),
    time: new Date(Date.now() - 3600000 * 2).toLocaleTimeString('es-ES'),
    status: 'SUCCESS',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    ip: '127.0.0.1'
  }
];

function ensureStorage(): void {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(logsFilePath)) {
      fs.writeFileSync(logsFilePath, JSON.stringify(initialLogs, null, 2), 'utf-8');
    }
  } catch (error) {
    console.error('Error inicializando almacenamiento de logs:', error);
  }
}

export function getStoredLogs(): UserLog[] {
  ensureStorage();
  try {
    if (!fs.existsSync(logsFilePath)) return initialLogs;
    const raw = fs.readFileSync(logsFilePath, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error leyendo logs:', error);
    return [];
  }
}

export function appendLog(log: UserLog): UserLog[] {
  ensureStorage();
  try {
    const logs = getStoredLogs();
    const updated = [log, ...logs];
    fs.writeFileSync(logsFilePath, JSON.stringify(updated, null, 2), 'utf-8');
    return updated;
  } catch (error) {
    console.error('Error guardando log:', error);
    return [];
  }
}

export function clearLogs(): void {
  ensureStorage();
  try {
    fs.writeFileSync(logsFilePath, JSON.stringify([], null, 2), 'utf-8');
  } catch (error) {
    console.error('Error limpiando logs:', error);
  }
}
