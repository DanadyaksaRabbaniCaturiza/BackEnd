import { Request, Response, NextFunction } from "express";
import { prisma, secretKey } from "..";
import { Prisma } from "@prisma/client";
import { compare, genSalt, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

type TUser = {
  email: string;
};

export const userController = {
  async alluser(req: Request, res: Response, next: NextFunction) {
    try {
      const getall = await prisma.user.findMany();
      return res.send({
        success: true,
        result: getall,
      });
    } catch (error) {
      next(error);
    }
  },
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, username, gender } = req.body;
      const salt = await genSalt(10);
      const hashedpassword = await hash(password, salt);
      const newUser: Prisma.UserCreateInput = {
        email,
        password: hashedpassword,
        username,
        gender,
      };

      const checkUser = await prisma.user.findMany({
        where: {
          email,
        },
      });

      if (checkUser.length > 0) throw Error("user sudah terdaftar");

      await prisma.user.create({
        data: newUser,
      });

      res.send({
        success: true,
        message: "berhasil register",
      });
    } catch (error) {
      next(error);
    }
  },
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.query;
      const user = await prisma.user.findUnique({
        where: {
          email: String(email),
        },
      });
      //check password
      if (!user) throw Error("email/password salah");
      const checkpassword = await compare(String(password), user.password);
      const resUser = {
        id: user.id,
        email: user.email,
        username: user.username,
        gender: user.gender,
      };

      if (checkpassword) {
        const token = sign(resUser, secretKey, {
          expiresIn: "1hr",
        });

        return res.send({
          success: true,
          result: resUser,
          token,
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
