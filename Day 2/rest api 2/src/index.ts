import express, { Request, Response, Application, NextFunction } from "express";
import { routes } from "./Routes";
import {} from "module";
import { writeLog } from "./middleware/write-log";

const app: Application = express();
const PORT = 7000;

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello");
  next();
});

app.use(writeLog);

// req,res , (next) => request handler
// error ,req,res,(next) => error handler

//user routes
app.use("/users", routes.userRoutes);
app.use("/products", routes.productRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.stack);
  res.status(500).send("Something is broken");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("page not found");
});

app.listen(PORT, () => {
  console.log(`Run on port ${PORT}`);
});
