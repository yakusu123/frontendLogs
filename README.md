# Frontend Logs - Sistema de Login & Auditoría de Sesiones

Aplicación web desarrollada con **Next.js (App Router)**, **TypeScript** y **Tailwind CSS** que implementa un formulario de inicio de sesión con auditoría completa de accesos (quién, cuándo y a qué hora).

## 🚀 Características

- **Formulario de Login:** Validación de credenciales con soporte de usuarios demo para pruebas inmediatas.
- **Auditoría & Registro (Logs):**
  - **Quién:** Nombre de usuario y correo electrónico.
  - **Cuándo:** Fecha exacta del intento de inicio de sesión (`DD/MM/YYYY`).
  - **A qué hora:** Hora exacta (`HH:mm:ss`).
  - **Estado:** Identificación de inicios exitosos vs. fallidos.
  - **Metadatos:** Dirección IP y User Agent del dispositivo.
- **Persistencia:** Almacenamiento de logs en archivo local (`data/logs.json`).
- **Filtros & Búsqueda:** Búsqueda en tiempo real por usuario/correo/fecha y filtro por estado.
- **Exportación:** Descarga de registros en formato CSV.
- **Limpieza de historial:** Opción de resetear o depurar los registros.

## 👥 Usuarios de Prueba

| Usuario | Contraseña | Rol |
| :--- | :--- | :--- |
| `admin` | `password123` | Administrador |
| `maria_dev` | `password123` | Desarrolladora |
| `carlos_ops` | `password123` | DevOps |
| `invitado` | `password123` | Invitado |

## 🛠️ Instalación y Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev
```

Abre en tu navegador: [http://localhost:3000](http://localhost:3000)
