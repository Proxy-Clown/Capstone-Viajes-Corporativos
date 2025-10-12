
import React from "react";

export default function ColaboradorPanel() {
  return (
    <>
      <div className="shell">
        <header className="appbar" aria-label="Barra superior">
          <div className="brand" aria-label="Marca">
            <span className="dot" aria-hidden="true"></span>
            <div>
              Sistema de Gestión de Viajes Corporativos - NeoTravelFlow
              <small className="muted" style={{ display: "block", marginTop: "-2px" }}>
                Panel del Colaborador (usuario que viaja)
              </small>
            </div>
          </div>
          <div className="search" role="search">
            <input type="search" placeholder="Buscar viajes, reservas, políticas…" aria-label="Buscar" />
            <button className="btn">Buscar</button>
          </div>
          <div className="user" aria-label="Usuario">
            <div>
              <strong>Usuario</strong>
              <small>Colaborador</small>
            </div>
            <div className="avatar" aria-hidden="true">U</div>
          </div>
        </header>

       
        <main className="main">
         
          <section className="card">
            <h3>Acciones rápidas</h3>
            <div className="quick" role="group" aria-label="Accesos directos">
              <button className="btn primary">Nueva solicitud de viaje</button>
              <button className="btn">Cargar comprobante</button>
              <button className="btn">Ver políticas</button>
            </div>
          </section>

         
          <section className="grid-3">
            <article className="card kpi" aria-label="KPI Próximo viaje">
              <div>
                <div className="pill ok">Próximo viaje</div>
                <strong>15 Oct → 20 Oct</strong>
                <div className="meta muted">SCL → LIM · 1 reserva pendiente</div>
              </div>
              <button className="btn ghost">Ver detalles</button>
            </article>
            <article className="card kpi" aria-label="KPI Gastos">
              <div>
                <div className="pill warn">Rendición</div>
                <strong>$ 245.300</strong>
                <div className="meta muted">Por rendir · 3 comprobantes</div>
              </div>
              <button className="btn ghost">Rendir ahora</button>
            </article>
            <article className="card kpi" aria-label="KPI Solicitudes">
              <div>
                <div className="pill">Estado</div>
                <strong>2</strong>
                <div className="meta muted">Solicitudes en revisión</div>
              </div>
              <button className="btn ghost">Ver solicitudes</button>
            </article>
          </section>

          
          <section className="card">
            <h3>Próximo viaje</h3>
            <div className="trip">
              <div className="trip-row" aria-label="Resumen de itinerario">
                <div>
                  <span className="chip">Santiago (SCL)</span> ⟶ <span className="chip">Lima (LIM)</span>
                  <div className="muted" style={{ marginTop: 6 }}>
                    Salida: 15 Oct 08:40 · Regreso: 20 Oct 18:05
                  </div>
                </div>
                <div className="actions">
                  <button className="btn">Ver itinerario</button>
                  <button className="btn">Descargar PDF</button>
                  <button className="btn">Agregar a calendario</button>
                  <button className="btn primary">Check-in (cuando esté disponible)</button>
                </div>
              </div>
            </div>
          </section>

         
          <section className="card">
            <h3>Mis viajes</h3>
            <table className="table" aria-label="Listado de viajes">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Ruta</th>
                  <th>Motivo</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>15–20 Oct</td>
                  <td>SCL → LIM</td>
                  <td>Reunión regional</td>
                  <td>
                    <span className="status aprobado">Aprobado</span>
                  </td>
                  <td>
                    <button className="btn">Abrir</button>
                  </td>
                </tr>
                <tr>
                  <td>03–05 Sep</td>
                  <td>SCL → MVD</td>
                  <td>Capacitación</td>
                  <td>
                    <span className="status enproceso">Rindiendo gastos</span>
                  </td>
                  <td>
                    <button className="btn">Rendir</button>
                  </td>
                </tr>
                <tr>
                  <td>12–13 Jul</td>
                  <td>SCL → ANF</td>
                  <td>Visita cliente</td>
                  <td>
                    <span className="status borrador">Borrador</span>
                  </td>
                  <td>
                    <button className="btn">Completar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </main>

       
        <aside className="aside" aria-label="Barra lateral">
          <section className="card">
            <h3>Notificaciones</h3>
            <div className="list">
              <div className="note">Tu check-in para el vuelo SCL→LIM se habilita en 24 h.</div>
              <div className="note">Nueva política de equipaje de mano (LatAm): revisa los límites.</div>
              <div className="note">Recordatorio: sube los comprobantes del viaje a Montevideo.</div>
            </div>
          </section>

          <section className="card">
            <h3>Atajos útiles</h3>
            <div className="list">
              <button className="btn">Guía de viáticos</button>
              <button className="btn">Contacto de emergencia</button>
              <button className="btn">Soporte viajes</button>
            </div>
          </section>

          <section className="card">
            <h3>Ayuda rápida</h3>
            <p className="muted">
              ¿Primera vez rindiendo gastos? Revisa el paso a paso y las políticas por país.
            </p>
            <button className="btn primary">Ver tutorial</button>
          </section>
        </aside>
      </div>

      
      <style>{`
        :root{
          --bg:#C4EAFF;
          --card:#ffffff;
          --ink:#0f172a;
          --muted:#475569;
          --brand:#1d4ed8;
          --ok:#10b981;
          --warn:#f59e0b;
          --danger:#ef4444;
          --ring:rgba(29,78,216,.25);
          --radius:18px;
          --shadow:0 8px 24px rgba(2,6,23,.08);
        }
        *{box-sizing:border-box}
        html,body{height:100%}
        body{
          margin:0;
          font-family:ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji","Segoe UI Emoji";
          color:var(--ink);
          background:var(--bg);
          line-height:1.4;
        }
        .shell{
          display:grid;grid-template-columns: 1fr minmax(260px, 320px);
          gap:18px;padding:18px;max-width:1200px;margin-inline:auto;
        }
        header.appbar{
          grid-column:1 / -1;background:var(--card);border-radius:var(--radius);box-shadow:var(--shadow);
          display:flex;align-items:center;justify-content:space-between;padding:14px 16px;gap:12px;
        }
        .brand{display:flex;align-items:center;gap:10px;font-weight:700}
        .brand .dot{width:12px;height:12px;border-radius:50%;background:var(--brand);box-shadow:0 0 0 4px var(--ring)}
        .search{flex:1;display:flex;gap:8px;max-width:640px}
        .search input{flex:1;padding:10px 12px;border-radius:12px;border:1px solid #e2e8f0;background:#f8fafc;outline:none}
        .search input:focus{box-shadow:0 0 0 6px var(--ring);border-color:transparent;background:#fff}
        .user{display:flex;align-items:center;gap:10px}
        .avatar{width:36px;height:36px;border-radius:50%;background:#bfdbfe;display:grid;place-items:center;font-weight:700;color:#1e3a8a;border:2px solid #93c5fd}
        .user small{display:block;color:var(--muted);font-size:12px;margin-top:-2px}
        .card{background:var(--card);border-radius:var(--radius);box-shadow:var(--shadow);padding:16px}
        .card h3{margin:0 0 10px 0;font-size:18px}
        .muted{color:var(--muted)}
        .pill{display:inline-flex;align-items:center;gap:6px;font-size:12px;padding:6px 10px;border-radius:999px;background:#f1f5f9;color:#0f172a}
        .pill.ok{background:#ecfdf5;color:#065f46}
        .pill.warn{background:#fffbeb;color:#92400e}
        .pill.danger{background:#fef2f2;color:#991b1b}
        .main{display:grid;gap:18px;grid-template-rows:auto auto 1fr}
        .grid-3{display:grid;gap:18px;grid-template-columns:repeat(3,1fr)}
        .kpi{display:flex;justify-content:space-between;align-items:flex-start;gap:10px}
        .kpi strong{font-size:24px}
        .kpi .meta{font-size:12px}
        .trip{display:grid;gap:10px}
        .trip-row{display:flex;gap:12px;align-items:center;justify-content:space-between;border:1px dashed #e2e8f0;border-radius:14px;padding:10px 12px;background:#f8fafc}
        .chip{padding:6px 10px;border-radius:999px;background:#e0f2fe;color:#075985;font-size:12px}
        .actions{display:flex;flex-wrap:wrap;gap:8px}
        .btn{appearance:none;border:1px solid #e2e8f0;background:#fff;padding:10px 12px;border-radius:12px;cursor:pointer;transition:transform .04s ease, box-shadow .1s ease, background .1s ease}
        .btn:hover{transform:translateY(-1px);box-shadow:0 6px 16px rgba(2,6,23,.06)}
        .btn.primary{background:var(--brand);border-color:transparent;color:#fff}
        .btn.ghost{background:#f8fafc}
        .table{width:100%;border-collapse:separate;border-spacing:0 10px}
        .table thead th{text-align:left;font-size:12px;color:var(--muted);font-weight:600;padding:0 8px}
        .table tbody tr{background:#fff;box-shadow:var(--shadow)}
        .table tbody td{padding:12px 8px}
        .status{font-size:12px}
        .status.aprobado{color:#065f46;background:#ecfdf5;border-radius:999px;padding:6px 10px;display:inline-block}
        .status.enproceso{color:#7c2d12;background:#fff7ed;border-radius:999px;padding:6px 10px;display:inline-block}
        .status.borrador{color:#1f2937;background:#f3f4f6;border-radius:999px;padding:6px 10px;display:inline-block}
        .aside{display:grid;gap:18px;position:sticky;top:18px;height:max-content}
        .list{display:grid;gap:10px}
        .note{background:#f8fafc;border:1px solid #e2e8f0;padding:10px 12px;border-radius:12px;font-size:14px}
        .quick{display:grid;gap:10px;grid-template-columns:repeat(3,1fr)}
        .quick .btn{width:100%}
        @media (max-width: 980px){
          .shell{grid-template-columns:1fr}
          .aside{position:static}
          .grid-3{grid-template-columns:1fr;gap:12px}
          header.appbar{flex-wrap:wrap}
        }
      `}</style>
    </>
  );
}

