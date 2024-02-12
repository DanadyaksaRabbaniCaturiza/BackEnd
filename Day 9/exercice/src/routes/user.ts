import express, { Router } from "express";
import { userController } from "../controller/user";
export const route: Router = express.Router();

route.get("/all", userController.alluser);
route.get("/", userController.login);
route.post("/", userController.register);
