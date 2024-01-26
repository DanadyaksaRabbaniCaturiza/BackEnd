import moment from "moment";
import fs from "fs";
import { Request, Response, NextFunction } from "express";

export const writeLog = (req: Request, res: Response, next: NextFunction) => {
  const message = moment().format("YYYY-MM-DD HH:mm:ss");
  fs.appendFile(__dirname + "/../log/log.txt", message + "\n", (err) =>
    console.log(err)
  );
  next();
};
