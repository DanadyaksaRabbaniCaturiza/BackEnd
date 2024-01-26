import mysql from "mysql2";

export default mysql.createPool({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "andromeda1",
  database: "db_purwadhika",
});
