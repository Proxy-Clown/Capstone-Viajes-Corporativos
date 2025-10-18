import { betterAuth } from "better-auth";
import {drizzleAdapter} from "better-auth/adapters/drizzle";
import {db} from "@/src/db";
import * as schema from "@/src/db/schema"
import { nextCookies } from "better-auth/next-js";
export const auth = betterAuth({
    emailAndPassword:{
        enabled:true
    },
    plugins:   [nextCookies()],
    session:{
        expiresIn: 60*60*24*7,
    },
    database: drizzleAdapter(db,{
        provider: "sqlite",
        schema,
    })
});


