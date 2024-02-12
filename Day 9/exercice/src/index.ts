import express, { Application, Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { routes } from "./routes";
import cors from "cors";
export const prisma = new PrismaClient();
export const secretKey = "rahasia";
const PORT = 8002;

const app: Application = express();
app.use(express.json());
app.use(cors());

//routes
app.use("/article", routes.ArticleRoutes);
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
