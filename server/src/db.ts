import { Pool } from "pg";

const db = new Pool({
    user: "postgres",
    password: "toor",
    host: "localhost",
    port: 5432,
    database: "notes",
});

export default db;
