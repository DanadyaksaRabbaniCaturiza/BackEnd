import express, { Router } from "express";
import { userController } from "../controller/user";
import { verifyuser } from "../middleware/verify-user";
export const route: Router = express.Router();
route.post("/v1", userController.login);
route.post("/v2", userController.register);
route.post("/v3", verifyuser, userController.keepLogin);
// route.delete("/v4/:id", userController.delete);
