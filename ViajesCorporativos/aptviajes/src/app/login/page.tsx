
import { LoginForm } from "@/components/login-form"
import {
  Card,
  CardTitle,
} from "@/components/ui/card"
export default function LoginPage() {

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
        </a>
        <div>
          <Card className="justifiy">
            <CardTitle className="flex text-5xl font-bold text-justify">Sistema de gestion de viajes corporativos</CardTitle>
          </Card>
        </div>
        <LoginForm/>
      </div>
    </div>
  )
}
