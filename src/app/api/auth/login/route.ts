import { NextRequest, NextResponse } from 'next/server';
import { appendLog } from '@/lib/logsStorage';
import { writeSystemLog } from '@/lib/logger';
import type { UserLog, UserSession } from '@/types/auth';

// Usuarios de demostración.
// No utilizar estas credenciales en producción.
const DEMO_USERS = [
  { username: 'admin', email: 'admin@sistema.com', password: 'password123', role: 'Administrador', },
  { username: 'maria_dev', email: 'maria@tech.io', password: 'password123', role: 'Desarrolladora', },
  { username: 'carlos_ops', email: 'carlos@ops.net', password: 'password123', role: 'DevOps', },
  { username: 'invitado', email: 'guest@portal.com', password: 'password123', role: 'Invitado', },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const username =
      typeof body.username === 'string' ? body.username.trim() : '';

    const password =
      typeof body.password === 'string' ? body.password : '';

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Usuario y contraseña son requeridos' },
        { status: 400 }
      );
    }

    const userAgent = req.headers.get('user-agent') || 'Desconocido';

    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor
      ? forwardedFor.split(',')[0].trim()
      : '127.0.0.1';

    const now = new Date();

    const formattedDate = now.toLocaleDateString('es-CL');
    const formattedTime = now.toLocaleTimeString('es-CL', {
      hour12: false,
    });

    const matchedUser = DEMO_USERS.find(
      (user) =>
        (
          user.username.toLowerCase() === username.toLowerCase() ||
          user.email.toLowerCase() === username.toLowerCase()
        ) &&
        user.password === password
    );


    if (!matchedUser) {
      const newLog: UserLog = {
        id: `audit-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        username,
        email: username.includes('@')
          ? username
          : `${username}@usuario.local`,
        timestamp: now.toISOString(),
        date: formattedDate,
        time: formattedTime,
        status: 'FAILED',
        userAgent,
        ip,
      };

      appendLog(newLog);

      writeSystemLog(
        'WARN',
        `Intento de autenticación fallido para el usuario: ${username}`
      );

      return NextResponse.json(
        { error: 'Credenciales inválidas', log: newLog },
        { status: 401 }
      );
    }

    const newLog: UserLog = {
      id: `audit-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      username: matchedUser.username,
      email: matchedUser.email,
      timestamp: now.toISOString(),
      date: formattedDate,
      time: formattedTime,
      status: 'SUCCESS',
      userAgent,
      ip,
    };

    appendLog(newLog);

    writeSystemLog(
      'INFO',
      `Autenticación exitosa para el usuario: ${matchedUser.username}`
    );

    const session: UserSession = {
      username: matchedUser.username,
      email: matchedUser.email,
      role: matchedUser.role,
      loginTime: `${formattedDate} ${formattedTime}`,
    };

    return NextResponse.json({
      message: 'Inicio de sesión exitoso',
      session,
      log: newLog,
    });
  } catch (error) {
    console.error('========== ERROR EN LOGIN API ==========');
    console.error(error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : String(error);

    try {
      writeSystemLog(
        'ERROR',
        `Error interno procesando la autenticación: ${errorMessage}`
      );
    } catch (loggingError) {
      console.error('Error adicional al guardar el log:', loggingError);
    }

    return NextResponse.json(
      {
        error: 'Error interno del servidor procesando el login',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}