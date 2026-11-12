import { NextRequest, NextResponse } from 'next/server';
import { appendLog } from '@/lib/logsStorage';
import { UserLog, UserSession } from '@/types/auth';

// Usuarios de prueba configurados
const DEMO_USERS = [
  { username: 'admin', email: 'admin@sistema.com', password: 'password123', role: 'Administrador' },
  { username: 'maria_dev', email: 'maria@tech.io', password: 'password123', role: 'Desarrolladora' },
  { username: 'carlos_ops', email: 'carlos@ops.net', password: 'password123', role: 'DevOps' },
  { username: 'invitado', email: 'guest@portal.com', password: 'password123', role: 'Invitado' },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    const userAgent = req.headers.get('user-agent') || 'Desconocido';
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const formattedTime = now.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Usuario y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Validación contra usuarios de prueba o login general
    const matchedUser = DEMO_USERS.find(
      (u) =>
        (u.username.toLowerCase() === username.toLowerCase() ||
         u.email.toLowerCase() === username.toLowerCase()) &&
        u.password === password
    );

    const isSuccess = !!matchedUser;

    const newLog: UserLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      username: matchedUser ? matchedUser.username : username,
      email: matchedUser ? matchedUser.email : (username.includes('@') ? username : `${username}@usuario.local`),
      timestamp: now.toISOString(),
      date: formattedDate,
      time: formattedTime,
      status: isSuccess ? 'SUCCESS' : 'FAILED',
      userAgent,
      ip,
    };

    // Almacenar el registro en el archivo persistente
    appendLog(newLog);

    if (!isSuccess) {
      return NextResponse.json(
        { error: 'Credenciales inválidas. Intenta con admin / password123', log: newLog },
        { status: 401 }
      );
    }

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
    console.error('Error en login API:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor procesando el login' },
      { status: 500 }
    );
  }
}
