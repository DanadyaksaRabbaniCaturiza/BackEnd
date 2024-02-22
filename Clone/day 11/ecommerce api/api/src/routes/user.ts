/** @format */
import { Response, Request, NextFunction } from "express";

import express, { Router } from "express";
import { userController } from "../controllers/user";
export const route: Router = express.Router();
route.get("/", userController.login);
route.get("/send-mail", userController.sendMail);
route.get("/keep-login", userController.keepLogin);
route.post("/", userController.register);
route.patch("/", userController.forgotPassword);
