import { betterAuth } from "better-auth";
import {db} from '@/db';
import * as schema from "@/db/schema";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
    export const auth = betterAuth({
        plugins:[
            
            nextCookies()
        ],
        emailAndPassword: {
            enabled: true,
            autoSignIn: false
        },
        database: drizzleAdapter(db,{
            provider: "sqlite",
            schema,
        })
    });
    



