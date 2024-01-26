import express, { Request, Response, Application, NextFunction } from "express";
import db from "./config/db";
import { Connection } from "mysql2/typings/mysql/lib/Connection";

const PORT = 9000;
const app: Application = express();

type TPerson = {
  id: Number;
  lastname: string;
  firstname: string;
  age: number;
};

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("test");
});

db.getConnection((err, connection) => {
  if (err) return console.log(err);
  console.log("db connection success");
});

app.get("/persons", (req: Request, res: Response, next: NextFunction) => {
  const queryString = "select * from persons";
  return db.query(queryString, (err, result: TPerson[]) => {
    if (err) return res.status(500).send(err.message);
    return res.send(result);
  });
});

app.listen(PORT, () => {
  console.log(`App Runs on port ${PORT}`);
});
