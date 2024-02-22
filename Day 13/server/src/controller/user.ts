import express, { Application, Response, Request, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { prisma, secretKey } from "..";
import { compare, genSalt, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { ReqUser } from "../middleware/verify-user";

export const userController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name } = req.body;
      const salt = await genSalt(10);
      const hashedpassword = await hash(password, salt);
      const newUser: Prisma.UserCreateInput = {
        email,
        password: hashedpassword,
        name,
      };

      await prisma.user.create({ data: newUser });

      res.send({
        success: true,
        message: "register complete",
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) throw Error("user not found");

      const checkpassword = await compare(String(password), user.password);

      const resUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };
      if (!checkpassword) throw Error("wrong password");
      else if (checkpassword) {
        const token = sign(resUser, String(process.env.secretKey), {
          expiresIn: "24hr",
        });
        res.send({
          message: "login success",
          result: resUser,
          token,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async keepLogin(req: ReqUser, res: Response, next: NextFunction) {
    const token = await sign({ ...req.user }, String(secretKey), {
      expiresIn: "24hr",
    });
    return res.send({
      message: "keep login",
      result: req.user,
      token,
    });
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await prisma.user.delete({
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
