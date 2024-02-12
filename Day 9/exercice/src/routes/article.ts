import express, { Router } from "express";
import { articleController } from "../controller/article";

export const route: Router = Router();
route.get("/", articleController.read);
route.get("/:id", articleController.articleByUser);
route.post("/", articleController.create);
// route.patch("/:id", articleController.update);
route.delete("/:id", articleController.delete);
