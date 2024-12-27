import {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
} from "./config.js";

import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  decimalNumbers: true,
  connectionLimit: 10,
});

// VERIFICAR CONEXIÓN A LA BASE DE DATOS
const checkConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Conexión exitosa a la base de datos.");
    connection.release();
  } catch (error) {
    console.error("Error en la conexión a la base de datos. ", error.message);
  }
};

checkConnection();

export default pool;
