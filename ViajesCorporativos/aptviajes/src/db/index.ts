import {drizzle} from 'drizzle-orm/mysql2';
import mysql from "mysql2/promise";


const poolConnection= mysql.createPool({
    host: "50.31.176.194",
    user:"",
    database:"",
    password:""
})

const db = drizzle(poolConnection)
export {db};

