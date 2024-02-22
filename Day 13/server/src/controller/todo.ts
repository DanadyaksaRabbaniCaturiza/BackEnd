import express, { Application, Response, Request, NextFunction } from "express";
import { prisma } from "..";
import { Prisma } from "@prisma/client";
import { ReqUser } from "../middleware/verify-user";

export const todoController = {
  async read(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const readTodos = await prisma.todo.findMany({
        where: {
          userId: String(req.user?.id),
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      res.send({
        success: true,
        result: readTodos,
      });
    } catch (error) {
      next(error);
    }
  },

  async create(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { task } = req.body;
      const newTask: Prisma.TodoCreateInput = {
        task,
        user: {
          connect: {
            id: req.user?.id,
          },
        },
      };

      await prisma.todo.create({
        data: newTask,
      });

      res.status(201).send({
        message: "task added",
      });
    } catch (error) {
      next(error);
    }
  },

  async edit(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await prisma.todo.update({
        data: req.body,
        where: { id },
      });
      res.send({
        success: true,
        message: "task updated",
      });
    } catch (error) {
      next(error);
    }
  },

  async delete(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await prisma.todo.delete({
        where: { id },
      });
      res.send({
        success: true,
        message: "task deleted",
      });
    } catch (error) {
      next(error);
    }
  },
};
