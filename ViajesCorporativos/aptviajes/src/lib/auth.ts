
import { betterAuth } from "better-auth";
import {db} from '@/db';
import * as schema from "@/db/schema";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
    export const auth = betterAuth({
        emailAndPassword: {
            enabled: true,
            autoSignIn: false
        },
        database: drizzleAdapter(db,{
            provider: "sqlite",
            schema,
        })
    });
    

    



