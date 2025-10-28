import {drizzle} from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import {user,session,account,verification,viajes} from "@/src/db/schema"

const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite,{
schema: {user,session,account,verification,viajes}
});

