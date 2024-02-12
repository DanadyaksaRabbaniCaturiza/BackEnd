import express, { Router } from "express";
import { branchController } from "../controllers/branches";
export const route: Router = express.Router();
route.get("/", branchController.read);
route.get("/name-location", branchController.selectNameLocation);
route.get("/pagination", branchController.paging);
route.get("/branch-class", branchController.class);

route.get("/:id", branchController.getById);
route.post("/", branchController.create);
route.patch("/:id", branchController.update);
route.delete("/:id", branchController.delete);
