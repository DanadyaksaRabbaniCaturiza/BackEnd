import { Request, Response, NextFunction } from "express";
import { prisma } from "..";
import { Prisma } from "@prisma/client";

export const branchController = {
  //post//
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const branch = await prisma.branch.create({
        data: req.body,
      });
      return res.send({
        success: true,
        result: branch,
      });
    } catch (err) {
      if (err instanceof Error) throw Error(err.message);
    }
  },

  //get//
  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const branch = await prisma.branch.findMany();
      return res.send({
        success: true,
        result: branch,
      });
    } catch (err) {
      if (err instanceof Error) throw Error(err.message);
    }
  },
  async selectNameLocation(req: Request, res: Response, next: NextFunction) {
    try {
      const branch = await prisma.branch.findMany({
        select: {
          name: true,
          location: true,
        },
      });
      res.send({
        success: true,
        result: branch,
      });
    } catch (err) {
      if (err instanceof Error) throw Error(err.message);
    }
  },
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const branch = await prisma.branch.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });
      res.send({
        success: true,
        result: branch,
      });
    } catch (err) {
      if (err instanceof Error) throw Error(err.message);
    }
  },
  async paging(req: Request, res: Response, next: NextFunction) {
    try {
      const take = 1;
      const skip = (Number(req.query.page) - 1) * take;
      const branch = await prisma.branch.findMany({
        skip,
        take,
      });
      res.send({
        success: true,
        result: branch,
      });
    } catch (err) {
      if (err instanceof Error) throw Error(err.message);
    }
  },
  async class(req: Request, res: Response, next: NextFunction) {
    try {
      const branch = await prisma.branch.findMany({
        select: {
          name: true,
          location: true,
          Class: {
            select: {
              name: true,
              startAt: true,
              endAt: true,
            },
          },
        },
      });
      res.send({
        success: 1,
        result: branch,
      });
    } catch (err) {
      next(err);
    }
  },

  //update//
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.branch.update({
        data: req.body,
        where: {
          id: Number(req.params.id),
        },
      });
      res.send({
        success: true,
        message: "data berhasil diupdate",
      });
    } catch (err) {
      if (err instanceof Error) throw Error(err.message);
    }
  },

  //delete//
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.branch.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      res.send({
        success: true,
        message: "data berhasil dihapus",
      });
    } catch (err) {
      if (err instanceof Error) throw Error(err.message);
    }
  },
};
