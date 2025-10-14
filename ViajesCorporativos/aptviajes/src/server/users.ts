"use server";
import {auth} from "@/src/lib/auth"
import { authClient } from "../lib/auth-client";
import { headers } from "next/headers"
export const signIn = async(email: string, password: string) => {
   try {
        await auth.api.signInEmail({
            body:{
                email,
                password,
            }   
        })
        
        return {
            success: true,
            message: 'signed in successfully'
        }
        
    } catch (error){
        const e = error as Error
        return{
            success: false,
            message:  e.message || 'Uknown error'
        }
    }
}

export const signUp = async () => {
    await auth.api.signUpEmail({
        body:{
            email:"vice@test.com",
            password:"password123",
            name: "vicente"
        }
    })
}


