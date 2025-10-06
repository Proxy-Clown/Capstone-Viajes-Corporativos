*Módulos web (MVP → Escalable)*
<!-- Idea general sobre módulos web para el proyecto -->


**1. Autenticación y RBAC**

    * SSO (SAML/OIDC), MFA, gestión de roles/permisos, auditoría de sesiones.

**2. Perfil & Documentos**

    * Pasaporte/visa, preferencias de viaje, tarjetas corporativas, contactos de emergencia.

**3. Solicitud de Viaje**

    * Formulario guiado (destino, fechas, motivo, centro de costo, proyecto).

**4. Workflow de Aprobación**
t
    * Reglas por jerarquía/montos/área; aprobaciones secuenciales o paralelas; SLA y recordatorios.

**5. Políticas de Viaje**

    * Parámetros por rol/área/ubicación: topes de hotel, clase aérea, anticipación mínima, viáticos.

**6. Integración de Proveedores/Booking**

    * Conectores (GDS/API): vuelos, hoteles, autos; disponibilidad, hold y emisión.
    * Gestión de PNR/confirmaciones y Itinerario unificado.

**7. Gastos & Viáticos** // investigar sobre alguna tarjeta

    * OCR de boletas, categorización, asignación a viaje y centro de costo.
    * Tarjeta corporativa: match transacción ↔ comprobante, reglas de conciliación.

**8. Reportes & Analytics**

    * Tableros: gasto por área/proyecto, ahorro vs. tarifa pública, anticipación, no-shows, CO₂ (opcional).
    * Exportaciones a Excel/CSV y conectores BI.

**9. Notificaciones**

    * Email/Push/In-app: aprobaciones pendientes, cambios de itinerario, faltantes de rendición.

**10. Administración**

    * Catálogos (proveedores, destinos, monedas), parámetros, integraciones, Bitácora de Auditoría.

**11. Seguridad & Cumplimiento**

    * Logs inmutables, retención de datos, encriptación, PII masking, backups.