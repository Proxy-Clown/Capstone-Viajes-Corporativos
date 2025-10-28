 import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
 const session = await auth.api.getSession({ //GetSession: Revisa la session actual (AHORA FUNCIONAL)
          headers: await headers()
      })
  
      if(!session) {
          redirect("/login")
      }
  