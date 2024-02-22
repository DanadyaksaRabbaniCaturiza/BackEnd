import express, { Application, Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { routes } from "./routes";
import { verifyuser } from "./middleware/verify-user";
import cors from "cors";
import { config } from "dotenv";

config();
export const prisma = new PrismaClient();
export const secretKey = process.env.secretKey;
const PORT = process.env.PORT || 8000;
const app: Application = express();

app.use(express.json());
app.use(cors());

//routes
app.use("/todo", verifyuser, routes.todoRoutes);
app.use("/user", routes.userRoutes);

//error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({
    success: false,
    message: error.message,
  });
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
