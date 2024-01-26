import express, { Router, Request, Response, NextFunction } from "express";

export const route: Router = express.Router();

route.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("ini product");
});
route.get("/detail", (req: Request, res: Response, next: NextFunction) => {
  res.send("ini product detail");
});
