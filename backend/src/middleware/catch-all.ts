import { Request, Response, NextFunction } from "express";
import errorModel from "../models/errorModel";
import logger from "../utils/log-helper";

const catchAll = (
  err: errorModel,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (err) {
    console.log(err.message);
    logger.error(err.message);
    response
      .status(err.status || 500)
      .json({ status: err.status || 500, msg: err.message });
    return;
  }

  next();
};

export default catchAll;
