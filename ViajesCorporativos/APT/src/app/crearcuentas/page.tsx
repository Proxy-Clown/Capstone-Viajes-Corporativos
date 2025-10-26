
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import {Button} from "@/src/components/ui/button"
import { signUp } from "@/src/server/users";
export default async function crearcuentas(){
   const session = await auth.api.getSession({
    headers: await headers()
  });

  console.log("SESSION:", session);

    return(

         <div className="flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md">
            <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur p-6 md:p-8 shadow-sm">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Iniciar Sesión</h2>
                <p className="text-sm text-slate-500"></p>
                  <Button onClick={signUp}></Button>
              </div>
         
                </div>
        </div>
        </div>
















        )

}