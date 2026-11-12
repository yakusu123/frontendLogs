'use client';

import React, { useState, useEffect } from 'react';
import { UserLog, UserSession } from '@/types/auth';

const DEMO_PRESETS = [
  { label: 'Admin', user: 'admin', pass: 'password123', role: 'Administrador' },
  { label: 'María (Dev)', user: 'maria_dev', pass: 'password123', role: 'Desarrolladora' },
  { label: 'Carlos (Ops)', user: 'carlos_ops', pass: 'password123', role: 'DevOps' },
  { label: 'Invitado', user: 'invitado', pass: 'password123', role: 'Invitado' },
];

export default function Home() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [session, setSession] = useState<UserSession | null>(null);

  // Historial de Logs
  const [logs, setLogs] = useState<UserLog[]>([]);
  const [filterUser, setFilterUser] = useState('');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'SUCCESS' | 'FAILED'>('ALL');
  const [loadingLogs, setLoadingLogs] = useState(false);

  // Cargar logs al montar
  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoadingLogs(true);
    try {
      const res = await fetch('/api/logs');
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
      }
    } catch (err) {
      console.error('Error al consultar logs:', err);
    } finally {
      setLoadingLogs(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Credenciales inválidas');
      } else {
        setSession(data.session);
      }

      // Siempre refrescamos los logs (tanto éxito como fallo se registran)
      await fetchLogs();
    } catch {
      setErrorMsg('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setSession(null);
  };

  const handleClearLogs = async () => {
    if (!confirm('¿Seguro que deseas vaciar todos los logs de inicio de sesión?')) return;
    try {
      const res = await fetch('/api/logs', { method: 'DELETE' });
      if (res.ok) {
        setLogs([]);
      }
    } catch (err) {
      console.error('Error al limpiar logs:', err);
    }
  };

  const handleExportCSV = () => {
    if (logs.length === 0) return;
    const headers = ['ID', 'Quién (Usuario)', 'Email', 'Cuándo (Fecha)', 'A qué hora (Hora)', 'Estado', 'IP', 'Dispositivo'];
    const rows = logs.map((l) => [
      `"${l.id}"`,
      `"${l.username}"`,
      `"${l.email}"`,
      `"${l.date}"`,
      `"${l.time}"`,
      `"${l.status}"`,
      `"${l.ip || '127.0.0.1'}"`,
      `"${(l.userAgent || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `logs_acceso_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtrado de logs
  const filteredLogs = logs.filter((log) => {
    const matchesUser =
      log.username.toLowerCase().includes(filterUser.toLowerCase()) ||
      log.email.toLowerCase().includes(filterUser.toLowerCase()) ||
      log.date.includes(filterUser) ||
      log.time.includes(filterUser);

    const matchesStatus =
      filterStatus === 'ALL' ? true : log.status === filterStatus;

    return matchesUser && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 font-black text-white text-lg">
            🔐
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              Frontend Logs
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Next.js
              </span>
            </h1>
            <p className="text-xs text-slate-400">Control de acceso & Registro de inicios de sesión</p>
          </div>
        </div>

        {session ? (
          <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs uppercase">
              {session.username.substring(0, 2)}
            </div>
            <div className="text-left text-xs">
              <p className="font-semibold text-slate-200">{session.username} <span className="text-slate-400 font-normal">({session.role})</span></p>
              <p className="text-slate-400">Conectado: {session.loginTime}</p>
            </div>
            <button
              onClick={handleLogout}
              className="ml-2 px-3 py-1 text-xs font-medium text-rose-300 hover:text-white hover:bg-rose-600/30 border border-rose-500/30 rounded-lg transition"
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <span className="text-xs text-slate-500 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            Sin sesión activa
          </span>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Formulario de Login */}
        <section className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">Inicio de Sesión</h2>
            <p className="text-xs text-slate-400 mt-1">
              Cada intento registrará automáticamente <strong>quién</strong>, <strong>cuándo</strong> y <strong>a qué hora</strong> accede.
            </p>
          </div>

          {/* Quick presets */}
          <div className="mb-5">
            <label className="text-xs font-semibold text-slate-400 block mb-2">
              Rellenar rápido con usuario demo:
            </label>
            <div className="flex flex-wrap gap-2">
              {DEMO_PRESETS.map((p) => (
                <button
                  key={p.user}
                  type="button"
                  onClick={() => {
                    setUsername(p.user);
                    setPassword(p.pass);
                    setErrorMsg(null);
                  }}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition ${
                    username === p.user
                      ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300 font-medium'
                      : 'bg-slate-800/70 border-slate-700/60 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Usuario o Correo
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ej: admin o maria_dev"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña (ej: password123)"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <span>⚠️</span>
                <span>{errorMsg}</span>
              </div>
            )}

            {session && !errorMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <span>✅</span>
                <span>Sesión iniciada con éxito para <strong>{session.username}</strong></span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/25 transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Validando y registrando...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800 text-xs text-slate-400 flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">●</span>
              <span>Todos los logins se auditan y almacenan en disco (`data/logs.json`).</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-indigo-400 font-bold">●</span>
              <span>Contraseña común de prueba: <code className="bg-slate-800 px-1 py-0.5 rounded text-slate-200">password123</code></span>
            </div>
          </div>
        </section>

        {/* Right Column: Visualizador de Logs */}
        <section className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">Registro de Inicios de Sesión</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold border border-slate-700">
                  {filteredLogs.length} {filteredLogs.length === 1 ? 'log' : 'logs'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Auditoría en tiempo real de accesos al sistema</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={fetchLogs}
                disabled={loadingLogs}
                title="Refrescar logs"
                className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-200 transition"
              >
                {loadingLogs ? '...' : '🔄 Refrescar'}
              </button>
              <button
                onClick={handleExportCSV}
                title="Descargar en formato CSV"
                className="px-3 py-1.5 text-xs font-medium bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-lg transition"
              >
                📥 CSV
              </button>
              <button
                onClick={handleClearLogs}
                title="Limpiar logs"
                className="px-3 py-1.5 text-xs font-medium bg-rose-600/10 hover:bg-rose-600/20 text-rose-300 border border-rose-500/20 rounded-lg transition"
              >
                🗑️ Limpiar
              </button>
            </div>
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div className="sm:col-span-2">
              <input
                type="text"
                placeholder="Buscar por usuario, correo, fecha u hora..."
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'ALL' | 'SUCCESS' | 'FAILED')}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="ALL">Todos los estados</option>
                <option value="SUCCESS">Solo Exitosos</option>
                <option value="FAILED">Solo Fallidos</option>
              </select>
            </div>
          </div>

          {/* Lista de Registros */}
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <th className="py-3 px-3.5 font-semibold">Quién (Usuario)</th>
                  <th className="py-3 px-3.5 font-semibold">Cuándo (Fecha)</th>
                  <th className="py-3 px-3.5 font-semibold">A qué hora</th>
                  <th className="py-3 px-3.5 font-semibold">Estado</th>
                  <th className="py-3 px-3.5 font-semibold">Origen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/50">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      No se encontraron registros de inicio de sesión
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-3.5">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] ${
                            log.status === 'SUCCESS' ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/30' : 'bg-rose-600/20 text-rose-300 border border-rose-500/20'
                          }`}>
                            {log.username.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-200">{log.username}</div>
                            <div className="text-[11px] text-slate-500">{log.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3.5 text-slate-300 font-mono">
                        {log.date}
                      </td>
                      <td className="py-3 px-3.5 text-slate-300 font-mono font-medium">
                        {log.time}
                      </td>
                      <td className="py-3 px-3.5">
                        {log.status === 'SUCCESS' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            ● Exitoso
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                            ● Fallido
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3.5 text-slate-400 text-[11px] max-w-[140px] truncate" title={log.userAgent}>
                        {log.ip || '127.0.0.1'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
