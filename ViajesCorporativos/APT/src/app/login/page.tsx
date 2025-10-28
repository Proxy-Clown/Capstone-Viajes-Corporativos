'use client';

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import React,{useState} from "react";
import { User, Lock, Eye, EyeOff, LogIn, ClipboardCheck} from "lucide-react";
import {z} from "zod"
import {signIn} from "@/src/server/users"
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(8),
});



export default function NeoTravelFlowLogin({  
}: React.ComponentProps<"div">){
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email:"",
      password:"",
    },

  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
      const {success} = await signIn(values.email, values.password)
      if (success) {
        router.push("/Home");
      } else {
        console.log("RIP");
      }
    }
    const [copiedKey, setCopiedKey] = useState<string | null>(null);
    function CopyPill({ label, sublabel, value }: { label: string; sublabel: string; value: string }) {
    const isCopied = copiedKey === value;
    return (
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(value);
            setCopiedKey(value);
            setTimeout(() => setCopiedKey(null), 1200);
          } catch (err) {
            console.warn("Clipboard not available", err);
          }
        }}
        className="group w-full flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:shadow-sm"
      >
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-900 truncate">{label}</p>
          <p className="text-xs text-slate-500 truncate">{sublabel}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-mono text-slate-500 tracking-wider bg-slate-50 border border-slate-200 rounded px-2 py-1">
            {value}
          </span>
          <ClipboardCheck className={`h-4 w-4 transition ${isCopied ? "text-emerald-500" : "text-slate-400 group-hover:text-slate-600"}`} />
        </div>
      </button>
    );
  }
   

  return (
    <div className="min-h-screen w-full bg-slate-50">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-2">
        {/* Left panel */}
        <div className="relative hidden lg:block overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_-100px_-200px,#334155,transparent),radial-gradient(1200px_600px_at_120%_120%,#0f172a,transparent)]" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#111B2E] via-[#1C2A4A] to-[#2B2A6F]" />
          <div className="relative z-10 h-full w-full p-12 flex">
            <div className="mt-auto mb-24">
              <p className="text-slate-200 text-3xl md:text-4xl font-light">Bienvenido a</p>
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-sky-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                    <label>NeoFlowTravel</label>
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md">
            <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur p-6 md:p-8 shadow-sm">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Iniciar Sesión</h2>
                <p className="text-sm text-slate-500">Ingresa tus credenciales</p>
              </div>

              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Username */}
                <label className="block text-sm font-medium text-slate-700">Usuario</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    <User className="h-4 w-4 text-slate-400" />
                  </span>
                  <input
                    type="text"
                    placeholder="Ingresa tu correo"
                    className="w-full rounded-xl border border-slate-300 bg-white px-9 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none ring-0 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    {...form.register("email")}
                    required
                    
                  />
                </div>

                {/* Password */}
                <label className="block text-sm font-medium text-slate-700">Contraseña</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Lock className="h-4 w-4 text-slate-400" />
                  </span>
                  <input
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    className="w-full rounded-xl border border-slate-300 bg-white px-9 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none ring-0 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    required
                    autoComplete="current-password"
                    {...form.register("password")}
                  />
                  
                 
                  
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-60"
                >Iniciar Sesion
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-2 text-xs uppercase tracking-wider text-slate-400">
                    Usuarios de prueba
                  </span>
                </div>
              </div>

              {/* Test users */}
               <div className="space-y-3">
                <CopyPill label="Duoc" sublabel="UserDuoc" value="Duoc1234" />
              </div>
            

            {/* Fine print */}
            <p className="mt-4 text-center text-xs text-slate-400">
              © {new Date().getFullYear()} NeoTravelFlow. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )};