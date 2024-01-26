import express, { Request, Response, Application, NextFunction } from "express";
import fs from "fs";
import { routes } from "./routes";

const PORT = 8002;
const app: Application = express();
app.use(express.json());

////------------------------------------------------------------------------------------------------------------------------------------------////

app.use("/", routes.expenseRoute);

////------------------------------------------------------------------------------------------------------------------------------------------////

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.stack);
  res.status(500).send("Something is broken");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("page not found");
});

app.listen(PORT, () => {
  console.log(`App Runs on port ${PORT}`);
});
