# Mi Turno Web

## Descripción del Proyecto

**Mi Turno Web** es una aplicación web diseñada para gestionar la reserva de turnos en empresas con sucursales físicas. Permite a las sucursales administrar la cantidad de clientes simultáneos y gestionar los rangos horarios disponibles. Los turnos tienen una duración de 15 minutos y pueden ser cancelados con hasta 2 horas de antelación. La plataforma también incluye un panel gráfico que muestra las reservas y proporciona métricas basadas en las interacciones.

## Tecnologías Utilizadas

- **Backend:** Node.js, Express
- **Frontend:** React.js, Next.js
- **Base de Datos:** PostgreSQL Sequelize
- **Gráficos:** tailwind

![mtw1](https://ibb.co/yd5v71R)
![mtw2](https://ibb.co/chqDt9f)

## Funcionalidades

### Funcionalidades Principales

- **Alta de clientes:** Permite registrar clientes con nombre, apellido, DNI y correo electrónico.
- **Sistema de autenticación:** Roles de acceso para Empresa/Administrador, Sucursal/Operador y Cliente/Usuario.
  - **Administrador:** Gestión de sucursales, horarios y clientes simultáneos.
  - **Operador:** Visualización de reservas y confirmación de asistencia.
  - **Usuario:** Reserva, edición y cancelación de turnos.
- **Panel de reservas:** Visualización y gestión de turnos disponibles, con notificaciones de baja disponibilidad.
- **Notificaciones por correo:** Confirmación de alta, cambios en la reserva, recordatorio 24 horas antes del turno.

### Funcionalidades Adicionales (Opcional)

- Confirmación de asistencia por parte del comercio.
- Integración con Google Calendar.
- Panel de métricas para reservas y asistencias.
- Deploy en la nube.
- Visualización en tiempo real de reservas (WebSockets).
- Contenedores Docker.

## Instalación y Ejecución

1. Clonar el repositorio.
2. Instalar las dependencias:

   ```bash
   npm install
   npm start


   ```
