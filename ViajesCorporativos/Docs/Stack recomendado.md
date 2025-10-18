*Stack recomendado*
<!-- Idea general sobre Stack Recomendado del proyecto -->


**Front-end**

* React con Tailwind (SPA).
* Next.js (App Router) + TypeScript
* UI: Tailwind CSS + shadcn/ui + lucide-react
* Estado: TanStack Query (server-state) + Zustand (UI state)
* Forms: React Hook Form + Zod


**Back-end**

* NestJS (Node + TypeScript) por modularidad (alternativa: FastAPI si prefieres Python).
* Autenticación: OIDC con Keycloak (self-hosted) o Auth0 (SaaS).
* BD: PostgreSQL (schemas por dominio), Prisma ORM.
* Cache/colas: Redis (sessions, rate limit, jobs con BullMQ).
* Storage: S3-compatible (AWS S3 o MinIO) para comprobantes y PNR.
* Mensajería (si escala): Kafka o RabbitMQ (eventos de booking/conciliación).
* Búsqueda: OpenSearch/Elasticsearch (si necesitas filtrado avanzado y full-text).
* Integraciones: Amadeus/Sabre/TravelPort APIs, Stripe/Adyen para pagos si aplica, Webhooks ERP/HRIS.
* Tiempo real: WebSockets (Socket.IO) para aprobaciones/live updates.
* Observabilidad: OpenTelemetry + Grafana/Tempo + Sentry (FE/BE).
* Testing: Jest + Supertest (API), Playwright (E2E), Zod (contratos).
* CI/CD: GitHub Actions; Docker; despliegue en AWS (ECS/Fargate o EKS), Railway/Fly.io para MVP.

**Seguridad**

* TLS extremo a extremo, CSP estricta, encriptación at-rest (KMS), rotación de credenciales, RBAC por módulo/acción, auditoría a nivel de dominio (solicitudes, aprobaciones, gastos, cambios de política).