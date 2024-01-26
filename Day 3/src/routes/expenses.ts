import express, { Router, Request, Response, NextFunction } from "express";
import { expensesController } from "../controllers/users";

export const route: Router = express.Router();
route.get("/", expensesController.getAll);
route.get("/expensesList", expensesController.getList);
route.get("/DateRange", expensesController.getByDate);
route.get("/Category", expensesController.getByCategory);
route.get("/expense/:id", expensesController.getDetail);

route.patch("/expense/:id", expensesController.editExpense);
route.post("/", expensesController.addExpense);
route.delete("/expense/:id", expensesController.deleteExpense);
