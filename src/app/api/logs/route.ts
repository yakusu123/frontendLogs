import { NextResponse } from 'next/server';
import { getStoredLogs, clearLogs } from '@/lib/logsStorage';

export async function GET() {
  try {
    const logs = getStoredLogs();
    return NextResponse.json({ logs });
  } catch (error) {
    console.error('Error obteniendo logs:', error);
    return NextResponse.json({ error: 'Error al obtener logs' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    clearLogs();
    return NextResponse.json({ message: 'Historial de logs limpiado exitosamente' });
  } catch (error) {
    console.error('Error eliminando logs:', error);
    return NextResponse.json({ error: 'Error al limpiar logs' }, { status: 500 });
  }
}
