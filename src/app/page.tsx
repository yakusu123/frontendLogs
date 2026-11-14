'use client';

import React, { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberDevice, setRememberDevice] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col justify-between items-center py-8 px-4 relative select-none">
      {/* Botón flotante superior para acceder a Auditoría & Logs */}
      <div className="w-full max-w-5xl flex justify-end">
        <button
          type="button"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/80 hover:bg-white text-slate-700 border border-slate-200/80 shadow-sm backdrop-blur transition cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Auditoría & Logs</span>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full border border-slate-200">
            En vivo
          </span>
        </button>
      </div>

      {/* Contenedor Central */}
      <div className="w-full max-w-[440px] flex flex-col items-center my-auto">
        {/* Cabecera / Logotipo */}
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="relative mb-3">
            <div className="w-14 h-14 rounded-2xl bg-slate-950 flex items-center justify-center shadow-lg shadow-slate-900/15 border border-slate-800">
              {/* Isotipo M estilizado */}
              <svg
                className="w-7 h-7 text-sky-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19V7l8 7 8-7v12" />
              </svg>
            </div>
            {/* Indicador brillante en esquina */}
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-blue-500 border-2 border-white shadow-sm shadow-blue-500/50"></span>
          </div>

          <h1 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
            Nexus Enterprise
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xs font-normal">
            Portal de Acceso Seguro <span className="mx-1">•</span> Inicie sesión con sus credenciales corporativas
          </p>
        </div>

        {/* Tarjeta de Autenticación */}
        <div className="w-full bg-white rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-100 p-7">
          {/* Banner de Sesión Institucional */}
          <div className="mb-5 bg-sky-50/70 border border-sky-100/90 rounded-xl px-3.5 py-2 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-sky-700 font-medium">
              <svg className="w-4 h-4 text-sky-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Sesión Institucional Protegida</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">SSO Activo</span>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            {/* Campo: Correo Corporativo o ID */}
            <div>
              <div className="flex justify-between items-center mb-1.5 text-xs">
                <label className="font-semibold text-slate-700">
                  Correo corporativo o ID
                </label>
                <span className="text-slate-400 text-[11px]">
                  Ej: usuario@nexus.com
                </span>
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-slate-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nombre.apellido@nexus.corp"
                  className="w-full bg-slate-50/80 border border-slate-200/90 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Campo: Contraseña */}
            <div>
              <div className="flex justify-between items-center mb-1.5 text-xs">
                <label className="font-semibold text-slate-700">
                  Contraseña de seguridad
                </label>
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-700 hover:underline text-[11px] font-medium"
                >
                  ¿Olvidó su contraseña?
                </button>
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-slate-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-50/80 border border-slate-200/90 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Checkbox: Recordar este dispositivo */}
            <div className="flex items-center gap-2 pt-0.5">
              <input
                type="checkbox"
                id="remember"
                checked={rememberDevice}
                onChange={(e) => setRememberDevice(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="remember" className="text-xs text-slate-600 font-medium cursor-pointer">
                Recordar este dispositivo
              </label>
            </div>

            {/* Botón Principal: Iniciar Sesión */}
            <button
              type="submit"
              className="w-full mt-2 py-2.5 px-4 rounded-xl font-medium text-xs text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition active:scale-[0.99] cursor-pointer"
            >
              <span>Iniciar Sesión</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

          {/* Separador */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider text-slate-400">
              <span className="bg-white px-3">O autenticarse vía</span>
            </div>
          </div>

          {/* Botones de SSO Institucionales */}
          <div className="grid grid-cols-2 gap-3">
            {/* Azure AD */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200/80 text-slate-700 text-xs font-semibold transition cursor-pointer"
            >
              {/* Azure icon */}
              <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.05 4.24l-6.8 11.94 4.5 3.58 6.07-10.74-3.77-4.78zm-4.32 1.34L3 15.52l3.43 2.73 4.2-7.39-1.9-5.28z" />
              </svg>
              <span>Azure AD</span>
            </button>

            {/* Google Workspace */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200/80 text-slate-700 text-xs font-semibold transition cursor-pointer"
            >
              {/* Google G icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.04h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.04c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.13C3.26 21.4 7.36 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.28c-.25-.72-.38-1.49-.38-2.28s.13-1.56.38-2.28V6.59H1.24C.45 8.16 0 9.93 0 12s.45 3.84 1.24 5.41l4.04-3.13z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.6 1.24 6.59l4.04 3.13c.95-2.83 3.6-4.97 6.72-4.97z"
                />
              </svg>
              <span>Workspace</span>
            </button>
          </div>
        </div>

        {/* Pie de página inferior */}
        <div className="mt-6 flex flex-col items-center gap-1.5 text-center">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Encriptación de 256 bits y cumplimiento de estándares de seguridad</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <a href="#" className="hover:text-slate-600 transition">Términos de servicio</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-600 transition">Políticas corporativas</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-600 transition">Soporte TI</a>
          </div>
        </div>
      </div>
    </div>
  );
}
