import { Pool } from "pg";

const db = new Pool({
    user: "postgres",
    password: "toor",
    host: "postgres",
    port: 5432,
    database: "notes",
});

export default db;
