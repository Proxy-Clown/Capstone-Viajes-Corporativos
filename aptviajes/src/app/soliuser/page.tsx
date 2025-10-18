"use client";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { tripSchema, type TripFormdb } from "@/src/lib/schemas/tripSchema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
// Icons
import { Plane, Send, CheckCircle2, CircleDashed, XCircle, Calendar, MapPin } from "lucide-react";

// --- Tipos y esquema ---
type Role = "employee" | "manager" | "finance";

enum ApprovalStatus {
  DRAFT = "DRAFT",
  SUBMITTED = "SUBMITTED",
  MANAGER_APPROVED = "MANAGER_APPROVED",
  MANAGER_REJECTED = "MANAGER_REJECTED",
  FINANCE_APPROVED = "FINANCE_APPROVED",
  FINANCE_REJECTED = "FINANCE_REJECTED",
}

type Approver = {
  role: Role;
  name: string;
  date?: string;
  decision?: "approved" | "rejected" | "pending";
  notes?: string;
};

type TravelRequest = {
  id: string;
  status: ApprovalStatus;
  employeeName: string;
  createdAt: string;
  approvers: Approver[];
  payload: TripFormdb | null;
};

// --- Helpers visuales ---
function StatusPill({ status }: { status: ApprovalStatus }) {
  const map: Record<ApprovalStatus, { label: string; cls: string }> = {
    [ApprovalStatus.DRAFT]: { label: "Borrador", cls: "border border-gray-300 text-gray-700 bg-white" },
    [ApprovalStatus.SUBMITTED]: { label: "En revisión (Jefatura)", cls: "bg-gray-200 text-gray-800" },
    [ApprovalStatus.MANAGER_APPROVED]: { label: "Aprobado por Jefatura", cls: "bg-green-100 text-green-700" },
    [ApprovalStatus.MANAGER_REJECTED]: { label: "Rechazado por Jefatura", cls: "bg-red-100 text-red-700" },
    [ApprovalStatus.FINANCE_APPROVED]: { label: "Aprobado por Finanzas", cls: "bg-green-100 text-green-700" },
    [ApprovalStatus.FINANCE_REJECTED]: { label: "Rechazado por Finanzas", cls: "bg-red-100 text-red-700" },
  };
  const it = map[status];
  return <span className={`px-2 py-1 rounded-md text-xs font-medium ${it.cls}`}>{it.label}</span>;
}
function Step({
  active,
  done,
  rejected,
  title,
  subtitle,
}: {
  active?: boolean;
  done?: boolean;
  rejected?: boolean;
  title: string;
  subtitle?: string;
}) {
  const neutral = "text-gray-600";
  const activeTone = "text-blue-700";
  const doneTone = "text-emerald-700";
  const rejectTone = "text-red-700";
  const tone = rejected ? rejectTone : done ? doneTone : active ? activeTone : neutral;

  return (
    <div className="flex items-start gap-3">
      <div className="mt-1">
        {rejected ? (
          <XCircle className={`h-5 w-5 ${tone}`} />
        ) : done ? (
          <CheckCircle2 className={`h-5 w-5 ${tone}`} />
        ) : (
          <CircleDashed className={`h-5 w-5 ${tone}`} />
        )}
      </div>
      <div>
        <div className={`text-sm font-medium ${tone}`}>{title}</div>
        {subtitle ? <div className="text-xs text-gray-500">{subtitle}</div> : null}
      </div>
    </div>
  );
}

export default  function TravelRequestPage() {
  return <TravelRequestScreen currentRole="employee" />;
}

export function TravelRequestScreen({ currentRole }: { currentRole: Role }) {
  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState<TravelRequest>({
    id: "TR-0001",
    status: ApprovalStatus.DRAFT,
    employeeName: "Colaborador Demo",
    createdAt: new Date().toISOString(),
    approvers: [
      { role: "employee", name: "Colaborador Demo", decision: "pending" },
      { role: "manager", name: "Jefatura", decision: "pending" },
      { role: "finance", name: "Finanzas", decision: "pending" },
    ],
    payload: null,
  });

  const form = useForm<TripFormdb>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      origin: "",
      destination: "",
      startDate: "",
      endDate: "",
      reason: "",
      attachment: undefined,
    },
    mode: "onChange",
  });

  const watch = form.watch();
  const datesOk = React.useMemo(() => {
    if (!watch.startDate || !watch.endDate) return false;
    return new Date(watch.endDate) >= new Date(watch.startDate);
  }, [watch.startDate, watch.endDate]);

  const submittingDisabled =
    currentRole !== "employee" ||
    request.status !== ApprovalStatus.DRAFT ||
    !form.formState.isValid ||
    !datesOk ||
    loading;

  const onSubmit = form.handleSubmit(async (data) => {
  if (!datesOk) return;
  setLoading(true);

  try {
    // send to database
    const res = await fetch("/api/viajes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP error! status: ${res.status}, body: ${text}`);
    }
    // update local state to simulate approval workflow
    const updated: TravelRequest = {
      ...request,
      status: ApprovalStatus.SUBMITTED,
      payload: data,
      approvers: request.approvers.map((a) =>
        a.role === "employee"
          ? { ...a, decision: "approved", date: new Date().toISOString(), notes: "Solicitud enviada" }
          : a
      ),
    };
    setRequest(updated);
  } catch (error) {
    console.error(error);
    // Replace placeholder with:
    let msg = "Error al enviar la solicitud";
    if (error instanceof Error) {
      msg = `Error al enviar la solicitud: ${error.message}`;
    } else if (typeof error === "string") {
      msg = `Error al enviar la solicitud: ${error}`;
    } else {
      try {
        msg = `Error al enviar la solicitud: ${JSON.stringify(error)}`;
      } catch {
        // keep generic message
      }
    }
    alert(msg);
    console.error(error);
  } finally {
    setLoading(false);
  }
});
const Field = ({ id, label, children }: { id: string; label: string; children: React.ReactNode }) => (
    <div className="grid gap-1.5">
      <Label htmlFor={id} className="text-gray-700">
        {label}
      </Label>
      {children}
    </div>
  );
  return (
    <div className="bg-muted min-h-svh w-full flex items-start justify-center p-6 md:p-10">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Encabezado */}
        <div className="lg:col-span-3">
          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-2xl md:text-3xl font-bold">
                  Solicitud de Viaje
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Flujo: Empleado → Jefatura → Finanzas
                </CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <StatusPill status={request.status} />
                <span className="px-2 py-1 rounded-md text-xs font-medium border border-gray-300 text-gray-700 bg-white hidden md:inline">
                  ID: {request.id}
                </span>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Formulario (2/3) */}
        <div className="lg:col-span-2">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5" />
                Formulario
              </CardTitle>
              <CardDescription className="text-gray-500">
                Completa los datos del viaje. Al enviar, pasará a revisión de jefatura.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-5" onSubmit={onSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field id="origin" label="Origen">
                    <div className="relative">
                      <MapPin className="h-4 w-4 absolute left-3 top-3 text-gray-500" />
                      <Input
                        id="origin"
                        placeholder="Ej: Santiago, CL"
                        className="pl-9"
                        {...form.register("origin")}
                        disabled={request.status !== ApprovalStatus.DRAFT || currentRole !== "employee"}
                      />
                    </div>
                    {form.formState.errors.origin && (
                      <p className="text-xs text-red-600">{form.formState.errors.origin.message}</p>
                    )}
                  </Field>

                  <Field id="destination" label="Destino">
                    <div className="relative">
                      <MapPin className="h-4 w-4 absolute left-3 top-3 text-gray-500" />
                      <Input
                        id="destination"
                        placeholder="Ej: Buenos Aires, AR"
                        className="pl-9"
                        {...form.register("destination")}
                        disabled={request.status !== ApprovalStatus.DRAFT || currentRole !== "employee"}
                      />
                    </div>
                    {form.formState.errors.destination && (
                      <p className="text-xs text-red-600">{form.formState.errors.destination.message}</p>
                    )}
                  </Field>

                  <Field id="startDate" label="Fecha de salida">
                    <div className="relative">
                      <Calendar className="h-4 w-4 absolute left-3 top-3 text-gray-500" />
                      <Input
                        id="startDate"
                        type="date"
                        className="pl-9"
                        {...form.register("startDate")}
                        disabled={request.status !== ApprovalStatus.DRAFT || currentRole !== "employee"}
                      />
                    </div>
                    {form.formState.errors.startDate && (
                      <p className="text-xs text-red-600">{form.formState.errors.startDate.message}</p>
                    )}
                  </Field>

                  <Field id="endDate" label="Fecha de retorno">
                    <div className="relative">
                      <Calendar className="h-4 w-4 absolute left-3 top-3 text-gray-500" />
                      <Input
                        id="endDate"
                        type="date"
                        className="pl-9"
                        {...form.register("endDate")}
                        disabled={request.status !== ApprovalStatus.DRAFT || currentRole !== "employee"}
                      />
                    </div>
                    {form.formState.errors.endDate && (
                      <p className="text-xs text-red-600">{form.formState.errors.endDate.message}</p>
                    )}
                    {!datesOk && watch.startDate && watch.endDate && (
                      <p className="text-xs text-amber-700 mt-1">La fecha de retorno debe ser posterior a la de salida.</p>
                    )}
                  </Field>

                  
                </div>

                <label id="reason">
                  {/* usamos textarea nativa para no depender de shadcn/textarea */}
                  <textarea
                    id="reason"
                    placeholder="Describe el propósito, reuniones, evento, etc."
                    rows={4}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...form.register("reason")}
                    disabled={request.status !== ApprovalStatus.DRAFT || currentRole !== "employee"}
                  />
                  {form.formState.errors.reason && (
                    <p className="text-xs text-red-600">{form.formState.errors.reason.message}</p>
                  )}
                </label>

                <Field id="attachment" label="Adjunto (opcional)">
                  <Input
                    id="attachment"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => form.setValue("attachment", e.target.files?.[0])}
                    disabled={request.status !== ApprovalStatus.DRAFT || currentRole !== "employee"}
                  />
                </Field>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button type="submit" className="gap-2" disabled={submittingDisabled}>
                    <Send className="h-4 w-4" />
                    Enviar solicitud
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Estado & Aprobaciones (1/3) */}
        <div className="lg:col-span-1">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Flujo de Aprobación
              </CardTitle>
              <CardDescription className="text-gray-500">
                Avance de la solicitud (solo lectura para el colaborador)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* timeline */}
              <div className="space-y-5">
                <Step
                  title="Empleado envía solicitud"
                  subtitle={request.approvers.find(a => a.role === "employee")?.date ? "Completado" : "Pendiente"}
                  done={request.status !== ApprovalStatus.DRAFT}
                  active={request.status === ApprovalStatus.DRAFT}
                />

                <div className="ml-6 border-l pl-4 space-y-4">
                  <Step
                    title="Revisión Jefatura"
                    subtitle={
                      request.status === ApprovalStatus.SUBMITTED
                        ? "En revisión"
                        : request.status === ApprovalStatus.MANAGER_APPROVED
                        ? "Aprobado"
                        : request.status === ApprovalStatus.MANAGER_REJECTED
                        ? "Rechazado"
                        : "Pendiente"
                    }
                    done={request.status === ApprovalStatus.MANAGER_APPROVED}
                    active={request.status === ApprovalStatus.SUBMITTED}
                    rejected={request.status === ApprovalStatus.MANAGER_REJECTED}
                  />
                  <Step
                    title="Revisión Finanzas"
                    subtitle={
                      request.status === ApprovalStatus.MANAGER_APPROVED
                        ? "En revisión"
                        : request.status === ApprovalStatus.FINANCE_APPROVED
                        ? "Aprobado"
                        : request.status === ApprovalStatus.FINANCE_REJECTED
                        ? "Rechazado"
                        : "Pendiente"
                    }
                    done={request.status === ApprovalStatus.FINANCE_APPROVED}
                    active={request.status === ApprovalStatus.MANAGER_APPROVED}
                    rejected={request.status === ApprovalStatus.FINANCE_REJECTED}
                  />
                </div>
              </div>

              {/* Resumen */}
              <div className="rounded-xl border bg-white p-4">
                <div className="text-sm font-medium mb-3">Resumen</div>
                {request.payload ? (
                  <ul className="text-sm space-y-1.5 text-gray-700">
                    <li><span className="text-gray-500">Origen:</span> {request.payload.origin}</li>
                    <li><span className="text-gray-500">Destino:</span> {request.payload.destination}</li>
                    <li><span className="text-gray-500">Salida:</span> {request.payload.startDate}</li>
                    <li><span className="text-gray-500">Retorno:</span> {request.payload.endDate}</li>
              
                  </ul>
                ) : (
                  <div className="text-sm text-gray-500">Completa y envía el formulario para ver el resumen.</div>
                )}
              </div>

              {request.status === ApprovalStatus.FINANCE_APPROVED && (
                <div className="text-sm text-emerald-700">
                  ✅ Aprobación completa. Pronto podrás registrar tus gastos y comprobantes.
                </div>
              )}
              {request.status === ApprovalStatus.MANAGER_REJECTED && (
                <div className="text-sm text-red-700">
                  ❌ Rechazado por Jefatura. Ajusta la solicitud y vuelve a enviar.
                </div>
              )}
              {request.status === ApprovalStatus.FINANCE_REJECTED && (
                <div className="text-sm text-red-700">
                  ❌ Rechazado por Finanzas. Revisa políticas o presupuesto del área.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
