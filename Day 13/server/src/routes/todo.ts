import express, { Router } from "express";
import { todoController } from "../controller/todo";
export const route: Router = express.Router();
route.get("/", todoController.read);
route.post("/", todoController.create);
route.patch("/:id", todoController.edit);
route.delete("/:id", todoController.delete);
