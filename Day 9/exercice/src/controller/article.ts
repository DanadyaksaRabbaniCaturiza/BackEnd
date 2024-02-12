import { Request, Response, NextFunction } from "express";
import { prisma } from "..";
import PrismaClient from "@prisma/client";

export const articleController = {
  //get//
  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const Post = await prisma.article.findMany({
        select: {
          user: {
            select: {
              username: true,
              gender: true,
            },
          },
          id: true,
          content: true,
        },
      });
      return res.send({
        success: true,
        result: Post,
      });
    } catch (err) {
      if (err instanceof Error) throw Error(err.message);
    }
  },
  async articleByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const byUser = await prisma.article.findMany({
        where: {
          userId: Number(req.params.id),
        },
        select: {
          user: {
            select: {
              id: true,
              username: true,
              gender: true,
            },
          },
          id: true,
          content: true,
        },
      });
      res.send({
        success: true,
        result: byUser,
      });
    } catch (error) {
      next(error);
    }
  },

  //post//
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.article.create({
        data: req.body,
      });
      return res.send({
        success: true,
        message: "Posted",
      });
    } catch (error) {
      next(error);
    }
  },

  //delete//
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.article.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      res.send({
        success: true,
        result: "data deleted",
      });
    } catch (error) {
      next(error);
    }
  },
};
