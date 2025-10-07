"use client";

import { zodResolver} from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Input } from "./ui/input"
import{
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { signIn } from "@/server/users"

import {z} from "zod"
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password:  z.string().min(8),
  destino: z.string().min(2).max(50),
  motivo: z.string().min(8),
  test2: z.string().min(8),
  test3: z.string().min(2).max(50),
});

export function SoliuserForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:"",
      destino: "",
      motivo:"",
      test2:"",
      test3: "",
    },
  });

    async function onSumbit(values: z.infer<typeof formSchema>) {
    const {success, message} = await signIn(values.email, values.password);
    
    if (success){
      toast.success(message as string);
      router.push("/Home");
    } else{
      toast.error(message as string);
    }
    
    
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bienvenido</CardTitle>
          <CardDescription>
            Ingresa con la cuenta entregada por tu superior
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSumbit)} className="space-y-8">
            <div className="grid gap-6">
                <div className="flex flex-col gap-4">
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <FormField
                  control={form.control}
                  name="destino"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destino</FormLabel>
                      <FormControl>
                        <Input placeholder="..." {...field} />
                      </FormControl>
                       <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex flex-col gap-2">
                    <FormField
                      control={form.control}
                      name="motivo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>test1</FormLabel>
                          <FormControl>
                            <input 
                             placeholder="********"
                             {...field}
                             type="motivo"
                             />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                  </div>
                <div>
                    <div>
                        <FormField
                            control={form.control}
                            name="test2"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>test2</FormLabel>
                                    <FormControl>
                                        <input
                                            placeholder="..."
                                            {...field}
                                            type="test2"
                                        />
                                        <input
                                         placeholder="..."
                                         {...field}
                                         type="test1"
                                        />
                                    </FormControl>
                                   
                                </FormItem>   
                            
                            )}
                            />
                        
                    </div>
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
            </div>
          </form>
        </Form>
        </CardContent>
      </Card>
    </div>
  )
}
