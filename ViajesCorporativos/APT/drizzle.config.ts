import {defineConfig} from "drizzle-kit";

export default defineConfig({
    dialect: "sqlite",
    schema: './src/db/schema.ts',
    out:'./src/db/migrations',
    dbCredentials: {
        url: "./src/db/sqlite.db"
    }
});
