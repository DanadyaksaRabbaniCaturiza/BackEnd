import express, { Application, Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { prisma, secretKey } from "..";

export interface ReqUser extends Request {
  user?: TUser;
}

type TUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export const verifyuser = async (
  req: ReqUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token not found");
    const userToken = verify(token, String(secretKey)) as TUser;
    const checkuser = (await prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
      where: {
        email: userToken.email,
      },
    })) as TUser;

    req.user = checkuser as TUser;
    next();
  } catch (error) {
    next(error);
  }
};
