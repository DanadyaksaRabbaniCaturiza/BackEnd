import express, { Router, Request, Response, NextFunction } from "express";

export const userController = {
  getAll(req: Request, res: Response, next: NextFunction) {
    res.send("get all users");
  },
};
