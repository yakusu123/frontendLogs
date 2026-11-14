import { NextResponse } from 'next/server';
import { getStoredLogs, clearLogs } from '@/lib/logsStorage';
import { getSystemLogs, writeSystemLog } from '@/lib/logger';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const auditLogs = getStoredLogs();
    const systemLogs = getSystemLogs();

    return NextResponse.json({
      auditLogs,
      systemLogs,
    });

  } catch (error) {
    console.error('Error obteniendo logs:', error);

    return NextResponse.json(
      { error: 'Error al obtener logs' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    clearLogs();

    writeSystemLog(
      'INFO',
      'Se eliminaron los registros de auditoría'
    );

    return NextResponse.json({
      message: 'Historial de auditoría limpiado exitosamente',
    });

  } catch (error) {
    console.error('Error eliminando logs:', error);

    return NextResponse.json(
      { error: 'Error al limpiar logs' },
      { status: 500 }
    );
  }
}

