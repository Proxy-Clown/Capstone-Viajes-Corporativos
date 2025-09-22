import {drizzle} from 'drizzle-orm/better-sqlite3'
import {user,session,account,verification} from "./schema"
import Database from 'better-sqlite3';

const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite,{
schema: {user,session,account,verification}
});

